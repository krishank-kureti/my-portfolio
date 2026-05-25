import Link from "next/link";
import { getProjects } from "@/actions/projects";
import { ProjectDeleteButton } from "./ProjectDeleteButton";

export default async function AdminProjects() {
  const projects = await getProjects();

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 32,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "var(--serif)",
              fontSize: 32,
              color: "var(--text)",
              marginBottom: 4,
            }}
          >
            Projects
          </h1>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          style={{
            padding: "10px 20px",
            background: "var(--accent)",
            color: "#0a0a0a",
            border: "none",
            borderRadius: 2,
            fontFamily: "var(--mono)",
            fontSize: 13,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div
          style={{
            padding: 48,
            textAlign: "center",
            border: "1px solid var(--border)",
            background: "var(--bg2)",
          }}
        >
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 16 }}>
            No projects yet
          </p>
          <Link
            href="/admin/projects/new"
            style={{
              fontSize: 13,
              color: "var(--accent)",
              letterSpacing: "0.08em",
            }}
          >
            Create your first project
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
                {project.cover_image_url && (
                  <img
                    src={project.cover_image_url}
                    alt=""
                    style={{
                      width: 40,
                      height: 40,
                      objectFit: "cover",
                      borderRadius: 2,
                      flexShrink: 0,
                    }}
                  />
                )}
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: 16,
                      color: "var(--text)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {project.title}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--accent2)", marginTop: 2 }}>
                    /{project.slug}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
                <Link
                  href={`/admin/projects/${project.slug}/edit`}
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    textDecoration: "none",
                    padding: "6px 12px",
                    border: "1px solid var(--border)",
                    borderRadius: 2,
                  }}
                >
                  Edit
                </Link>
                <ProjectDeleteButton slug={project.slug} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
