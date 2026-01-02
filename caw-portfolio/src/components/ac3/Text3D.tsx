
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
//@ts-expect-error
import * as THREE from 'three';
import { DEFAULT_TEXT_COLOR, HIGHLIGHT_COLOR, EMISSIVE_INTENSITY } from './constants';

export function Text3D({
    children,
    position,
    size = 0.3,
    color = DEFAULT_TEXT_COLOR,
    isHighlight = false,
    glow = false,
    anchorX = "left"
}: {
    children: React.ReactNode;
    position: [number, number, number];
    size?: number;
    color?: string;
    isHighlight?: boolean;
    glow?: boolean;
    anchorX?: "left" | "center" | "right";
}) {
    const groupRef = useRef<THREE.Group>(null);
    const textString = String(children);

    useFrame((state) => {
        if (!groupRef.current) return;
        // Subtle float animation
        const float = Math.sin(state.clock.elapsedTime * 2) * 0.02;
        groupRef.current.position.y = position[1] + float;
    });

    return (
        <group ref={groupRef} position={[position[0], position[1], position[2]]}>
            <Text
                fontSize={size}
                color={isHighlight ? HIGHLIGHT_COLOR : color}
                anchorX={anchorX}
                anchorY="middle"
            >
                {textString}
                <meshStandardMaterial
                    color={isHighlight ? HIGHLIGHT_COLOR : color}
                    emissive={isHighlight ? HIGHLIGHT_COLOR : color}
                    emissiveIntensity={glow ? EMISSIVE_INTENSITY * 3 : (isHighlight ? EMISSIVE_INTENSITY * 2 : EMISSIVE_INTENSITY)}
                    transparent
                    opacity={0.9}
                    roughness={0.1}
                    metalness={0.8}
                />
            </Text>
        </group>
    );
}
