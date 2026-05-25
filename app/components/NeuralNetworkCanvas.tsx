"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function NeuralNetworkCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create canvas element
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;cursor:grab;z-index:1;";
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.018);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 4, 26);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0a0a, 0);
    renderer.setSize(container.clientWidth, container.clientHeight);

    // ─── Manual Orbit Controls ───
    let isDragging = false;
    let lastX = 0, lastY = 0;
    let theta = 0.2, phi = 0.35, radius = 26;

    const updateCamera = () => {
      camera.position.x = radius * Math.sin(theta) * Math.cos(phi);
      camera.position.y = radius * Math.sin(phi);
      camera.position.z = radius * Math.cos(theta) * Math.cos(phi);
      camera.lookAt(0, 0, 0);
    };
    updateCamera();

    // Mouse events on CANVAS
    canvas.addEventListener("mousedown", (e) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.style.cursor = "grabbing";
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
      canvas.style.cursor = "grab";
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      theta -= (e.clientX - lastX) * 0.005;
      phi = Math.max(0.1, Math.min(1.5, phi - (e.clientY - lastY) * 0.005));
      lastX = e.clientX;
      lastY = e.clientY;
      updateCamera();
    });

    // Zoom removed - keep single size as requested

    // Touch support
    let lastTouch: Touch | null = null;
    canvas.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        lastTouch = e.touches[0];
      }
    });

    canvas.addEventListener("touchend", () => {
      isDragging = false;
      lastTouch = null;
    });

    canvas.addEventListener("touchmove", (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const touch = e.touches[0];
      if (lastTouch) {
        theta -= (touch.clientX - lastTouch.clientX) * 0.005;
        phi = Math.max(0.1, Math.min(1.5, phi - (touch.clientY - lastTouch.clientY) * 0.005));
        updateCamera();
      }
      lastTouch = touch;
    });

    // ─── Color Palette ───
    const COLORS: Record<string, { node: number; glow: number; edge: number }> = {
      input:  { node: 0xc8b89a, glow: 0xf0d8b0, edge: 0xb0a88a },
      conv1:  { node: 0xe8a87c, glow: 0xffd0a0, edge: 0xd09060 },
      pool:   { node: 0xd4956a, glow: 0xffb87c, edge: 0xb87848 },
      conv2:  { node: 0xc88855, glow: 0xffaa60, edge: 0xa06835 },
      fc:     { node: 0xe0c090, glow: 0xfff0c0, edge: 0xc8a870 },
      output: { node: 0xf0c860, glow: 0xffec80, edge: 0xe0a830 },
    };

    const layerDefs = [
      { key: "input",  xPos: -8.5, featureMaps: 3, rows: 4, cols: 4, spacing: 0.9, depthGap: 0.45 },
      { key: "conv1",  xPos: -4.5, featureMaps: 6, rows: 3, cols: 3, spacing: 0.85, depthGap: 0.4 },
      { key: "pool",   xPos: -0.5, featureMaps: 6, rows: 2, cols: 2, spacing: 0.85, depthGap: 0.4 },
      { key: "conv2", xPos: 3.5, featureMaps: 4, rows: 3, cols: 3, spacing: 0.9, depthGap: 0.45 },
      { key: "fc",     xPos: 7.5, featureMaps: 1, rows: 6, cols: 1, spacing: 1.2, depthGap: 0 },
      { key: "output", xPos: 10.2, featureMaps: 1, rows: 2, cols: 1, spacing: 1.8, depthGap: 0 },
    ];

    // ─── Node Geometry ───
    const sphereGeo = new THREE.SphereGeometry(0.12, 10, 10);
    const glowGeo   = new THREE.SphereGeometry(0.22, 10, 10);

    function makeMat(color: number, opacity: number, transparent = true) {
      return new THREE.MeshBasicMaterial({ color, transparent, opacity, depthWrite: !transparent });
    }

    const layerNodes: { mesh: THREE.Mesh; glow: THREE.Mesh; x: number; y: number; z: number; baseCol: number; glowCol: number }[][] = [];
    const layerEdges: { line: THREE.Line; mat: THREE.LineBasicMaterial; srcNode: any; tgtNode: any }[][] = [];

    // Create nodes
    layerDefs.forEach((def) => {
      const col = COLORS[def.key];
      const nodes: typeof layerNodes[0] = [];
      const fm = def.featureMaps, rows = def.rows, cols = def.cols;

      for (let d = 0; d < fm; d++) {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const y = (r - (rows - 1) / 2) * def.spacing;
            const z = (c - (cols - 1) / 2) * def.spacing;
            const x = def.xPos + d * def.depthGap - (fm - 1) * def.depthGap * 0.5;

            const mesh = new THREE.Mesh(sphereGeo, makeMat(col.node, 0.9));
            const glow = new THREE.Mesh(glowGeo,   makeMat(col.glow, 0, true));
            mesh.position.set(x, y, z);
            glow.position.set(x, y, z);
            scene.add(mesh);
            scene.add(glow);
            nodes.push({ mesh, glow, x, y, z, baseCol: col.node, glowCol: col.glow });
          }
        }
      }
      layerNodes.push(nodes);
    });

    // Build edges between adjacent layers
    function buildEdges(fromLayerIdx: number, toLayerIdx: number, count: number) {
      const srcs = layerNodes[fromLayerIdx];
      const tgts = layerNodes[toLayerIdx];
      const col = COLORS[layerDefs[fromLayerIdx].key];
      const edges: typeof layerEdges[0] = [];

      const step = Math.max(1, Math.floor(srcs.length / count));
      for (let i = 0; i < srcs.length; i += step) {
        const src = srcs[i];
        const numConn = Math.min(3, tgts.length);
        const shuffled = [...tgts].sort(() => Math.random() - 0.5).slice(0, numConn);

        shuffled.forEach(tgt => {
          const pts = [new THREE.Vector3(src.x, src.y, src.z), new THREE.Vector3(tgt.x, tgt.y, tgt.z)];
          const geo = new THREE.BufferGeometry().setFromPoints(pts);
          const mat = new THREE.LineBasicMaterial({ color: col.edge, transparent: true, opacity: 0.0 });
          const line = new THREE.Line(geo, mat);
          scene.add(line);
          edges.push({ line, mat, srcNode: src, tgtNode: tgt });
        });
      }
      return edges;
    }

    for (let i = 0; i < layerDefs.length - 1; i++) {
      layerEdges.push(buildEdges(i, i + 1, 20));
    }

    // ─── Particle Sparks ───
    const SPARK_COUNT = 60;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(SPARK_COUNT * 3);
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    const sparkMat = new THREE.PointsMaterial({ color: 0xffd080, size: 0.08, transparent: true, opacity: 0, sizeAttenuation: true });
    const sparks = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparks);

    // ─── Animation ───
    const CYCLE = 6;
    let clock = 0;
    let lastTime = performance.now();

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      requestAnimationFrame(animate);
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      clock = (clock + dt) % CYCLE;

      const progress = (clock / CYCLE) * (layerDefs.length - 1);
      const activeLayer = Math.floor(progress);
      const layerT = progress - activeLayer;

      // Reset all nodes
      layerNodes.forEach((nodes, li) => {
        nodes.forEach(n => {
          const base = COLORS[layerDefs[li].key].node;
          n.mesh.material = makeMat(base, 0.75);
          n.glow.material = makeMat(COLORS[layerDefs[li].key].glow, 0);
        });
      });

      // Reset all edges
      layerEdges.forEach(edges => {
        edges.forEach(e => { e.mat.opacity = 0; });
      });

      // Pulse active layer
      const pulseIntensity = 0.5 + 0.5 * Math.sin(clock * 12);
      if (layerNodes[activeLayer]) {
        layerNodes[activeLayer].forEach(n => {
          const col = COLORS[layerDefs[activeLayer].key].glow;
          n.mesh.material = makeMat(col, 0.95 + 0.05 * pulseIntensity);
          n.glow.material = makeMat(col, 0.3 * pulseIntensity);
        });
      }

      // Light up next layer faintly as signal arrives
      if (layerT > 0.4 && layerNodes[activeLayer + 1]) {
        const arrive = Math.min(1, (layerT - 0.4) / 0.4);
        layerNodes[activeLayer + 1].forEach(n => {
          const col = COLORS[layerDefs[activeLayer + 1].key].glow;
          n.mesh.material = makeMat(col, 0.75 + 0.2 * arrive);
          n.glow.material = makeMat(col, 0.15 * arrive);
        });
      }

      // Flash edges during transmission
      if (layerEdges[activeLayer]) {
        const edgeT = Math.sin(layerT * Math.PI);
        layerEdges[activeLayer].forEach(e => {
          e.mat.opacity = edgeT * 0.65;
          e.mat.color.setHex(COLORS[layerDefs[activeLayer].key].glow);
        });
      }

      // Sparks: scatter along active edge midpoints
      if (layerEdges[activeLayer]) {
        const eArr = layerEdges[activeLayer];
        for (let i = 0; i < SPARK_COUNT; i++) {
          const e = eArr[i % eArr.length];
          const t = Math.random() * 0.6 + 0.2;
          const jitter = 0.15;
          sparkPos[i * 3 + 0] = lerp(e.srcNode.x, e.tgtNode.x, t) + (Math.random() - 0.5) * jitter;
          sparkPos[i * 3 + 1] = lerp(e.srcNode.y, e.tgtNode.y, t) + (Math.random() - 0.5) * jitter;
          sparkPos[i * 3 + 2] = lerp(e.srcNode.z, e.tgtNode.z, t) + (Math.random() - 0.5) * jitter;
        }
        sparkGeo.attributes.position.needsUpdate = true;
        sparkMat.opacity = Math.sin(layerT * Math.PI) * 0.9;
      } else {
        sparkMat.opacity = 0;
      }

      // Gentle idle blink on resting layers
      layerNodes.forEach((nodes, li) => {
        if (li === activeLayer) return;
        const idlePulse = 0.6 + 0.15 * Math.sin(clock * 2 + li * 1.3);
        nodes.forEach(n => {
          (n.mesh.material as THREE.MeshBasicMaterial).opacity = idlePulse;
        });
      });

      // Slow auto-rotate when not dragging
      if (!isDragging) {
        theta += 0.0008;
        updateCamera();
      }

      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };

    animate();

    // ─── Resize ───
    const handleResize = () => {
      if (!container) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // ─── Cleanup ───
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return <div ref={containerRef} id="nn-canvas" style={{ position: "relative", width: "100%", height: "100%" }} />;
}
