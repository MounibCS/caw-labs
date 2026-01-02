
// @ts-ignore : threejs types are not compatible with @react-three/fiber
import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { ACCENT_COLOR, EMISSIVE_INTENSITY, SCENE_RADIUS } from './constants';

/**
 * Renders thousands of floating shards using InstancedMesh for performance.
 * Shards randomly drift and rotate.
 */
export function FloatingShards({ count }: { count: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate random positions, scales, and rotation speeds for the shards
    const shards = useMemo(() => {
        return Array.from({ length: count }, () => {
            const position = new THREE.Vector3(
                (Math.random() - 0.5) * SCENE_RADIUS * 2,
                (Math.random() - 0.5) * SCENE_RADIUS * 2,
                (Math.random() - 0.5) * SCENE_RADIUS * 2
            );
            // Ensure shards stay outside the immediate menu area
            if (position.length() < 5) position.setLength(5 + Math.random() * 5);

            return {
                position,
                scale: Math.random() * 0.2 + 0.05,
                rotationSpeed: (Math.random() - 0.5) * 0.005,
                driftDirection: new THREE.Vector3(
                    Math.random() - 0.5,
                    Math.random() - 0.5,
                    Math.random() - 0.5
                ).normalize().multiplyScalar(0.0005)
            };
        });
    }, [count]);

    useFrame((state: any, delta: any) => {
        shards.forEach((shard, i) => {
            // Apply rotation
            dummy.rotation.x += shard.rotationSpeed;
            dummy.rotation.y += shard.rotationSpeed * 0.5;

            // Apply drift
            shard.position.add(shard.driftDirection.clone().multiplyScalar(delta * 60));

            // Wrap around the scene to simulate infinite space
            if (meshRef.current) {
                if (shard.position.x > SCENE_RADIUS) shard.position.x = -SCENE_RADIUS;
                if (shard.position.x < -SCENE_RADIUS) shard.position.x = SCENE_RADIUS;
                if (shard.position.y > SCENE_RADIUS) shard.position.y = -SCENE_RADIUS;
                if (shard.position.y < -SCENE_RADIUS) shard.position.y = SCENE_RADIUS;
                if (shard.position.z > SCENE_RADIUS) shard.position.z = -SCENE_RADIUS;
                if (shard.position.z < -SCENE_RADIUS) shard.position.z = SCENE_RADIUS;

                // Update matrix
                dummy.position.copy(shard.position);
                dummy.scale.setScalar(shard.scale);
                dummy.updateMatrix();
                meshRef.current.setMatrixAt(i, dummy.matrix);
            }
        });

        if (meshRef.current) {
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            {/* Use a simple octahedron or tetrahedron for a shard/fragment look */}
            <dodecahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial
                color={ACCENT_COLOR}
                emissive={ACCENT_COLOR}
                emissiveIntensity={EMISSIVE_INTENSITY * 0.5}
                transparent
                opacity={0.6}
                roughness={0.2}
                metalness={0.8} // Highly reflective for icy look
            />
        </instancedMesh>
    );
}
