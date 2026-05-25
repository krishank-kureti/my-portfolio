import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      <h1
        style={{
          fontFamily: "var(--serif)",
          fontSize: 32,
          color: "var(--text)",
          marginBottom: 8,
        }}
      >
        Dashboard
      </h1>
      <p
        style={{
          fontSize: 14,
          color: "var(--muted)",
          marginBottom: 48,
        }}
      >
        Manage your portfolio content
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <Link
          href="/admin/projects"
          style={{
            textDecoration: "none",
            padding: 32,
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            borderRadius: 2,
            transition: "border-color 0.2s",
          }}
        >
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: 36,
              color: "var(--accent)",
              marginBottom: 8,
            }}
          >
            Projects
          </div>
          <div style={{ fontSize: 13, color: "var(--muted)", letterSpacing: "0.06em" }}>
            Create, edit, and manage your projects
          </div>
        </Link>

        <Link
          href="/admin/messages"
          style={{
            textDecoration: "none",
            padding: 32,
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            borderRadius: 2,
            transition: "border-color 0.2s",
          }}
        >
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: 36,
              color: "var(--accent)",
              marginBottom: 8,
            }}
          >
            Messages
          </div>
          <div style={{ fontSize: 13, color: "var(--muted)", letterSpacing: "0.06em" }}>
            View contact form submissions
          </div>
        </Link>
      </div>
    </div>
  );
}
