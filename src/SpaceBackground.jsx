import React, { useEffect, useRef } from "react";

function SpaceBackground() {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;

    // Yıldızları oluştur
    const starsContainer = document.createElement("div");
    starsContainer.className = "stars";
    for (let i = 0; i < 200; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.width = `${Math.random() * 2}px`;
      star.style.height = star.style.width;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      starsContainer.appendChild(star);
    }

    // Kayan yıldız oluştur
    const shootingStar = document.createElement("div");
    shootingStar.className = "shooting-star";
    starsContainer.appendChild(shootingStar);

    background.appendChild(starsContainer);

    // Kayan yıldız animasyonunu tekrarla
    setInterval(() => {
      shootingStar.style.left = `${Math.random() * 100}%`;
      shootingStar.style.top = `${Math.random() * 100}%`;
      shootingStar.style.animation = "none";
      shootingStar.offsetHeight; // Reflow
      shootingStar.style.animation = null;
    }, 5000);

    return () => {
      background.removeChild(starsContainer);
    };
  }, []);

  return <div ref={backgroundRef} className="space-background" />;
}

export default SpaceBackground;
