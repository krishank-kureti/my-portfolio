"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { getProjects } from "@/actions/projects";
import type { Project } from "@/types";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

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

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c === 0 ? projects.length - 1 : c - 1));
  }, [projects.length]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c === projects.length - 1 ? 0 : c + 1));
  }, [projects.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onTouchStart = (e: TouchEvent) => { touchStart.current = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      touchEnd.current = e.changedTouches[0].clientX;
      const diff = touchStart.current - touchEnd.current;
      if (Math.abs(diff) > 50) {
        diff > 0 ? next() : prev();
      }
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [next, prev]);

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
          <div className="carousel" ref={trackRef}>
            <button
              className="carousel-btn carousel-btn--left"
              onClick={prev}
              aria-label="Previous project"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 17L7 10l6-7" />
              </svg>
            </button>

            <div className="carousel-viewport">
              <div
                className="carousel-slide"
                style={{
                  transform: `translateX(-${current * 100}%)`,
                }}
              >
                {projects.map((project, i) => (
                  <div key={project.id} className="project-card">
                    {project.cover_image_url ? (
                      <div className="project-card-image">
                        <img src={project.cover_image_url} alt={project.title} />
                      </div>
                    ) : (
                      <div className="project-card-image project-card-image--empty">
                        <span>{project.title.charAt(0)}</span>
                      </div>
                    )}

                    <div className="project-card-body">
                      <div className="project-num">{padNum(i)}</div>
                      <h3 className="project-name">{project.title}</h3>
                      <p className="project-desc">{project.description}</p>
                      <div className="project-tags">
                        {project.tech_stack.map((tag) => (
                          <span key={tag} className="project-tag">{tag}</span>
                        ))}
                      </div>
                      {(project.github_url || project.live_url) && (
                        <div className="project-card-links">
                          {project.github_url && (
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-card-link">
                              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                              </svg>
                              Source
                            </a>
                          )}
                          {project.live_url && (
                            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="project-card-link">
                              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
                                <path d="M4 16L16 4M16 4H8M16 4v8" />
                              </svg>
                              Live
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="carousel-btn carousel-btn--right"
              onClick={next}
              aria-label="Next project"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 3l6 7-6 7" />
              </svg>
            </button>

            <div className="carousel-dots">
              {projects.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot${i === current ? " carousel-dot--active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
