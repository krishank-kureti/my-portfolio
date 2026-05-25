import { createServiceClient } from "@/lib/supabase/service";
import type { ContactMessage } from "@/types";

async function getMessages(): Promise<ContactMessage[]> {
  const service = createServiceClient();
  const { data, error } = await service
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }

  return data ?? [];
}

export default async function AdminMessages() {
  const messages = await getMessages();
  const unread = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontSize: 32,
            color: "var(--text)",
            marginBottom: 4,
          }}
        >
          Messages
        </h1>
        <p style={{ fontSize: 13, color: "var(--muted)" }}>
          {unread} unread &middot; {messages.length} total
        </p>
      </div>

      {messages.length === 0 ? (
        <div
          style={{
            padding: 48,
            textAlign: "center",
            border: "1px solid var(--border)",
            background: "var(--bg2)",
          }}
        >
          <p style={{ fontSize: 14, color: "var(--muted)" }}>
            No messages yet
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                padding: "20px 24px",
                background: msg.read ? "var(--bg2)" : "var(--bg3)",
                border: "1px solid var(--border)",
                borderLeft: msg.read
                  ? "1px solid var(--border)"
                  : "2px solid var(--accent)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: 16,
                    color: "var(--text)",
                  }}
                >
                  {msg.name}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--border2)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {new Date(msg.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--accent2)",
                  marginBottom: 12,
                }}
              >
                {msg.email}
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--muted)",
                  lineHeight: 1.8,
                  whiteSpace: "pre-wrap",
                }}
              >
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
