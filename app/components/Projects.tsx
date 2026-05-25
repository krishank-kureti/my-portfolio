"use client";

import { useEffect, useRef, useState } from "react";
import { getProjects } from "@/actions/projects";
import type { Project } from "@/types";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading) return;
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
  }, [loading]);

  const padNum = (i: number) => String(i + 1).padStart(3, "0");

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
          <span className="project-count">
            {loading ? "loading..." : `${projects.length} project${projects.length !== 1 ? "s" : ""}`}
          </span>
        </div>

        {loading && (
          <div
            style={{
              padding: 60,
              textAlign: "center",
              fontSize: 14,
              color: "var(--muted)",
              border: "1px solid var(--border)",
            }}
          >
            Loading projects...
          </div>
        )}

        {error && (
          <div
            style={{
              padding: 60,
              textAlign: "center",
              fontSize: 14,
              color: "#e74c3c",
              border: "1px solid rgba(231,76,60,0.2)",
            }}
          >
            Failed to load projects.
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div
            style={{
              padding: 60,
              textAlign: "center",
              fontSize: 14,
              color: "var(--muted)",
              border: "1px solid var(--border)",
            }}
          >
            No projects yet.
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="projects-grid">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="project-card fade-up"
                style={i > 0 ? { transitionDelay: `${i * 0.1}s` } : undefined}
              >
                <div className="project-num">{padNum(i)}</div>
                <svg className="project-arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M4 16L16 4M16 4H8M16 4v8" />
                </svg>

                {project.cover_image_url && (
                  <div
                    style={{
                      width: "100%",
                      height: 140,
                      overflow: "hidden",
                      marginBottom: 16,
                      borderRadius: 2,
                    }}
                  >
                    <img
                      src={project.cover_image_url}
                      alt={project.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}

                <h3 className="project-name">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tech_stack.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
