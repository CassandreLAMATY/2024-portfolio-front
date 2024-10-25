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

/**
 * The animation is in two parts:
 * 1. The letter goes up and is being colored (the outline is colored too)
 * 2. The letter goes down without removing the color
 * @param {NodeListOf<HTMLElement>} letters array of letters
 * @param {HTMLElement} item the letter to animate
 */
function animatePortfolioLetters(letters: NodeListOf<HTMLElement>, item: HTMLElement) {
    gsap.timeline()
        .to(item, { y: -20, duration: 0.2, ease: 'ease-in' })
        .to(item, { y: 0, duration: 1.2, ease: 'elastic.out' });

    const index: number = Array.from(letters).indexOf(item);

    if ((index % 3) - 2 === 0)
        gsap.timeline().to(item, {
            color: '#bbdb9b',
            webkitTextStroke: '0.5px #bbdb9b',
            duration: 0.2
        });
    if ((index % 3) - 1 === 0)
        gsap.timeline().to(item, {
            color: '#f4e4ba',
            webkitTextStroke: '0.5px #f4e4ba',
            duration: 0.2
        });
    if (index % 3 === 0)
        gsap.timeline().to(item, {
            color: '#ffe3e0',
            webkitTextStroke: '0.5px #ffe3e0',
            duration: 0.2
        });
}

export function portfolioAnimation(): void {
    const title: HTMLElement | null = document.querySelector('.welcome-title');
    if (!title) return;

    const letters: NodeListOf<HTMLElement> = title.querySelectorAll('.welcome-title--letter');
    let isAnimating: boolean = false;
    let colorRemovalTimeline: gsap.core.Timeline | null = null;

    letters.forEach((letter) => {
        letter.addEventListener('mouseenter', () => {
            if (isAnimating) return;
            isAnimating = true;

            const index: number = Array.from(letters).indexOf(letter);
            const before: HTMLElement[] = Array.from(letters).slice(0, index).reverse();
            const after: HTMLElement[] = Array.from(letters).slice(index + 1);

            animatePortfolioLetters(letters, letters[index]);

            setTimeout(() => {
                before.forEach((letter, i) => {
                    setTimeout(() => {
                        animatePortfolioLetters(letters, letter);
                    }, 100 * i);
                });
                after.forEach((letter, i) => {
                    setTimeout(() => {
                        animatePortfolioLetters(letters, letter);
                    }, 100 * i);
                });
            }, 100);

            setTimeout(() => {
                isAnimating = false;
            }, 1000);

            if (colorRemovalTimeline) {
                colorRemovalTimeline.kill();
            }

            colorRemovalTimeline = gsap.timeline();
            colorRemovalTimeline
                .add(() => {
                    if (isAnimating) return;
                })
                .to(
                    letters,
                    {
                        color: 'transparent',
                        webkitTextStroke: '0.5px #f9f9f9',
                        stagger: 1,
                        duration: 0.5,
                        onStart: () => {
                            if (isAnimating) colorRemovalTimeline?.kill();
                        }
                    },
                    '+=10'
                );
        });
    });
}
