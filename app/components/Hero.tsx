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
      </div>

      {/* Content overlay */}
      <div className="hero-content">
        <p className="hero-label">Full Stack Developer — Based in India</p>

        <h1 className="hero-name">
          Krishank
          <br />
          <em>Kureti.</em>
        </h1>

        <p className="hero-desc">
          I design and build digital experiences that incorporate any form of
          AI — from idea to production.
        </p>

        <a href="#projects" className="hero-cta">
          <span className="arrow"></span>
          View Work
        </a>
      </div>
    </section>
  );
}
