"use server";

import { revalidatePath } from "next/cache";
import { getSql } from "@/lib/db";
import type { Project } from "@/types";

export async function getProjects(): Promise<Project[]> {
  try {
    const sql = getSql();
    const rows = await sql`
      SELECT *
      FROM projects
      ORDER BY created_at DESC
    `;
    return rows as Project[];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const sql = getSql();
    const rows = await sql`
      SELECT *
      FROM projects
      WHERE slug = ${slug}
      LIMIT 1
    `;
    return (rows[0] as Project) ?? null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
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

  try {
    const sql = getSql();
    await sql`
      INSERT INTO projects (
        title, slug, description, tech_stack,
        github_url, live_url, featured, cover_image_url
      ) VALUES (
        ${title},
        ${slug},
        ${description},
        ${tech_stack},
        ${githubUrl || null},
        ${liveUrl || null},
        ${featured},
        ${coverImageUrl || null}
      )
    `;
  } catch (error) {
    console.error("Error creating project:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to create project.",
    };
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

  try {
    const sql = getSql();
    await sql`
      UPDATE projects
      SET
        title = ${title},
        slug = ${newSlug},
        description = ${description},
        tech_stack = ${tech_stack},
        github_url = ${githubUrl || null},
        live_url = ${liveUrl || null},
        featured = ${featured},
        cover_image_url = ${coverImageUrl || null}
      WHERE slug = ${slug}
    `;
  } catch (error) {
    console.error("Error updating project:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to update project.",
    };
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
  revalidatePath("/admin");
}

export async function deleteProject(slug: string) {
  try {
    const sql = getSql();
    await sql`DELETE FROM projects WHERE slug = ${slug}`;
  } catch (error) {
    console.error("Error deleting project:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to delete project.",
    };
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
  revalidatePath("/admin");
}
