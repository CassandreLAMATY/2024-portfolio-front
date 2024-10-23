import { gsap } from 'gsap';

export function sunGlowAnimation() {
    const sunSphere: HTMLElement | null = document.querySelector('.sun-sphere');
    const sunGlow: HTMLElement | null = document.querySelector('.sun-glow');

    if (!sunSphere || !sunGlow) return;
    
    gsap.to(sunGlow, {
        rotation: 360,
        duration: 32,
        repeat: -1,
        ease: 'linear'
    });

    sunSphere.addEventListener('mouseenter', () => {
        gsap.to(sunGlow, { scale: 1.142857142857143 });
    });

    sunSphere.addEventListener('mouseleave', () => {
        gsap.to(sunGlow, { scale: 1 });
    });

    let resizeTimeout: number | undefined;
    
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(() => {
            gsap.set(sunGlow, { clearProps: 'rotation, scale' });
            gsap.to(sunGlow, {
                rotation: 360,
                duration: 32,
                repeat: -1,
                ease: 'linear'
            });
        }, 150);
    }

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
}

export function portfolioAnimation(): void {
    const title: HTMLElement | null = document.querySelector('.welcome-title');
    if (!title) return;

    const letters: NodeListOf<HTMLElement> = title.querySelectorAll('.welcome-title--letter');

    // Each letter in the title must 'jump' around the hovered letter
    letters.forEach(letter => {
        letter.addEventListener('mouseenter', () => {
            // Check index of hovered letter
            // Create 2 arrays with the letters before and after the hovered letter
            const index: number = Array.from(letters).indexOf(letter);
            const before: HTMLElement[] = Array.from(letters).slice(0, index).reverse();
            const after: HTMLElement[] = Array.from(letters).slice(index + 1);

            // Animate the letters before the hovered letter
            before.forEach((letter, i) => {
                gsap.to(letter, {
                    x: -20 * (i + 1),
                    y: -20 * (i + 1),
                    duration: 0.5
                });
            });

            // Animate the letters after the hovered letter
            after.forEach((letter, i) => {
                gsap.to(letter, {
                    x: 20 * (i + 1),
                    y: 20 * (i + 1),
                    duration: 0.5
                });
            });
        });

        letter.addEventListener('mouseleave', () => {
            // Reset the position of all letters
            gsap.to(letters, {
                x: 0,
                y: 0,
                duration: 0.5
            });
        });
    });
}