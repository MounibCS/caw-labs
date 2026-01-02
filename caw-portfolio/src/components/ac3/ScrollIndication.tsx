
import { Html } from '@react-three/drei';
import { useState, useEffect } from 'react';
import { ACCENT_COLOR, HIGHLIGHT_COLOR } from './constants';

/**
 * One-time scroll indication that sits in the scene and prompts interaction.
 */
export function ScrollIndication() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Dismiss on any scroll
        const handleAction = () => {
            setVisible(false);
        };

        // Add listeners with a small delay to avoid immediate dismissal if user is already interacting
        const timer = setTimeout(() => {
            window.addEventListener('wheel', handleAction, { once: true });
            window.addEventListener('touchstart', handleAction, { once: true });
        }, 500);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('wheel', handleAction);
            window.removeEventListener('touchstart', handleAction);
        };
    }, []);

    if (!visible) return null;

    return (
        <Html
            position={[-4.5, -1, 2]} // Positioned centrally below the intro content
            center
            style={{ pointerEvents: 'none', whiteSpace: 'nowrap', userSelect: 'none' }}
            zIndexRange={[100, 0]}
        >
            <div className="scroll-hint-container">
                <div className="mouse-icon">
                    <div className="wheel-dot" />
                </div>
                <div className="scroll-text">SCROLL TO EXPLORE</div>

                <style>{`
            .scroll-hint-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 12px;
                opacity: 0; /* Start invisible for animation */
                animation: fadeEntry 1.5s ease-out 0.5s forwards;
            }

            .mouse-icon {
                width: 24px;
                height: 38px;
                border: 2px solid ${ACCENT_COLOR};
                border-radius: 12px;
                position: relative;
                box-shadow: 0 0 15px ${ACCENT_COLOR}30;
                background: rgba(0,0,0,0.2);
                backdrop-filter: blur(2px);
            }
            .wheel-dot {
                width: 4px;
                height: 6px;
                background: ${HIGHLIGHT_COLOR};
                border-radius: 2px;
                position: absolute;
                top: 6px;
                left: 50%;
                transform: translateX(-50%);
                animation: scrollDot 1.8s ease-in-out infinite;
                box-shadow: 0 0 8px ${HIGHLIGHT_COLOR};
            }
            .scroll-text {
                font-family: 'Inter', sans-serif;
                font-size: 10px;
                letter-spacing: 3px;
                color: ${ACCENT_COLOR};
                font-weight: 600;
                text-shadow: 0 0 8px ${ACCENT_COLOR}80;
                background: linear-gradient(to bottom, #fff, ${ACCENT_COLOR});
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            @keyframes scrollDot {
                0% { top: 6px; opacity: 1; }
                40% { top: 20px; opacity: 0; }
                100% { top: 6px; opacity: 0; }
            }
            @keyframes fadeEntry {
                0% { opacity: 0; transform: translateY(30px); }
                100% { opacity: 0.9; transform: translateY(0); }
            }
        `}</style>
            </div>
        </Html>
    );
}
