import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050714, 0.055);
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Particle field
    const count = 1400;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const cyan = new THREE.Color(0x00f2fe);
    const violet = new THREE.Color(0x8b5cf6);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi) - 3;
      const c = Math.random() > 0.5 ? cyan : violet;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Core wireframe icosahedron
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.1, 1),
      new THREE.MeshBasicMaterial({ color: 0x00f2fe, wireframe: true, transparent: true, opacity: 0.28 })
    );
    scene.add(core);

    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.25, 0),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.4 })
    );
    scene.add(inner);

    // Orbit rings
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.18, side: THREE.DoubleSide });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.008, 8, 120), ringMat);
    ring1.rotation.x = Math.PI / 2.4;
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(4.3, 0.008, 8, 120), ringMat.clone());
    ring2.material.color.set(0x8b5cf6);
    ring2.rotation.x = Math.PI / 1.8;
    ring2.rotation.y = 0.5;
    scene.add(ring1, ring2);

    let mouseX = 0;
    let mouseY = 0;
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    const clock = new THREE.Clock();
    let raf;
    const animate = () => {
      const t = clock.getElapsedTime();
      particles.rotation.y = t * 0.04;
      core.rotation.x = t * 0.12;
      core.rotation.y = t * 0.16;
      inner.rotation.x = -t * 0.2;
      inner.rotation.y = -t * 0.24;
      ring1.rotation.z = t * 0.08;
      ring2.rotation.z = -t * 0.06;
      camera.position.x += (mouseX * 0.9 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 0.6 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} data-testid="hero-3d-canvas" className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
