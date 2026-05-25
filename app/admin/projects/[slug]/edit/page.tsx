"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { updateProject, getProjectBySlug } from "@/actions/projects";
import { AdminProjectForm } from "@/app/components/AdminProjectForm";
import type { Project } from "@/types";

export default function EditProject() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const wrappedAction = async (
    _prevState: { error: string } | undefined,
    formData: FormData
  ) => {
    const result = await updateProject(slug, formData);
    if (!result?.error) {
      router.push("/admin/projects");
    }
    return result;
  };

  const [state, action, pending] = useActionState(wrappedAction, undefined);

  useEffect(() => {
    getProjectBySlug(slug).then((p) => {
      setProject(p);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <p style={{ fontSize: 14, color: "var(--muted)" }}>Loading...</p>
    );
  }

  if (!project) {
    return (
      <p style={{ fontSize: 14, color: "#e74c3c" }}>Project not found.</p>
    );
  }

  return (
    <div>
      <h1
        style={{
          fontFamily: "var(--serif)",
          fontSize: 32,
          color: "var(--text)",
          marginBottom: 32,
        }}
      >
        Edit Project
      </h1>

      {state?.error && (
        <p
          style={{
            fontSize: 13,
            color: "#e74c3c",
            padding: "10px 14px",
            background: "rgba(231, 76, 60, 0.1)",
            border: "1px solid rgba(231, 76, 60, 0.2)",
            borderRadius: 2,
            marginBottom: 20,
          }}
        >
          {state.error}
        </p>
      )}

      <AdminProjectForm action={action} pending={pending} project={project} />
    </div>
  );
}
