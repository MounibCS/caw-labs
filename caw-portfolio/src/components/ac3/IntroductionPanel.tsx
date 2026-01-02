
// @ts-ignore : threejs types are not compatible with @react-three/fiber
import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DEFAULT_TEXT_COLOR, HIGHLIGHT_COLOR, EMISSIVE_INTENSITY } from './constants';
import { Text3D } from './Text3D';
import { DiagonalScanFlash } from './DiagonalScanFlash';

/**
 * Introduction Panel - Now displays the developer bio content.
 */
export function IntroductionPanel({ visible }: { visible: boolean }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!groupRef.current) return;
        const targetOpacity = visible ? 1 : 0;
        groupRef.current.children.forEach((child: any) => {
            if (child.material) {
                child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, targetOpacity, 0.1);
            }
            // Handle nested groups (for Text3D components)
            if (child.children) {
                child.children.forEach((subChild: any) => {
                    if (subChild.material) {
                        subChild.material.opacity = THREE.MathUtils.lerp(subChild.material.opacity, targetOpacity, 0.1);
                    }
                });
            }
        });
    });
    if (!visible) return null;

    // Content from the requested Introduction Panel description
    const content = [
        "Hi, I am Mounib.",
        "An up and coming full stack software developer,",
        "developing passionate innovative solutions",
        " across diverse platforms and technologies, from web,",
        "mobile and desktop applications to automations,",
        "exploring new languages, frameworks, technologies and",
        "always learning."
    ];

    const lineSpacing = 0.4; // Vertical space between lines

    return (
        <group ref={groupRef} position={[0, 2, 0]}>
            {/* Title Tab - Styled to match the opaque red-brown bar */}
            <mesh position={[-5.8, 2.8, -0.05]}>
                <boxGeometry args={[3, 0.5, 0.1]} />
                <meshStandardMaterial color={HIGHLIGHT_COLOR} emissive={HIGHLIGHT_COLOR} emissiveIntensity={EMISSIVE_INTENSITY * 1.5} />
            </mesh>

            {/* Title Text */}
            <Text3D color={DEFAULT_TEXT_COLOR} glow position={[-7.1, 2.8, 0.05]} size={0.3} >
                INTRODUCTION
            </Text3D>
            {/* Diagonal scan overlay: slightly in front of the text */}
            <DiagonalScanFlash
                width={2.83}
                height={0.4}
                position={[-5.75, 2.8, 0.05]}
                color={HIGHLIGHT_COLOR}
                duration={1}
                interval={2}
            />

            {/* Content Text - Laid out as a paragraph block */}
            {content.map((line, i) => (
                <Text3D
                    key={i}
                    position={[-6.5, 1.8 - i * lineSpacing, 0.05]}
                    size={0.2}
                    color={HIGHLIGHT_COLOR} // Use accent color for main text
                >
                    {line}
                </Text3D>
            ))}
        </group>
    );
}
