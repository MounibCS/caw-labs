
// @ts-ignore : threejs types are not compatible with @react-three/fiber
import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { HIGHLIGHT_COLOR } from './constants';
import { Text3D } from './Text3D';

/**
 * Animated Features List Component
 * Creates a digital scan/fade-in effect for project features
 */
export function AnimatedFeaturesList({
    features,
    panelWidth,
    startY,
    selectedKey
}: {
    features: string[];
    panelWidth: number;
    startY: number;
    selectedKey: string;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const animationStartTime = useRef<number>(0);
    const isAnimating = useRef<boolean>(false);
    const previousKey = useRef<string>(selectedKey);

    // Reset animation when project changes
    useEffect(() => {
        if (previousKey.current !== selectedKey) {
            animationStartTime.current = 0;
            isAnimating.current = true;
            previousKey.current = selectedKey;
        }
    }, [selectedKey]);

    useFrame((state: any) => {
        if (!groupRef.current || !isAnimating.current) return;

        // Initialize animation start time
        if (animationStartTime.current === 0) {
            animationStartTime.current = state.clock.elapsedTime;
        }

        const elapsed = state.clock.elapsedTime - animationStartTime.current;

        // Animate each feature with staggered timing
        features.forEach((feature, i) => {
            const delay = i * 0.15; // 150ms delay between each feature
            const featureElapsed = elapsed - delay;

            if (featureElapsed >= 0) {
                const progress = Math.min(featureElapsed / 0.8, 1); // 800ms animation duration

                // Digital scan effect: opacity starts at 0, then quickly fades in
                const opacity = progress < 0.3 ? 0 : THREE.MathUtils.lerp(0, 0.9, (progress - 0.3) / 0.7);

                // Apply opacity to the feature's text
                if (groupRef.current && groupRef.current.children[i]) {
                    const featureGroup = groupRef.current.children[i] as THREE.Group;
                    featureGroup.children.forEach((child: any) => {
                        if (child.material) {
                            child.material.opacity = opacity;
                        }
                    });
                }
            }
        });

        // Stop animation after all features are done
        const totalAnimationTime = features.length * 0.15 + 0.8;
        if (elapsed > totalAnimationTime) {
            isAnimating.current = false;
        }
    });

    return (
        <group ref={groupRef}>
            {features.map((feature, i) => {
                const y = startY - (i * 0.8);
                return (
                    <Text3D
                        key={`${selectedKey}-${i}`}
                        position={[-panelWidth / 2 + 0.3, y, 0]}
                        size={0.3}
                        color={HIGHLIGHT_COLOR}
                        isHighlight={false}
                    >
                        {feature}
                    </Text3D>
                );
            })}
        </group>
    );
}
