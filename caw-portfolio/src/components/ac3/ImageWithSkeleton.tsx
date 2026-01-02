
import { useState } from 'react';

// Defines a small helper component for images with skeleton loading state
export function ImageWithSkeleton({ src, alt }: { src: string; alt: string }) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {isLoading && (
                <div className="skeleton-loader" style={{ position: 'absolute', inset: 0, zIndex: 10 }} />
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
            />
        </>
    );
}
