
// @ts-ignore : threejs types are not compatible with @react-three/fiber
import * as THREE from 'three';
import { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { HIGHLIGHT_COLOR } from './constants';
import { Text3D } from './Text3D';
import { CopyIcon3D } from './CopyIcon3D';
import { ProjectMenuItem } from './ProjectMenuItem';

/**
 * Contact Panel - Now displays the link/menu structure.
 */
export function ContactPanel({ visible }: { visible: boolean }) {
    const groupRef = useRef<THREE.Group>(null);
    const CONTACTS = [
        { name: 'Email', key: 'email', url: 'mailto:mounibriabi@gmail.com' },
        { name: 'GitHub', key: 'github', url: 'https://github.com/MounibCS' },
        { name: 'Discord', key: 'discord', url: 'https://discord.com/users/MounibCS' },
    ];
    const [selectedContactKey, setSelectedContactKey] = useState<string>(CONTACTS[0].key);
    const selectedContact = useMemo(() => CONTACTS.find(c => c.key === selectedContactKey) || CONTACTS[0], [selectedContactKey]);
    const qrGroupRef = useRef<THREE.Group>(null);
    const [qrRevealKey, setQrRevealKey] = useState<number>(0);
    useEffect(() => {
        // Bump key to restart CSS reveal animation when selection changes
        setQrRevealKey((k) => k + 1);
    }, [selectedContactKey]);

    useFrame(() => {
        if (!groupRef.current) return;
        const targetOpacity = visible ? 1 : 0;
        groupRef.current.children.forEach((child: any) => {
            if (child.material) {
                child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, targetOpacity, 0.1);
            }
            if (child.children) {
                child.children.forEach((subChild: any) => {
                    if (subChild.material) {
                        subChild.material.opacity = THREE.MathUtils.lerp(subChild.material.opacity, targetOpacity, 0.1);
                    }
                });
            }
        });

        // QR code no longer bounces; reveal handled via CSS animation on selection change
    });
    if (!visible) return null;

    // Panels layout
    const menuPanel = { width: 5, height: 8, pos: [-4.5, -2, 0] as [number, number, number] };
    const detailPanel = { width: 8, height: 6, pos: [3.5, -1.5, 0] as [number, number, number] };
    const menuSpacing = 1.0;
    const menuTextYStart = menuPanel.height / 2 - 1.0;

    return (
        <group ref={groupRef} position={[0, -2, 0]}>
            {/* Left Panel: Contact Options */}
            <group
                // width={menuPanel.width} height={menuPanel.height} 
                position={menuPanel.pos}
            >
                {/* Menu Items */}
                {CONTACTS.map((item, i) => {
                    const y = menuTextYStart - (i * menuSpacing);
                    return (
                        <ProjectMenuItem
                            key={item.key}
                            name={item.name}
                            isSelected={item.key === selectedContactKey}
                            yPos={y}
                            width={menuPanel.width - 0.8}
                            menuSpacing={menuSpacing}
                            onClick={() => setSelectedContactKey(item.key)}
                        />
                    );
                })}
            </group>

            {/* Right Panel: Selected Link + QR Code */}
            <group position={detailPanel.pos}>
                {/* Link Text */}
                <Text3D position={[-detailPanel.width / 2 + 0.3, detailPanel.height / 2 - 0.8, 0.05]} size={0.35} color={HIGHLIGHT_COLOR}>
                    {selectedContact.url}
                </Text3D>
                {/* Copy icon next to the URL (aligned to the right edge) */}
                <CopyIcon3D position={[(selectedContact.url.length / 10) - 0.6, detailPanel.height / 2 - 0.8, 0.12]} url={selectedContact.url} />

                {/* Animated QR Code at bottom-right corner */}
                <group ref={qrGroupRef} position={[detailPanel.width / 2 - 1.1, -detailPanel.height / 2 + 1.1, 0.1]}>
                    <Html
                        position={[0, 0, 0]}
                        transform
                        distanceFactor={8}
                        style={{ pointerEvents: 'none' }}
                    >
                        <div key={qrRevealKey} style={{ width: 128, height: 128, borderRadius: 8, overflow: 'hidden', border: '1px solid #2b2b2b', boxShadow: '0 0 12px rgba(160,48,48,0.4)', position: 'relative', background: '#000' }}>
                            {/* QR image */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&color=A03030&data=${encodeURIComponent(selectedContact.url)}`}
                                alt={`QR for ${selectedContact.name}`}
                                style={{ width: '100%', height: '100%', display: 'block', clipPath: 'inset(100% 0 0 0)', animation: 'qrReveal 900ms ease-out forwards' }}
                            />
                            {/* Scanline overlay */}
                            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '22%', background: 'linear-gradient(to bottom, rgba(160,48,48,0.4), rgba(160,48,48,0.0))', filter: 'blur(1px)', transform: 'translateY(-100%)', animation: 'scanline 900ms ease-out forwards' }} />
                            <style>{`
                @keyframes qrReveal { from { clip-path: inset(100% 0 0 0); } to { clip-path: inset(0 0 0 0); } }
                @keyframes scanline { from { transform: translateY(-100%); opacity: 0.9; } to { transform: translateY(500%); opacity: 0; } }
              `}</style>
                        </div>
                    </Html>
                </group>
            </group>
        </group>
    );
}
