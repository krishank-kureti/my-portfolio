"use server";

import { createServiceClient } from "@/lib/supabase/service";
import { createClient } from "@/lib/supabase/server";
import { STORAGE_BUCKET } from "@/lib/constants";

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File | null;

  if (!file) {
    return { error: "No file provided." };
  }

  if (file.size > 5 * 1024 * 1024) {
    return { error: "File size must be under 5MB." };
  }

  const ext = file.name.split(".").pop()?.toLowerCase();
  const allowed = ["png", "jpg", "jpeg", "webp", "gif"];
  if (!ext || !allowed.includes(ext)) {
    return { error: "File must be an image (png, jpg, webp, gif)." };
  }

  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  // Try service client first (bypasses RLS), then fall back to server client
  let service = createServiceClient();
  let { data, error } = await service.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file, { cacheControl: "3600", upsert: false });

  // If service client fails (e.g. missing env var on Vercel), try server client
  if (error) {
    console.warn("Service client upload failed:", error.message);
    const supabase = await createClient();
    const result = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, file, { cacheControl: "3600", upsert: false });
    data = result.data;
    error = result.error;
  }

  if (error || !data?.path) {
    console.error("Upload error:", error?.message ?? "No path returned");
    return { error: "Upload failed: " + (error?.message ?? "unknown error") };
  }

  const { data: urlData } = service.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(data!.path);

  return { url: urlData.publicUrl };
}

export async function deleteImage(url: string) {
  const path = url.split("/").pop();
  if (!path) return { error: "Invalid URL." };

  let service = createServiceClient();
  let { error } = await service.storage.from(STORAGE_BUCKET).remove([path]);

  if (error) {
    const supabase = await createClient();
    const result = await supabase.storage.from(STORAGE_BUCKET).remove([path]);
    error = result.error;
  }

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
