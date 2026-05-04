"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const GOLD = 0xc8b89a;
const ORANGE = 0xc8b89a;

export default function NeuralNetworkCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const layers = [4, 6, 8, 6, 4];
    const nodes: THREE.Mesh[] = [];
    const edges: THREE.Line[] = [];
    const edgeLayerMap: number[] = [];

    const nodeGeom = new THREE.SphereGeometry(0.15, 8, 8);
    const positions: { x: number; y: number; z: number }[][] = [];

    layers.forEach((count, layerIdx) => {
      const layerPositions: { x: number; y: number; z: number }[] = [];
      const x = (layerIdx - (layers.length - 1) / 2) * 3;

      for (let i = 0; i < count; i++) {
        const y = (i - (count - 1) / 2) * 1.2;
        const z = (Math.random() - 0.5) * 0.6;

        const mat = new THREE.MeshBasicMaterial({
          color: GOLD,
          transparent: true,
          opacity: 0.6,
        });
        const mesh = new THREE.Mesh(nodeGeom, mat);
        mesh.position.set(x, y, z);
        scene.add(mesh);
        nodes.push(mesh);
        layerPositions.push({ x, y, z });
      }

      positions.push(layerPositions);
    });

    for (let l = 0; l < positions.length - 1; l++) {
      for (const from of positions[l]) {
        for (const to of positions[l + 1]) {
          const points = [
            new THREE.Vector3(from.x, from.y, from.z),
            new THREE.Vector3(to.x, to.y, to.z),
          ];
          const geom = new THREE.BufferGeometry().setFromPoints(points);
          const mat = new THREE.LineBasicMaterial({
            color: GOLD,
            transparent: true,
            opacity: 0.05,
          });
          const line = new THREE.Line(geom, mat);
          scene.add(line);
          edges.push(line);
          edgeLayerMap.push(l);
        }
      }
    }

    const timer = new THREE.Timer();
    let signalPosition = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      const time = timer.getElapsed();

      // Calculate signal position (moves from layer 0 to last layer)
      signalPosition = (time * 0.6) % (layers.length - 1);
      const currentLayer = Math.floor(signalPosition);
      const nextLayer = Math.min(currentLayer + 1, layers.length - 1);
      const progress = signalPosition - currentLayer;

      // Reset all nodes and edges
      nodes.forEach((node) => {
        (node.material as THREE.MeshBasicMaterial).color.setHex(GOLD);
        (node.material as THREE.MeshBasicMaterial).opacity = 0.6;
      });

      edges.forEach((edge, i) => {
        (edge.material as THREE.LineBasicMaterial).opacity = 0.05;
      });

      // Light up nodes in current layer
      if (positions[currentLayer]) {
        positions[currentLayer].forEach((pos) => {
          nodes.forEach((node) => {
            if (
              Math.abs(node.position.x - pos.x) < 0.01 &&
              Math.abs(node.position.y - pos.y) < 0.01
            ) {
              (node.material as THREE.MeshBasicMaterial).color.setHex(ORANGE);
              (node.material as THREE.MeshBasicMaterial).opacity = 1;
            }
          });
        });
      }

      // Light up edges from current layer to next layer based on signal progress
      edges.forEach((edge, i) => {
        if (edgeLayerMap[i] === currentLayer) {
          const pulseIntensity = Math.sin(progress * Math.PI) * 0.8 + 0.2;
          (edge.material as THREE.LineBasicMaterial).opacity = pulseIntensity * 0.5;
          (edge.material as THREE.LineBasicMaterial).color.setHex(ORANGE);
        }
      });

      // Gentle wave motion (very subtle)
      nodes.forEach((node) => {
        node.position.y += Math.sin(time * 0.8 + node.position.x * 1.5) * 0.001;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} id="nn-canvas" />;
}
