import React, { useState, useEffect } from 'react';

const OrientationOverlay = ({ children }) => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const portrait = window.innerHeight > window.innerWidth;
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      setIsPortrait(portrait);
      setIsMobile(mobile);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Only show overlay if it's a mobile device in portrait mode
  if (isMobile && isPortrait) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-secondary text-white p-8 text-center">
        <div className="animate-bounce mb-8">
          <span className="material-symbols-outlined text-8xl text-primary">screen_rotation</span>
        </div>
        <h1 className="text-4xl font-black uppercase mb-4 tracking-tighter">Landscape Mode Required</h1>
        <p className="text-lg text-gray-400 font-body mb-8 max-w-xs">
          For the best racing experience, please rotate your device to landscape mode.
        </p>
        <div className="w-24 h-12 border-4 border-white rounded-lg relative overflow-hidden flex items-center justify-center">
           <div className="w-1 h-6 bg-white/20 absolute left-2 rounded-full"></div>
           <div className="text-[8px] font-bold uppercase opacity-50">SUMMER DASH</div>
        </div>
      </div>
    );
  }

  return children;
};

export default OrientationOverlay;
