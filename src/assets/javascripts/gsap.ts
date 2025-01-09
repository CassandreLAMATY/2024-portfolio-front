import { gsap } from 'gsap';

export function btnRoundAnimation(btn: HTMLElement) {
    gsap.to(btn, {
        repeat: 0,
        duration: 0.6,
        keyframes: [
            { rotation: 20, duration: 0.1 },
            { rotation: -15, duration: 0.1 },
            { rotation: 10, duration: 0.1 },
            { rotation: -5, duration: 0.1 },
            { rotation: 0, duration: 0.1 }
        ],
        ease: 'power1.inOut'
    });
}
