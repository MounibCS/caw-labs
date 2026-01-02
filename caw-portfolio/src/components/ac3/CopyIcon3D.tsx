
import { Html } from '@react-three/drei';
import { useState } from 'react';
import { ACCENT_COLOR, HIGHLIGHT_COLOR, EMISSIVE_INTENSITY } from './constants';

/**
 * Small 3D copy-to-clipboard icon (two stacked squares) with hover glow and copied tooltip.
 */
export function CopyIcon3D({ position, url }: { position: [number, number, number]; url: string }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleClick = async () => {
        try {
            if (typeof navigator !== 'undefined' && navigator.clipboard && url) {
                await navigator.clipboard.writeText(url);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 1200);
            }
        } catch {
            // Silently ignore failures
        }
    };

    const iconColor = isHovered ? HIGHLIGHT_COLOR : ACCENT_COLOR;
    const emissiveStrength = isHovered ? EMISSIVE_INTENSITY * 2 : EMISSIVE_INTENSITY * 0.8;

    return (
        <group position={position}>
            {/* Back square */}
            <mesh position={[-0.06, 0.06, 0]} onClick={handleClick} onPointerEnter={() => setIsHovered(true)} onPointerLeave={() => setIsHovered(false)}>
                <boxGeometry args={[0.36, 0.36, 0.02]} />
                <meshStandardMaterial color={iconColor} emissive={iconColor} emissiveIntensity={emissiveStrength * 0.4} transparent opacity={0.18} metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Front square */}
            <mesh position={[0, 0, 0.02]} onClick={handleClick} onPointerEnter={() => setIsHovered(true)} onPointerLeave={() => setIsHovered(false)}>
                <boxGeometry args={[0.36, 0.36, 0.02]} />
                <meshStandardMaterial color={iconColor} emissive={iconColor} emissiveIntensity={emissiveStrength} transparent opacity={0.35} metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Tooltip via HTML */}
            {isCopied && (
                <Html position={[0, 0.35, 0.05]} transform distanceFactor={8} style={{ pointerEvents: 'none' }}>
                    <div style={{ padding: '4px 8px', fontSize: 12, color: '#fff', background: 'rgba(160,48,48,0.9)', border: '1px solid #5a1a1a', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
                        Copied!
                    </div>
                </Html>
            )}
        </group>
    );
}
