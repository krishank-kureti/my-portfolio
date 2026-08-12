"use client";

import NeuralNetworkCanvas from "./NeuralNetworkCanvas";
import CodingBackground from "./CodingBackground";

export default function Hero() {
  return (
    <section id="hero">
      {/* Coding background on left side */}
      <CodingBackground />

      <div className="hero-bg-text">KRISHANK</div>

      <div className="hero-scroll">
        <div className="hero-scroll-line"></div>
        scroll
      </div>

      {/* CNN canvas positioned on right side */}
      <div className="hero-right">
        <NeuralNetworkCanvas />
        <p className="hero-model-hint">Drag to explore</p>
      </div>

      {/* Content overlay */}
      <div className="hero-content">
        <p className="hero-label">AI Engineer — Based in Bangalore</p>

        <h1 className="hero-name">
          Krishank
          <br />
          <em>Kureti.</em>
        </h1>

        <p className="hero-desc">
          I build intelligent systems. Machine learning is the pull; a little
          full-stack is how they reach people.
        </p>

        <a href="#projects" className="hero-cta">
          <span className="arrow"></span>
          View Work
        </a>
      </div>
    </section>
  );
}
