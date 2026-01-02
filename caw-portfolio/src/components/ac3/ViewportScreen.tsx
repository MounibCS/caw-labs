
import { Html } from '@react-three/drei';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import { Text3D } from './Text3D';
import { ACCENT_COLOR } from './constants';

/**
 * Renders the dark, tilted Viewport/Screen element.
 */
export function ViewportScreen({
    width,
    height,
    position,
    rotation,
    title,
    linkHref,
    projectKey,
    imageSrc
}: {
    width: number;
    height: number;
    position: [number, number, number];
    rotation: [number, number, number];
    specs: string[];
    title: string;
    linkHref?: string;
    projectKey?: string;
    imageSrc?: string
}) {
    const screenPadding = 0.5;
    const [isIframeLoading, setIsIframeLoading] = useState<boolean>(true);
    const [iframeKey, setIframeKey] = useState<string | undefined>(linkHref);

    useEffect(() => {
        // Reset loading state whenever the link changes
        setIframeKey(linkHref);
        setIsIframeLoading(!!linkHref);
    }, [linkHref]);

    return (
        <group position={position} rotation={rotation}>
            {/* Matte Black/Dark Gray Bezel */}
            <mesh position={[0, 0, 0.05]}>
                <boxGeometry args={[width, height, 0.2]} />
                <meshStandardMaterial color={'#111111'} roughness={0.5} metalness={0.8} />
            </mesh>

            {/* Screen Display Area (Black Background) */}
            <mesh position={[0, 0, 0.16]}>
                <boxGeometry args={[width - screenPadding, height - screenPadding, 0.01]} />
                <meshStandardMaterial color={'#000000'} emissive={'#000000'} emissiveIntensity={0.1} />
            </mesh>

            {/* HTML Sprite Overlay: show link or image when provided */}
            {(linkHref || imageSrc) && (
                <Html
                    position={[0, 0, 0.18]}
                    transform
                    distanceFactor={8}
                    style={{ pointerEvents: 'auto' }}
                >
                    <div style={{
                        width: '598px',
                        height: '496px',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0,0,0,0.6)',
                        border: '1px solid #2b2b2b',
                        borderRadius: '8px',
                        overflow: 'hidden'
                    }}>
                        {/* Branded loading overlay as a fallback while iframe is fetching */}
                        {linkHref && isIframeLoading && (
                            <div className="loading-screen" style={{ position: 'absolute', inset: 0 }}>
                                <div className="loading-backdrop" />
                                <div className="loading-content">
                                    {/* <div className="loading-brand"></div> */}
                                    <div className="loading-status">
                                        <span className="status-prefix">MODULE</span>
                                        <span className="status-main"> LOADING</span>
                                        <span className="status-ellipses" aria-hidden>
                                            <span>.</span>
                                            <span>.</span>
                                            <span>.</span>
                                        </span>
                                    </div>
                                    <div className="loading-bar"><div className="loading-bar-fill" /></div>
                                    <div className="loading-hint">Fetching remote HTML · Preparing viewport</div>
                                </div>
                                <div className="loading-scanlines" aria-hidden />
                                <div className="loading-vignette" aria-hidden />
                            </div>
                        )}
                        <Button
                            style={{
                                position: 'absolute',
                                top: '0.75rem',
                                right: '0.75rem',
                                zIndex: 10,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.375rem',
                                padding: '0.5rem 0.75rem',
                                fontWeight: 600,
                                // background-color logic is handled by button variants usually, 
                                // but here we override. We can use CSS variables.
                                backgroundColor: 'hsl(var(--background) / 0.8)',
                                color: '#bae6fd'
                            }}
                            asChild
                        >
                            <a
                                href={linkHref || (projectKey ? `/${projectKey}` : '/')}
                                target="_blank"
                                rel="noopener noreferrer"
                                tabIndex={0}
                                title={linkHref ? 'Open project in new tab' : 'Open details'}
                                onClick={e => e.stopPropagation()}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    textDecoration: 'none'
                                }}
                            >
                                {linkHref ? 'Open Live' : 'Open Details'}
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" style={{ verticalAlign: 'middle' }} viewBox="0 0 24 24" fill="none" stroke="#C3E7FD" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                            </a>
                        </Button>


                        {linkHref ? (
                            <iframe
                                key={iframeKey}
                                src={linkHref}
                                title={title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    border: 'none',
                                    borderRadius: '6px',
                                    background: '#111'
                                }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                sandbox="allow-scripts allow-same-origin allow-popups"
                                onLoad={() => setIsIframeLoading(false)}
                                onError={() => setIsIframeLoading(false)}
                            />
                        ) : imageSrc ? (
                            <ImageWithSkeleton src={imageSrc} alt={title} />
                        ) : null}
                    </div>
                </Html>
            )}

            {/* 3D Render Title Text */}
            <Text3D position={[-width / 2 + 0.5, height / 2 - 1, 0.17]} size={0.3} isHighlight={true} color={ACCENT_COLOR}>
                {title}
            </Text3D>

            {/* Subtle Ambient Blue/Cyan Light (Glow effect) */}
            <pointLight position={[0, 0, 0.4]} color={ACCENT_COLOR} intensity={0.5} distance={10} decay={2} />
        </group>
    );
}
