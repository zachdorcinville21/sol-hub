import { useState, useEffect } from 'react';

interface ScreenDimensions {
    screenWidth: number;
}

export const useScreenSize = (): ScreenDimensions => {
    const [screenWidth, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        });
    });

    return { screenWidth };
}
