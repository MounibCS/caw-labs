
// @ts-ignore : threejs types are not compatible with @react-three/fiber
import * as THREE from 'three';
import { useRef, useState } from 'react';
import { HIGHLIGHT_COLOR, ACCENT_COLOR, EMISSIVE_INTENSITY, DEFAULT_TEXT_COLOR } from './constants';
import { Text3D } from './Text3D';

/**
 * A clickable menu item for the ProjectsPanel.
 */
export function ProjectMenuItem({ name, isSelected, yPos, width, menuSpacing, onClick }: { name: string; isSelected: boolean; yPos: number; width: number; menuSpacing: number; onClick: () => void }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Set up an invisible plane to catch clicks over the area
    return (
        <group>
            {isSelected && (
                <group>
                    {/* Maroon Highlight Block */}
                    <mesh position={[0, yPos - 0.1, -0.01]}>
                        <boxGeometry args={[width, menuSpacing * 0.8, 0.01]} />
                        <meshStandardMaterial
                            color={HIGHLIGHT_COLOR}
                            emissive={HIGHLIGHT_COLOR}
                            emissiveIntensity={EMISSIVE_INTENSITY * 1.5}
                        />
                    </mesh>
                    {/* Angular Pointer/Divider (Extends past the edge) */}
                    <mesh position={[-width / 2 - 0.8, yPos - 0.1, 0]}>
                        <boxGeometry args={[1.5, 0.05, 0.05]} />
                        <meshStandardMaterial color={ACCENT_COLOR} emissive={ACCENT_COLOR} emissiveIntensity={EMISSIVE_INTENSITY * 2} />
                    </mesh>
                </group>
            )}

            {/* Hover Effect Block */}
            {isHovered && !isSelected && (
                <mesh position={[0, yPos - 0.1, -0.005]}>
                    <boxGeometry args={[width, menuSpacing * 0.8, 0.005]} />
                    <meshStandardMaterial
                        color={ACCENT_COLOR}
                        emissive={ACCENT_COLOR}
                        emissiveIntensity={EMISSIVE_INTENSITY * 0.8}
                        transparent
                        opacity={0.3}
                    />
                </mesh>
            )}

            {/* Clickable Area and Text */}
            <mesh
                ref={meshRef}
                position={[0, yPos - 0.1, 0.01]} // Positioned slightly in front of the highlight block
                onClick={onClick}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
            >
                {!isSelected && (
                    <>
                        <boxGeometry args={[width, menuSpacing * 0.8, 0.001]} />
                        <meshStandardMaterial color="#DAE6E6" transparent opacity={0.15} />
                    </>
                )}
                {isSelected && <meshStandardMaterial transparent opacity={0} />} {/* Invisible click target when selected */}

                {/* Text positioned inside the clickable area (local coordinates) */}
                <Text3D
                    position={[-width / 2 + 0.3, 0, 0.1]}
                    size={0.35}
                    color={isSelected ? DEFAULT_TEXT_COLOR : (isHovered ? ACCENT_COLOR : '#5A7684')}
                    isHighlight={isHovered && !isSelected}
                    anchorX="left"
                    glow={isSelected || isHovered}
                >
                    {name}
                </Text3D>
            </mesh>
        </group>
    );
}
