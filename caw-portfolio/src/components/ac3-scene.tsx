import { Canvas } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import { Environment } from './ac3/Environment';
import { MenuNavigation } from './ac3/MenuNavigation';
import { FloatingShards } from './ac3/FloatingShards';
import { ScrollIndication } from './ac3/ScrollIndication';
import { CameraOrbit } from './ac3/CameraOrbit';
import { SHARD_COUNT, HIGHLIGHT_COLOR, ACCENT_COLOR } from './ac3/constants';
import styles from './ac3-scene.module.css';

export default function AnimusUI() {
  const [currentMenu, setCurrentMenu] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(orientation: portrait)").matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={styles.animusContainer}>
      <Canvas
        className={styles.animusCanvas}
        camera={{ position: [0, 5, 15], fov: 60 }}
        shadows
        dpr={[1, 2]}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <Environment />
        <MenuNavigation currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} isMobile={isMobile} />
        <FloatingShards count={SHARD_COUNT} />
        <ScrollIndication />
        <CameraOrbit currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} isMobile={isMobile} />
      </Canvas>

      <div className={styles.navWrapper}>
        <div className={styles.navIndicator}>
          {['Introduction', 'Projects', 'Contact'].map((label, i) => (
            <button
              key={label}
              className={styles.navItem}
              onClick={() => setCurrentMenu(i)}
              style={{ color: i === currentMenu ? HIGHLIGHT_COLOR : ACCENT_COLOR }}
            >
              <span className={`${styles.dot} ${i === currentMenu ? styles.active : ''}`} />
              <span className={styles.label}>{label}</span>
              {i < 2 && <span className={styles.sep}>—</span>}
            </button>
          ))}
        </div>
      </div>


    </div>
  );
}