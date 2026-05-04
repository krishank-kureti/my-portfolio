"use client";

import { useEffect, useRef } from "react";

const skills = [
  "React", "Next.js", "Node.js", "TypeScript",
  "PostgreSQL", "MongoDB", "REST APIs", "GraphQL",
  "Docker", "Git", "Tailwind CSS", "AWS",
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
              Building things
              <br />
              that <em>matter.</em>
            </h2>
            <p className="about-body">
              I&apos;m a full stack developer who cares about every layer of the
              stack — from database schema to pixel-perfect UI. I like working on
              products that solve real problems.
            </p>
            <p className="about-body">
              When I&apos;m not coding, I&apos;m reading about systems design,
              exploring new tools, or thinking about how software can be both
              performant and beautiful.
            </p>
            <div className="about-stat-row fade-up">
              <div>
                <div className="stat-num">∞</div>
                <div className="stat-label">Problems solved</div>
              </div>
              <div>
                <div className="stat-num">01</div>
                <div className="stat-label">Developer. Always.</div>
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
              Open to full-time opportunities and interesting freelance projects.
              Let&apos;s build something together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
