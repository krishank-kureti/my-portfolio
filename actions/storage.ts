"use server";

import { put, del } from "@vercel/blob";

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

  try {
    const blob = await put(`projects/${Date.now()}-${file.name}`, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return { url: blob.url };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      error:
        "Upload failed: " +
        (error instanceof Error ? error.message : "unknown error"),
    };
  }
}

export async function deleteImage(url: string) {
  if (!url) return { error: "Invalid URL." };

  try {
    await del(url);
    return { success: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to delete image.",
    };
  }
}
