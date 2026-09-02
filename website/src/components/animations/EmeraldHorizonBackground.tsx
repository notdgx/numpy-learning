import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  LUMINA_FRAGMENT_SHADER,
  LUMINA_VERTEX_SHADER
} from "./emeraldHorizonShaders";

export type EmeraldHorizonBackgroundProps = {
  speed?: number;
  waveScale?: number;
  variation?: number;
  glow?: number;
  vignette?: number;
  hue?: number;
  className?: string;
};

export const EMERALD_HORIZON_DEFAULTS = {
  speed: 1,
  waveScale: 1,
  variation: 1,
  glow: 1,
  vignette: 0,
  hue: 0
} as const;

export function EmeraldHorizonBackground({
  className = "",
  ...props
}: EmeraldHorizonBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  const optionsRef = useRef({
    ...EMERALD_HORIZON_DEFAULTS,
    ...props,
    vignette: 0
  });

  optionsRef.current = {
    ...EMERALD_HORIZON_DEFAULTS,
    ...props,
    vignette: 0
  };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;

    if (!host || !canvas) {
      return undefined;
    }

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.OrthographicCamera | null = null;
    let geometry: THREE.PlaneGeometry | null = null;
    let material: THREE.ShaderMaterial | null = null;

    try {
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
      });

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      const uniforms = {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(1, 1) },
        u_wave_scale: { value: 1 },
        u_variation: { value: 1 },
        u_glow: { value: 1 },
        u_vignette: { value: 0 }
      };

      material = new THREE.ShaderMaterial({
        vertexShader: LUMINA_VERTEX_SHADER,
        fragmentShader: LUMINA_FRAGMENT_SHADER,
        uniforms,
        depthWrite: false,
        depthTest: false
      });

      geometry = new THREE.PlaneGeometry(2, 2);
      scene.add(new THREE.Mesh(geometry, material));
    } catch (err) {
      console.warn("EmeraldHorizon Three.js initialization failed:", err);
      setWebglFailed(true);
      return undefined;
    }

    let frame = 0;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      if (!host || !renderer || !material) return;
      const bounds = host.getBoundingClientRect();
      const width = Math.max(1, bounds.width);
      const height = Math.max(1, bounds.height);

      renderer.setSize(width, height, false);
      material.uniforms.u_resolution.value.set(width, height);
    };

    const render = (now: number) => {
      if (!renderer || !scene || !camera || !material) return;
      const options = optionsRef.current;

      material.uniforms.u_time.value = (now - start) * 0.001 * options.speed;
      material.uniforms.u_wave_scale.value = options.waveScale;
      material.uniforms.u_variation.value = options.variation;
      material.uniforms.u_glow.value = options.glow;
      material.uniforms.u_vignette.value = 0;

      renderer.render(scene, camera);

      frame =
        visible && !document.hidden
          ? requestAnimationFrame(render)
          : 0;
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;

      if (visible && !frame) {
        frame = requestAnimationFrame(render);
      }
      if (!visible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });

    resizeObserver.observe(host);
    intersection.observe(host);

    resize();
    frame = requestAnimationFrame(render);

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      resizeObserver.disconnect();
      intersection.disconnect();

      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  if (webglFailed) {
    return (
      <div
        className={`threeui-background emerald-horizon emerald-fallback ${className}`}
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 90% 60% at 50% 100%, rgba(56, 189, 248, 0.12), rgba(5, 5, 5, 0))",
          pointerEvents: "none"
        }}
      />
    );
  }

  return (
    <div
      ref={hostRef}
      className={`threeui-background emerald-horizon ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none"
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
          filter: `hue-rotate(${optionsRef.current.hue}deg)`
        }}
      />
    </div>
  );
}
