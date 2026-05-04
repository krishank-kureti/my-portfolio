"use client";

import { useEffect, useRef } from "react";

const projects = [
  {
    num: "001",
    name: "Project Alpha",
    desc: "A brief description of what this project does and the problem it solves. Replace this with your actual project details.",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    num: "002",
    name: "Project Beta",
    desc: "A brief description of what this project does and the problem it solves. Replace this with your actual project details.",
    tags: ["Next.js", "TypeScript", "MongoDB"],
  },
  {
    num: "003",
    name: "Project Gamma",
    desc: "A brief description of what this project does and the problem it solves. Replace this with your actual project details.",
    tags: ["GraphQL", "Docker", "AWS"],
  },
];

export default function Projects() {
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
    <section id="projects" ref={sectionRef}>
      <div className="section-inner">
        <div className="section-label">Work</div>

        <div className="projects-header">
          <h2 className="projects-title">
            Selected
            <br />
            <em>Projects</em>
          </h2>
          <span className="project-count">03 projects</span>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <div
              key={project.num}
              className="project-card fade-up"
              style={i > 0 ? { transitionDelay: `${i * 0.1}s` } : undefined}
            >
              <div className="project-num">{project.num}</div>
              <svg className="project-arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M4 16L16 4M16 4H8M16 4v8" />
              </svg>
              <h3 className="project-name">{project.name}</h3>
              <p className="project-desc">{project.desc}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
