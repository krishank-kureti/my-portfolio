"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import type { Project } from "@/types";

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data ?? [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching project:", error);
    return null;
  }

  return data;
}

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const techStackRaw = formData.get("tech_stack") as string;
  const githubUrl = formData.get("github_url") as string;
  const liveUrl = formData.get("live_url") as string;
  const featured = formData.get("featured") === "on";
  const coverImageUrl = formData.get("cover_image_url") as string;

  if (!title || !slug || !description) {
    return { error: "Title, slug, and description are required." };
  }

  const tech_stack = techStackRaw
    ? techStackRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const service = createServiceClient();
  const { error } = await service.from("projects").insert({
    title,
    slug,
    description,
    tech_stack,
    github_url: githubUrl || null,
    live_url: liveUrl || null,
    featured,
    cover_image_url: coverImageUrl || null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
  revalidatePath("/admin");
}

export async function updateProject(slug: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const techStackRaw = formData.get("tech_stack") as string;
  const githubUrl = formData.get("github_url") as string;
  const liveUrl = formData.get("live_url") as string;
  const featured = formData.get("featured") === "on";
  const coverImageUrl = formData.get("cover_image_url") as string;
  const newSlug = formData.get("slug") as string;

  if (!title || !newSlug || !description) {
    return { error: "Title, slug, and description are required." };
  }

  const tech_stack = techStackRaw
    ? techStackRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const service = createServiceClient();
  const { error } = await service
    .from("projects")
    .update({
      title,
      slug: newSlug,
      description,
      tech_stack,
      github_url: githubUrl || null,
      live_url: liveUrl || null,
      featured,
      cover_image_url: coverImageUrl || null,
    })
    .eq("slug", slug);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
  revalidatePath("/admin");
}

export async function deleteProject(slug: string) {
  const service = createServiceClient();
  const { error } = await service
    .from("projects")
    .delete()
    .eq("slug", slug);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
  revalidatePath("/admin");
}
