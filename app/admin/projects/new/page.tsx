"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/actions/projects";
import { AdminProjectForm } from "@/app/components/AdminProjectForm";

export default function NewProject() {
  const router = useRouter();
  const [state, action, pending] = useActionState(
    async (_prev: { error: string } | undefined, formData: FormData) => {
      const result = await createProject(formData);
      if (!result?.error) {
        router.push("/admin/projects");
      }
      return result;
    },
    undefined
  );

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
        New Project
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

      <AdminProjectForm action={action} pending={pending} />
    </div>
  );
}
