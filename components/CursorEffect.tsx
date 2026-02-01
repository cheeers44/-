import React, { useEffect, useRef, useState } from 'react';

const CursorEffect: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only enable on devices that support hover (desktop)
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      // Update cursor position directly without interpolation/lag
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the target is interactive
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.closest('.group'); // Covers the relationship cards

      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-all duration-200 ease-out hidden md:block mix-blend-difference
        ${isHovering 
          ? 'w-10 h-10 bg-blood/80 border border-blood' 
          : 'w-2 h-2 bg-gold'
        }
      `}
      style={{ 
        marginTop: isHovering ? '-20px' : '-4px', 
        marginLeft: isHovering ? '-20px' : '-4px',
        boxShadow: isHovering ? '0 0 15px rgba(127, 29, 29, 0.5)' : '0 0 5px rgba(197, 160, 89, 0.5)'
      }} 
    />
  );
};

export default CursorEffect;