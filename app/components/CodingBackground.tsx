"use client";

import { useState, useEffect, useRef } from "react";

const snippets = [
  "// JavaScript - Async Data Fetching\nconst fetchData = async (url, options = {}) => {\n  try {\n    const response = await fetch(url, {\n      method: 'GET',\n      headers: { 'Content-Type': 'application/json' },\n      ...options\n    });\n    if (!response.ok) throw new Error('Fetch failed');\n    return await response.json();\n  } catch (error) {\n    console.error('Error fetching data:', error);\n    return null;\n  }\n};",
  "// TypeScript - User Management System\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n  role: 'admin' | 'user' | 'guest';\n  createdAt: Date;\n}\n\nclass UserManager {\n  private users: User[] = [];\n\n  addUser(user: Omit<User, 'id' | 'createdAt'>): User {\n    const newUser: User = {\n      ...user,\n      id: this.users.length + 1,\n      createdAt: new Date()\n    };\n    this.users.push(newUser);\n    return newUser;\n  }\n\n  findUser(id: number): User | undefined {\n    return this.users.find(u => u.id === id);\n  }\n}",
  "# Python - Data Processing Pipeline\nimport pandas as pd\nimport numpy as np\nfrom typing import List, Dict\n\ndef process_dataset(file_path: str) -> pd.DataFrame:\n    \"\"\"Load and process dataset with validation.\"\"\"\n    df = pd.read_csv(file_path)\n    \n    # Clean missing values\n    df = df.dropna(subset=['critical_column'])\n    df = df.fillna({'optional_field': 'N/A'})\n    \n    return df",
];

export default function CodingBackground() {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const snippetIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const typeNextChar = () => {
      const currentSnippet = snippets[snippetIndexRef.current];

      if (charIndexRef.current < currentSnippet.length) {
        setText(currentSnippet.slice(0, charIndexRef.current + 1));
        charIndexRef.current++;
        timeoutRef.current = setTimeout(typeNextChar, 30 + Math.random() * 20) as unknown as NodeJS.Timeout;
      } else {
        timeoutRef.current = setTimeout(() => {
          setText("");
          charIndexRef.current = 0;
          snippetIndexRef.current =
            (snippetIndexRef.current + 1) % snippets.length;
          typeNextChar();
        }, 2000) as unknown as NodeJS.Timeout;
      }
    };

    typeNextChar();

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "50%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        fontFamily: "'DM Mono', monospace",
        fontSize: "14px",
        lineHeight: 1.6,
        color: "#bbbbbb",
        opacity: 0.55,
        padding: "48px",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {text}
      <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
    </div>
  );
}
