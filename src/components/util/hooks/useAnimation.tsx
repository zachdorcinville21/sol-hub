import gsap from 'gsap';

interface AnimationControls {
    fadeIn: (selector: string) => void;
    leftFadeSlide: (selector: string) => void;
}

export const useAnimation = (): AnimationControls => {
    const fadeIn = (selector: string): void => {
        gsap.to(selector, {
            autoAlpha: 1,
            duration: 1.5,
        });
    }

    const leftFadeSlide = (selector: string): void => {
        gsap.to(selector, {
            autoAlpha: 1,
            x: '3rem',
            duration: 1.2,
        });
    }

    return {
        fadeIn,
        leftFadeSlide,
    }
}

