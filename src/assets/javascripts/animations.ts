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

    letters.forEach((letter) => {
        letter.addEventListener('mouseenter', () => {
            const index: number = Array.from(letters).indexOf(letter);
            const before: HTMLElement[] = Array.from(letters).slice(0, index).reverse();
            const after: HTMLElement[] = Array.from(letters).slice(index + 1);

            function animate(item: HTMLElement) {
                gsap.timeline()
                    .to(item, { y: -20, duration: 0.2, ease: 'ease-in' })
                    .to(item, { y: 0, duration: 1.2, ease: 'elastic.out' });

                const index: number = Array.from(letters).indexOf(item);

                if ((index % 3) - 2 === 0)
                    gsap.timeline().to(item, {
                        color: '#bbdb9b',
                        duration: 0.2
                    });
                if ((index % 3) - 1 === 0)
                    gsap.timeline().to(item, {
                        color: '#f4e4ba',
                        duration: 0.2
                    });
                if (index % 3 === 0)
                    gsap.timeline().to(item, {
                        color: '#ffe3e0',
                        duration: 0.2
                    });
            }

            animate(letters[index]);

            setTimeout(() => {
                before.forEach((letter, i) => {
                    setTimeout(() => {
                        animate(letter);
                    }, 100 * i);
                });

                after.forEach((letter, i) => {
                    setTimeout(() => {
                        animate(letter);
                    }, 100 * i);
                });
            }, 100);
        });
    });
}
