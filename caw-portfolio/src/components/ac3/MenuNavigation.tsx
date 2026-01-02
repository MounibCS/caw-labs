
import { MENU_ANCHOR_POSITION, HIGHLIGHT_COLOR, ACCENT_COLOR, EMISSIVE_INTENSITY } from './constants';
import { IntroductionPanel } from './IntroductionPanel';
import { ProjectsPanel } from './ProjectsPanel';
import { ContactPanel } from './ContactPanel';

/**
 * Menu Navigation Component
 */
export function MenuNavigation({ currentMenu, setCurrentMenu, isMobile }: { currentMenu: number; setCurrentMenu: (menu: number) => void; isMobile: boolean }) {
    const menus = ['Introduction', 'Projects', 'Contact'];

    return (
        <group position={MENU_ANCHOR_POSITION}>
            <IntroductionPanel visible={currentMenu === 0} />
            <ProjectsPanel visible={currentMenu === 1} isMobile={isMobile} />
            <ContactPanel visible={currentMenu === 2} />

            {/* Menu indicators */}
            {menus.map((menu, i) => (
                <mesh
                    key={i}
                    position={[-8, 4 - i * 3.5, 0]} // Adjusted Y position to match new panel positions
                    onClick={() => setCurrentMenu(i)}
                >
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial
                        color={currentMenu === i ? HIGHLIGHT_COLOR : ACCENT_COLOR}
                        emissive={currentMenu === i ? HIGHLIGHT_COLOR : ACCENT_COLOR}
                        emissiveIntensity={currentMenu === i ? EMISSIVE_INTENSITY * 2 : EMISSIVE_INTENSITY}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            ))}
        </group>
    );
}
