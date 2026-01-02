
// @ts-ignore : threejs types are not compatible with @react-three/fiber
import * as THREE from 'three';
import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { PROJECT_DATA, ProjectData } from './data';
import { ProjectMenuItem } from './ProjectMenuItem';
import { AnimatedFeaturesList } from './AnimatedFeaturesList';
import { ViewportScreen } from './ViewportScreen';

/**
 * Projects Panel - Now displays the sci-fi three-panel menu.
 */
export function ProjectsPanel({ visible, isMobile }: { visible: boolean; isMobile: boolean }) {
    const groupRef = useRef<THREE.Group>(null);
    // State to manage the currently selected project key, defaults to the first project
    const [selectedKey, setSelectedKey] = useState(PROJECT_DATA[0].key);

    const selectedProject: ProjectData = useMemo(() =>
        PROJECT_DATA.find(p => p.key === selectedKey) || PROJECT_DATA[0],
        [selectedKey]
    );

    /* --- Layout Coordinates and Dimensions --- */
    const layout = useMemo(() => {
        if (isMobile) {
            return {
                mainMenu: { width: 8, height: 6, pos: [0, -7, 2] as [number, number, number], rot: [-Math.PI / 12, 0, 0] as [number, number, number] },
                detailPanel: { width: 8, height: 4, pos: [0, -1.5, 1] as [number, number, number], rot: [0, 0, 0] as [number, number, number] },
                viewport: { width: 10, height: 8, pos: [0, 4.5, 0] as [number, number, number], rot: [Math.PI / 12, 0, 0] as [number, number, number] }
            };
        }
        return {
            mainMenu: { width: 6, height: 12, pos: [-5.5, -2, 3] as [number, number, number], rot: [0, Math.PI / 5, 0] as [number, number, number] },
            detailPanel: { width: 4, height: 6, pos: [-1, 0, 0] as [number, number, number], rot: [0, 0, 0] as [number, number, number] },
            viewport: { width: 12, height: 10, pos: [6.5, 0, 3] as [number, number, number], rot: [0, -Math.PI / 5, 0] as [number, number, number] }
        };
    }, [isMobile]);

    const { mainMenu, detailPanel, viewport } = layout;

    const menuSpacing = 0.8;
    const menuTextYStart = mainMenu.height / 2 - 1.5;
    const detailTextYStart = detailPanel.height / 2 - 0.8;

    // Opacity Fade Logic: Recursive Lerp for all meshes in the group
    useFrame(() => {
        if (!groupRef.current) return;
        const targetOpacity = visible ? 1 : 0;

        // Recursive function to apply opacity to all children materials
        const applyOpacity = (node: any) => {
            if (node.material && node.material.transparent !== false) {
                if (node.userData.initialOpacity === undefined) {
                    // Use the defined opacity or assume 1
                    node.userData.initialOpacity = node.material.opacity === 0 ? 1 : node.material.opacity;
                }
                const initialOpacity = node.userData.initialOpacity;
                // Lerp towards (targetOpacity * initialOpacity)
                node.material.opacity = THREE.MathUtils.lerp(node.material.opacity, targetOpacity * initialOpacity, 0.1);
            }
            if (node.children) {
                node.children.forEach(applyOpacity);
            }
        };
        groupRef.current.children.forEach(applyOpacity);
    });

    if (!visible) return null;

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {/* --- 1. Main Menu Panel (Left) --- */}
            <group position={mainMenu.pos} rotation={mainMenu.rot as [number, number, number]}>
                {PROJECT_DATA.map((item, i) => {
                    const y = menuTextYStart - (i * menuSpacing);

                    return (
                        <ProjectMenuItem
                            key={item.key}
                            name={item.name}
                            isSelected={item.key === selectedKey}
                            yPos={y}
                            width={mainMenu.width}
                            menuSpacing={menuSpacing}
                            onClick={() => setSelectedKey(item.key)}
                        />
                    );
                })}
            </group>

            {/* --- 2. Detail/Tech Stack Panel (Middle) --- */}
            <group position={detailPanel.pos}>
                <AnimatedFeaturesList
                    features={selectedProject.features}
                    panelWidth={detailPanel.width}
                    startY={detailTextYStart}
                    selectedKey={selectedKey}
                />
            </group>

            {/* --- 3. Display Screen/Viewport (Right) --- */}
            <ViewportScreen
                width={viewport.width}
                height={viewport.height}
                position={viewport.pos}
                rotation={viewport.rot as [number, number, number]}
                specs={selectedProject.viewport.specs}
                title={selectedProject.viewport.title}
                linkHref={selectedProject.viewport.linkHref}
                projectKey={selectedProject.viewport.projectKey}
                imageSrc={selectedProject.viewport.imageSrc}
            />

        </group>
    );
}
