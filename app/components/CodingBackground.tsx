"use client";

import { useState, useEffect, useRef } from "react";

const snippets = [
  "# Python — Training loop\nimport torch\nimport torch.nn.functional as F\n\ndef train_epoch(model, loader, opt):\n    model.train()\n    total = 0.0\n    for x, y in loader:\n        opt.zero_grad()\n        logits = model(x)\n        loss = F.cross_entropy(logits, y)\n        loss.backward()\n        opt.step()\n        total += loss.item()\n    return total / len(loader)",
  "# Python — Inference\nfrom transformers import pipeline\n\nrun = pipeline(\n    \"text-generation\",\n    model=\"Qwen/Qwen2.5-7B-Instruct\",\n)\n\ndef complete(prompt: str) -> str:\n    out = run(prompt, max_new_tokens=256, temperature=0.7)\n    return out[0][\"generated_text\"]",
  "// TypeScript — Ship the model\nexport async function infer(input: string) {\n  const res = await fetch(\"/api/infer\", {\n    method: \"POST\",\n    headers: { \"Content-Type\": \"application/json\" },\n    body: JSON.stringify({ input }),\n  });\n  if (!res.ok) throw new Error(\"Inference failed\");\n  return res.json() as Promise<{ output: string }>;\n}",
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
