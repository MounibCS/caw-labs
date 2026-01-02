
import { OrbitControls } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
//@ts-expect-error
import * as THREE from 'three';
import { useRef, useMemo, useEffect } from 'react';

/**
 * Continuous, subtle camera orbit around the menu core with scroll control.
 * Now includes mouse-based automatic orbiting without requiring clicks.
 */
export function CameraOrbit({ currentMenu, setCurrentMenu, isMobile }: { currentMenu: number; setCurrentMenu: (menu: number) => void; isMobile: boolean }) {
    const { camera } = useThree();
    const controlsRef = useRef<any>(null);
    const centerTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);

    // Mouse position for auto-orbit (normalized -1 to 1)
    const mousePosition = useRef({ x: 0, y: 0 });
    const targetMousePosition = useRef({ x: 0, y: 0 });

    // Preset camera states (position and look target) for 3 menus
    const cameraStates = useMemo(() => {
        if (isMobile) {
            // Mobile/Portrait adjustments - pulled back for better visibility
            return [
                { position: new THREE.Vector3(-5, 5, 12), target: new THREE.Vector3(-4, 1.5, 0) },
                { position: new THREE.Vector3(-10, 1, 30), target: new THREE.Vector3(0, 0, 0) },
                { position: new THREE.Vector3(-5, -5, 25), target: new THREE.Vector3(0, -2, 0) },
            ];
        }
        return [
            { position: new THREE.Vector3(-5, 5, 8), target: new THREE.Vector3(-3, 1.5, 0) },
            { position: new THREE.Vector3(-2, 1, 14), target: new THREE.Vector3(1, 0, 2) },
            { position: new THREE.Vector3(2, -5, 10), target: new THREE.Vector3(0, -2, 0) },
        ];
    }, [isMobile]);

    // Animated transition targets
    const destinationPosition = useRef<THREE.Vector3>(cameraStates[0].position.clone());
    const destinationTarget = useRef<THREE.Vector3>(cameraStates[0].target.clone());
    const lookTarget = useRef<THREE.Vector3>(cameraStates[0].target.clone());

    // Handle mouse movement for auto-orbit
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse position to -1 to 1
            targetMousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            targetMousePosition.current.y = (e.clientY / window.innerHeight) * 2 - 1;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Handle scroll events
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            if (e.deltaY > 0) {
                // Scroll down
                setCurrentMenu(Math.min(currentMenu + 1, 2));
            } else {
                // Scroll up
                setCurrentMenu(Math.max(currentMenu - 1, 0));
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [currentMenu, setCurrentMenu]);

    // When menu changes, set new destination state
    useEffect(() => {
        const state = cameraStates[currentMenu];
        if (!state) return;
        destinationPosition.current.copy(state.position);
        destinationTarget.current.copy(state.target);
    }, [currentMenu, cameraStates]);

    // Smoothly interpolate camera position and look target with mouse-based orbit
    useFrame(() => {
        // Smooth lerp for mouse position
        mousePosition.current.x += (targetMousePosition.current.x - mousePosition.current.x) * 0.05;
        mousePosition.current.y += (targetMousePosition.current.y - mousePosition.current.y) * 0.05;

        // Transition speed
        const lerpAlpha = 0.08;

        // Calculate mouse-based offset for orbit effect
        const orbitStrength = 2.5; // How much the camera moves based on mouse
        const mouseOffsetX = mousePosition.current.x * orbitStrength;
        const mouseOffsetY = -mousePosition.current.y * orbitStrength * 0.5;

        // Apply mouse offset to the destination position
        const adjustedDestination = destinationPosition.current.clone();
        adjustedDestination.x += mouseOffsetX;
        adjustedDestination.y += mouseOffsetY;

        // Position interpolation with mouse offset
        camera.position.lerp(adjustedDestination, lerpAlpha);

        // Target interpolation and controls update
        lookTarget.current.lerp(destinationTarget.current, lerpAlpha);
        if (controlsRef.current) {
            controlsRef.current.target.copy(lookTarget.current);
            controlsRef.current.update();
        }

        // Ensure camera rotation matches the target
        camera.lookAt(lookTarget.current);
    });

    return (
        <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.05}
            enableZoom={true}
            minDistance={8}
            maxDistance={25}
            rotateSpeed={0.3}
            enableRotate={false} // Disable manual rotation since we're using mouse-based auto-orbit
            target={centerTarget}
        />
    );
}
