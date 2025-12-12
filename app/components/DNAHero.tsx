"use client";

import { useEffect } from "react";
import * as THREE from "three";

export default function DNAHero() {
  useEffect(() => {
    console.log("DNAHero hero helix mounted");

    // ===== RENDERER =====
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // transparent

    const canvasId = "dna-hero-canvas";
    const existing = document.getElementById(canvasId);
    if (existing && existing.parentElement) {
      existing.parentElement.removeChild(existing);
    }

    const canvas = renderer.domElement;
    canvas.id = canvasId;
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "0";
    document.body.appendChild(canvas);

    // ===== SCENE & CAMERA =====
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40, // slightly narrower FOV
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(-5, 0, 40);

    // ===== LIGHTS =====
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0x88ccff, 1.4);
    keyLight.position.set(15, 20, 20);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x00ffe0, 1.2, 100);
    rimLight.position.set(-20, -10, -15);
    scene.add(rimLight);

    // ===== HELIX CREATOR (DOUBLE STRAND) =====
    // const createHelix = (opts: {
    //   colorA: number;
    //   colorB: number;
    //   turns?: number;
    //   height?: number;
    //   radius?: number;
    //   thickness?: number;
    // }) => {
    //   const {
    //     colorA,
    //     colorB,
    //     turns = 1.6,
    //     height = 22,
    //     radius = 1.5,
    //     thickness = 0.28,
    //   } = opts;

    //   const group = new THREE.Group();

    //   const pointsPerTurn = 120;
    //   const totalPoints = Math.floor(turns * pointsPerTurn);

    //   const ptsA: THREE.Vector3[] = [];
    //   const ptsB: THREE.Vector3[] = [];

    //   for (let i = 0; i <= totalPoints; i++) {
    //     const t = (i / pointsPerTurn) * Math.PI * 2;
    //     const y = (i / totalPoints - 0.5) * height;

    //     ptsA.push(
    //       new THREE.Vector3(
    //         radius * Math.cos(t),
    //         y,
    //         radius * Math.sin(t)
    //       )
    //     );

    //     ptsB.push(
    //       new THREE.Vector3(
    //         radius * Math.cos(t + Math.PI),
    //         y,
    //         radius * Math.sin(t + Math.PI)
    //       )
    //     );
    //   }

    //   const curveA = new THREE.CatmullRomCurve3(ptsA);
    //   const curveB = new THREE.CatmullRomCurve3(ptsB);

    //   const tubeGeomA = new THREE.TubeGeometry(
    //     curveA,
    //     totalPoints * 2,
    //     thickness,
    //     20,
    //     false
    //   );
    //   const tubeGeomB = new THREE.TubeGeometry(
    //     curveB,
    //     totalPoints * 2,
    //     thickness,
    //     20,
    //     false
    //   );

    //   const matA = new THREE.MeshPhysicalMaterial({
    //     color: colorA,
    //     metalness: 0.9,
    //     roughness: 0.25,
    //     clearcoat: 1,
    //     clearcoatRoughness: 0.05,
    //     emissive: colorA,
    //     emissiveIntensity: 0.25,
    //   });

    //   const matB = new THREE.MeshPhysicalMaterial({
    //     color: colorB,
    //     metalness: 0.9,
    //     roughness: 0.25,
    //     clearcoat: 1,
    //     clearcoatRoughness: 0.05,
    //     emissive: colorB,
    //     emissiveIntensity: 0.25,
    //   });

    //   const strandA = new THREE.Mesh(tubeGeomA, matA);
    //   const strandB = new THREE.Mesh(tubeGeomB, matB);
    //   group.add(strandA);
    //   group.add(strandB);

    //   // base-pair bridges
    //   const bridgeMat = new THREE.MeshStandardMaterial({
    //     color: 0xffffff,
    //     emissive: 0x66ffee,
    //     emissiveIntensity: 0.4,
    //     metalness: 0.6,
    //     roughness: 0.3,
    //   });

    //   const bridgeCount = 40;
    //   for (let i = 0; i < bridgeCount; i++) {
    //     const t = (i / bridgeCount) * (Math.PI * 2 * turns);
    //     const y = (i / bridgeCount - 0.5) * height;

    //     const x1 = radius * Math.cos(t);
    //     const z1 = radius * Math.sin(t);
    //     const x2 = radius * Math.cos(t + Math.PI);
    //     const z2 = radius * Math.sin(t + Math.PI);

    //     const mid = new THREE.Vector3((x1 + x2) / 2, y, (z1 + z2) / 2);
    //     const barGeom = new THREE.CylinderGeometry(0.045, 0.045, 3, 12);
    //     const bar = new THREE.Mesh(barGeom, bridgeMat);

    //     bar.position.copy(mid);
    //     bar.lookAt(x1, y, z1);
    //     bar.rotateX(Math.PI / 2);

    //     group.add(bar);
    //   }

    //   return group;
    // };

    // // ===== HERO HELIX (RIGHT SIDE) =====
    // const heroHelix = createHelix({
    //   colorA: 0x48b9ff,
    //   colorB: 0x35ffa7,
    //   turns: 1.6,
    //   height: 22,
    //   radius: 1.5,
    //   thickness: 0.18,
    // });

    // scene.add(heroHelix);

    // ===== RESPONSIVE LAYOUT =====
    // const setLayout = () => {
    //   const w = window.innerWidth;
    //   const isMobile = w < 768;

    //   if (isMobile) {
    //     // slightly right, taller for mobile
    //     heroHelix.position.set(2.5, 0, -3);
    //     heroHelix.scale.set(2.2, 3.0, 2.2);

    //     heroHelix.rotation.set(
    //       0.0,              // X
    //       Math.PI * 0.35,   // Y
    //       -0.18             // Z
    //     );
    //   } else {
    //     // desktop – right side hero helix
    //     heroHelix.position.set(11.5, 0, -3);
    //     heroHelix.scale.set(3.0, 3.8, 3.0);

    //     heroHelix.rotation.set(
    //       0.02,             // small forward tilt
    //       Math.PI * 0.42,   // angled, S-shaped silhouette
    //       -0.2              // slight lean
    //     );
    //   }
    // };

    // setLayout();

    // ===== PARTICLE FIELD =====
    const particleCount = 2200;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3 + 0] = (Math.random() - 0.5) * 90;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 50;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 90;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      color: 0x00eaff,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // ===== ANIMATION LOOP =====
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const t = performance.now() * 0.0004;

      //gentle spin + breathing motion
      // heroHelix.rotation.y += 0.006;
      // heroHelix.position.y = Math.sin(t * 2) * 1.2;

      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.00015;

      renderer.render(scene, camera);
    };

    animate();

    // ===== RESIZE =====
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      // setLayout();
    };

    window.addEventListener("resize", onResize);

    // ===== CLEANUP =====
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);

      const el = document.getElementById(canvasId);
      if (el && el.parentElement) {
        el.parentElement.removeChild(el);
      }

      renderer.dispose();
      scene.clear();
    };
  }, []);

  return null;
}
