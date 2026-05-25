"use client";

import { useFormStatus } from "react-dom";
import { deleteProject } from "@/actions/projects";

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        fontSize: 12,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#e74c3c",
        textDecoration: "none",
        padding: "6px 12px",
        border: "1px solid rgba(231, 76, 60, 0.3)",
        borderRadius: 2,
        background: "none",
        cursor: "pointer",
        fontFamily: "var(--mono)",
        opacity: pending ? 0.5 : 1,
      }}
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}

export function ProjectDeleteButton({ slug }: { slug: string }) {
  return (
    <form
      action={async () => {
        await deleteProject(slug);
      }}
    >
      <DeleteButton />
    </form>
  );
}
