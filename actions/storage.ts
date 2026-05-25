"use server";

import { createServiceClient } from "@/lib/supabase/service";
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

  const service = createServiceClient();
  const { data, error } = await service.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    return { error: error.message };
  }

  const { data: urlData } = service.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(data.path);

  return { url: urlData.publicUrl };
}

export async function deleteImage(url: string) {
  const path = url.split("/").pop();
  if (!path) return { error: "Invalid URL." };

  const service = createServiceClient();
  const { error } = await service.storage
    .from(STORAGE_BUCKET)
    .remove([path]);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
