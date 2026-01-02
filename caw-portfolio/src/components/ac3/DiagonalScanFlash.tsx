
// @ts-ignore : threejs types are not compatible with @react-three/fiber
import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { ACCENT_COLOR } from './constants';

/**
 * Diagonal scanning flash overlay for titles.
 * A thin additive band sweeps diagonally across a rectangular area on an interval.
 */
export function DiagonalScanFlash({
    width,
    height,
    position,
    color = ACCENT_COLOR,
    duration = 0.85,
    interval = 4.2,
}: {
    width: number;
    height: number;
    position: [number, number, number];
    color?: string;
    duration?: number;
    interval?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const startTime = useRef<number>(0);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uProgress: { value: 0 },
            uActive: { value: 0 },
            uColor: { value: new THREE.Color(color) },
            uBandWidth: { value: 0.25 },
        }), [color]
    );

    const vertexShader = `
        varying vec2 vUv;
        void main(){
          vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
        `;

    const fragmentShader = `
        varying vec2 vUv;
        uniform float uProgress; // 0..1 across the sweep
        uniform float uActive;
        uniform vec3 uColor;
        uniform float uBandWidth;

        // Create a diagonal coordinate in [0,2]
        float diag(vec2 uv){
      return uv.x + uv.y; // 0..2
    }

        void main(){
      if(uActive < 0.5){discard; }
        float t = diag(vUv);
        float center = mix(-0.3, 2.3, uProgress); // overshoot to fully sweep
        float d = abs(t - center);
        float band = smoothstep(uBandWidth, 0.0, d); // peak at center
        float halo = smoothstep(0.6, 0.0, d) * 0.2; // faint wider glow
        float alpha = clamp(band + halo, 0.0, 1.0) * 0.6; // subtle
        gl_FragColor = vec4(uColor, alpha);
    }
        `;

    useFrame((state: any) => {
        if (!materialRef.current) return;
        if (startTime.current === 0) startTime.current = state.clock.elapsedTime;
        const t = state.clock.elapsedTime - startTime.current;
        const phase = t % interval;
        const isActive = phase < duration;
        const progress = isActive ? (phase / duration) : 0;
        materialRef.current.uniforms.uProgress.value = progress;
        materialRef.current.uniforms.uActive.value = isActive ? 1 : 0;
    });

    return (
        <mesh ref={meshRef} position={position}
        // rotation={[0, 0, Math.PI / 6]}
        >
            <planeGeometry args={[width, height, 1, 1]} />
            {/* Additive, transparent shader for the sweeping band */}
            <shaderMaterial
                ref={materialRef}
                args={[{ uniforms, vertexShader, fragmentShader, transparent: true } as any]}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}
