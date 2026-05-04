"use client";

import { useEffect, useState } from "react";

const lines: { text: string; delay: number; prompt?: boolean }[] = [
  { text: "BIOS v4.2.1 — POST check passed", delay: 100 },
  { text: "Memory: 16384 MB OK", delay: 80 },
  { text: "Loading kernel: v6.8.0-generic ...", delay: 200 },
  { text: "[  OK  ] Started Journal Service.", delay: 120 },
  { text: "[  OK  ] Reached target Network.", delay: 100 },
  { text: "[  OK  ] Started Device Manager.", delay: 90 },
  { text: "[  OK  ] Started Login Service.", delay: 110 },
  { text: "", delay: 80 },
  { text: "Welcome to KrishankOS 1.0.0 LTS", delay: 150, prompt: false },
  { text: "", delay: 60 },
  { text: "$ whoami", delay: 300, prompt: true },
  { text: "krishank-kureti", delay: 200 },
  { text: "$ cat /etc/role", delay: 250, prompt: true },
  { text: "Full Stack Developer", delay: 200 },
  { text: "$ uptime", delay: 200, prompt: true },
  { text: "up 20+ years, 1 user, load average: 0.42", delay: 180 },
  { text: "$ cat skills.list", delay: 220, prompt: true },
  { text: "React  Next.js  TypeScript  Node.js  Python  AWS", delay: 250 },
  { text: "$ neofetch --status", delay: 200, prompt: true },
  { text: "Status: Open to opportunities", delay: 180 },
  { text: "", delay: 60 },
  { text: "$ ./launch-portfolio.sh", delay: 350, prompt: true },
  { text: "Initializing portfolio environment...", delay: 400 },
  { text: "[  OK  ] All systems ready. Launching.", delay: 500 },
];

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let totalDelay = 0;

    for (let i = 0; i < lines.length; i++) {
      totalDelay += lines[i].delay;
      const capturedIndex = i + 1;
      const timeout = setTimeout(() => {
        setVisibleLines(capturedIndex);
      }, totalDelay);
      if (i === lines.length - 1) {
        setTimeout(() => {
          setFading(true);
          setTimeout(onDone, 600);
        }, totalDelay + 600);
      }
    }

    return () => {};
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'DM Mono', monospace",
        fontSize: "13px",
        lineHeight: 1.8,
        color: "#f0ede6",
        padding: "40px 48px",
        overflow: "hidden",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.6s ease",
      }}
    >
      {lines.slice(0, visibleLines).map((line, i) => (
        <div key={i} style={{ minHeight: "1.8em" }}>
          {line.prompt ? (
            <span>
              <span style={{ color: "#c8b89a" }}>krishank@dev</span>
              <span style={{ color: "#6b6b6b" }}>:</span>
              <span style={{ color: "#8a7a64" }}>~</span>
              <span style={{ color: "#6b6b6b" }}>$ </span>
              <span style={{ color: "#f0ede6" }}>
                {line.text.replace("$ ", "")}
              </span>
            </span>
          ) : line.text.startsWith("[  OK  ]") ? (
            <span>
              <span style={{ color: "#c8b89a" }}>[  OK  ]</span>
              <span style={{ color: "#6b6b6b" }}>
                {line.text.replace("[  OK  ]", "")}
              </span>
            </span>
          ) : line.text === "" ? (
            ""
          ) : (
            <span style={{ color: "#6b6b6b" }}>{line.text}</span>
          )}
        </div>
      ))}
      {visibleLines > 0 && !fading && (
        <span
          style={{
            display: "inline-block",
            width: "8px",
            height: "16px",
            background: "#c8b89a",
            marginLeft: "2px",
            animation: "blink 1s step-end infinite",
          }}
        />
      )}
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
