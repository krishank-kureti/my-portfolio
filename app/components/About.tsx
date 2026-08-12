"use client";

import { useEffect, useRef } from "react";

const skills = [
  "Python", "Machine Learning", "Neural Nets", "LLMs",
  "TypeScript", "Next.js", "Node.js", "PostgreSQL",
  "Docker", "Git", "REST APIs", "AWS",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".fade-up") ?? [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef}>
      <div className="section-inner">
        <div className="section-label">About</div>

        <div className="about-grid">
          <div>
            <h2 className="about-title">
              Building systems
              <br />
              that <em>learn.</em>
            </h2>
            <p className="about-body">
              I&apos;m an AI engineer with a keen interest in machine learning —
              how models pick up patterns, fail, and get better. I still reach
              for the full stack when a system needs a product around it, but
              the work I care about is intelligence.
            </p>
            <p className="about-body">
              When I&apos;m not training or wiring models, I&apos;m reading
              papers, tinkering with architectures, or thinking about how AI
              can be both useful and well-built.
            </p>
            <div className="about-stat-row fade-up">
              <div>
                <div className="stat-num">∞</div>
                <div className="stat-label">Always learning</div>
              </div>
              <div>
                <div className="stat-num">01</div>
                <div className="stat-label">AI first.</div>
              </div>
            </div>
          </div>

          <div className="about-right fade-up">
            <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent2)", marginBottom: 16 }}>
              Stack
            </p>
            <div className="skills-list">
              {skills.map((skill) => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>

            <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent2)", marginBottom: 16, marginTop: 40 }}>
              Currently
            </p>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 2 }}>
              Open to AI roles and interesting freelance work.
              Let&apos;s build something together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
