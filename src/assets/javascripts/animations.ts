import { gsap } from 'gsap';

export function sunGlowAnimation() {
    const sunSphere: HTMLElement | null = document.querySelector('.sun-sphere');
    const sunGlow: HTMLElement | null = document.querySelector('.sun-glow');

    if (!sunSphere || !sunGlow) return;

    gsap.set(sunGlow, { transformOrigin: 'center center' });

    gsap.to(sunGlow, {
        rotation: 360,
        duration: 32,
        repeat: -1,
        ease: 'linear'
    });

    sunSphere.addEventListener('mouseenter', () => {
        gsap.to(sunGlow, { scale: 1.1 });
    });

    sunSphere.addEventListener('mouseleave', () => {
        gsap.to(sunGlow, { scale: 1 });
    });
}
