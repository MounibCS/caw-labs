"use client"
import React, { useState, useEffect } from 'react';

// Configurable variables
const MOVEMENT_SPEED_MULTIPLIER = 1.5; // Adjust this to control cloud movement speed
const CLOUD_COLOR = '#dbdbdb'; // RGB 145, 145, 145

const Cloud = ({ offsetX, offsetY, speed }: { offsetX: number, offsetY: number, speed: number }) => {
  const [position, setPosition] = useState(offsetX);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      
      setPosition((prev) => {
        // Move clouds based on scroll delta and the cloud's speed
        const newPosition = prev + (scrollDelta * speed * MOVEMENT_SPEED_MULTIPLIER);
        
        // When cloud moves off-screen to the right, reset it to the left
        if (newPosition > window.innerWidth + 300) {
          return -600;
        }
        // When cloud moves off-screen to the left, reset it to the right
        if (newPosition < -700) {
          return window.innerWidth + 100;
        }
        return newPosition;
      });
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, lastScrollY]);

  // Convert hex color to rgba for shadows
  const r = parseInt(CLOUD_COLOR.slice(1, 3), 16);
  const g = parseInt(CLOUD_COLOR.slice(3, 5), 16);
  const b = parseInt(CLOUD_COLOR.slice(5, 7), 16);

  return (
    <div className="absolute" style={{ left: `${position}px`, top: `${offsetY}px` }}>
      <div className="w-[600px] h-[100px] rounded-full absolute top-[90px]" 
          style={{ 
            filter: 'url(#filter-base)',
            boxShadow: `200px 170px 19px 40px rgba(${r},${g},${b},0.9)`
          }}></div>
      <div className="w-[500px] h-[30px] rounded-full absolute top-[90px]" 
          style={{ 
            filter: 'url(#filter-back)',
            boxShadow: `200px 200px 10px 40px rgba(${r},${g},${b},0.7)`
          }}></div>
      <div className="w-[580px] h-[35px] rounded-full absolute top-[80px]" 
          style={{ 
            filter: 'url(#filter-mid)',
            boxShadow: `210px 250px 28px 30px rgba(${r},${g},${b},0.5)`
          }}></div>
      <div className="w-[450px] h-[40px] rounded-full absolute top-[70px] left-[-20px]" 
          style={{ 
            filter: 'url(#filter-front)',
            boxShadow: `210px 272px 30px 0px rgba(${r},${g},${b},0.6)`
          }}></div>
    </div>
  );
};

const CloudAnimation = () => {
  // Create an array of cloud positions with varying speeds
  const clouds = [
    { x: -100, y: -100, speed: 0.5 },
    { x: -500, y: 50, speed: 0.3 },
    { x: -900, y: -150, speed: 0.7 },
    { x: -300, y: 100, speed: 0.4 },
    { x: -700, y: 300, speed: 0.6 },
    { x: -1100, y: 400, speed: 0.2 },
    { x: -1500, y: 250, speed: 0.5 },
  ];

  return (
    <div className="w-screen h-screen bg-[#f4f4f4] p-[1%] overflow-hidden fixed -z-10">
      {clouds.map((cloud, index) => (
        <Cloud key={index} offsetX={cloud.x} offsetY={cloud.y} speed={cloud.speed} />
      ))}
      
      <svg width="0" height="0"> 
        <filter id="filter-base">
          <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="5" seed="8517" />     
          <feDisplacementMap in="SourceGraphic" scale="120" />
        </filter>
        <filter id="filter-back">
          <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="3" seed="8517" />     
          <feDisplacementMap in="SourceGraphic" scale="120" />
        </filter>
        <filter id="filter-mid">
          <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="3" seed="8517"/>
          <feDisplacementMap in="SourceGraphic" scale="120" />
        </filter>
        <filter id="filter-front">
          <feTurbulence type="fractalNoise" baseFrequency="0.009" numOctaves="4" seed="8517"/>
          <feDisplacementMap in="SourceGraphic" scale="50" />
        </filter>
      </svg>
    </div>
  );
};

export default CloudAnimation;