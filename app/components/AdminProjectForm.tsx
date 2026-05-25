"use client";

import { useRef } from "react";
import { uploadImage } from "@/actions/storage";
import type { Project } from "@/types";

interface Props {
  action: (formData: FormData) => void;
  pending: boolean;
  project?: Project;
}

export function AdminProjectForm({ action, pending, project }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const coverUrlRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.set("file", file);

    const result = await uploadImage(fd);
    if (result.url && coverUrlRef.current) {
      coverUrlRef.current.value = result.url;
    } else if (result.error) {
      alert(result.error);
    }
  };

  const inputStyle: React.CSSProperties = {
    padding: "10px 14px",
    background: "var(--bg2)",
    border: "1px solid var(--border)",
    borderRadius: 2,
    color: "var(--text)",
    fontFamily: "var(--mono)",
    fontSize: 14,
    outline: "none",
    width: "100%",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--accent2)",
  };

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label htmlFor="title" style={labelStyle}>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={project?.title ?? ""}
          style={inputStyle}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label htmlFor="slug" style={labelStyle}>Slug</label>
        <input
          id="slug"
          name="slug"
          type="text"
          required
          defaultValue={project?.slug ?? ""}
          style={inputStyle}
          placeholder="my-project-slug"
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label htmlFor="description" style={labelStyle}>Description</label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={project?.description ?? ""}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label htmlFor="tech_stack" style={labelStyle}>
          Tech Stack <span style={{ color: "var(--border2)" }}>(comma-separated)</span>
        </label>
        <input
          id="tech_stack"
          name="tech_stack"
          type="text"
          defaultValue={project?.tech_stack?.join(", ") ?? ""}
          style={inputStyle}
          placeholder="React, Node.js, PostgreSQL"
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label htmlFor="github_url" style={labelStyle}>GitHub URL</label>
          <input
            id="github_url"
            name="github_url"
            type="url"
            defaultValue={project?.github_url ?? ""}
            style={inputStyle}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label htmlFor="live_url" style={labelStyle}>Live URL</label>
          <input
            id="live_url"
            name="live_url"
            type="url"
            defaultValue={project?.live_url ?? ""}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={labelStyle}>Cover Image</label>
        <input
          ref={coverUrlRef}
          name="cover_image_url"
          type="text"
          defaultValue={project?.cover_image_url ?? ""}
          style={inputStyle}
          placeholder="https://..."
        />
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8 }}>
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--mono)" }}
          />
          <button
            type="button"
            onClick={handleUpload}
            style={{
              padding: "8px 16px",
              background: "var(--bg3)",
              color: "var(--text)",
              border: "1px solid var(--border)",
              borderRadius: 2,
              fontFamily: "var(--mono)",
              fontSize: 12,
              letterSpacing: "0.08em",
              cursor: "pointer",
            }}
          >
            Upload
          </button>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <input
          id="featured"
          name="featured"
          type="checkbox"
          defaultChecked={project?.featured ?? false}
          style={{ accentColor: "var(--accent)" }}
        />
        <label htmlFor="featured" style={{ fontSize: 13, color: "var(--muted)" }}>
          Featured project
        </label>
      </div>

      <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
        <button
          type="submit"
          disabled={pending}
          style={{
            padding: "12px 28px",
            background: "var(--accent)",
            color: "#0a0a0a",
            border: "none",
            borderRadius: 2,
            fontFamily: "var(--mono)",
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: "pointer",
            opacity: pending ? 0.6 : 1,
          }}
        >
          {pending ? "Saving..." : project ? "Update Project" : "Create Project"}
        </button>
      </div>
    </form>
  );
}
