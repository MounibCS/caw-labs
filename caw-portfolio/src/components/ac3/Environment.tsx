
import { ACCENT_COLOR, FOG_COLOR } from './constants';

/**
 * Creates the volumetric fog and lighting environment.
 * Includes multiple lights for complex scattering and a light fog.
 */
export function Environment() {
    return (
        <>
            {/* Volumetric Fog Field (Light Color) */}
            <color attach="background" args={[FOG_COLOR]} />
            <fog attach="fog" args={[FOG_COLOR, 5, 45]} />

            {/* Lighting for depth and subtle scattering */}
            <ambientLight intensity={0.4} color="#ffffff" />
            {/* Subtle light scatter - Steel Blue/Cyan */}
            <pointLight position={[10, 10, 10]} intensity={1.5} color={ACCENT_COLOR} distance={40} decay={2} />
            {/* Subtle light scatter - Pale Red/Magenta */}
            <pointLight position={[-15, -15, 0]} intensity={1.0} color="#ffaaee" distance={40} decay={2} />
            {/* Main light for panel definition */}
            <directionalLight position={[0, 5, 5]} intensity={0.7} color="#ffffff" />
        </>
    );
}
