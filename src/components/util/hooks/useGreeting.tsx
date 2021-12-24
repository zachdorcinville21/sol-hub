export const useGreeting = (): string => {
    const now = new Date();

    const hr = now.getHours();

    if (hr >= 0 && hr < 12) {
        return 'Good morning';
    } else if (hr >= 12 && hr < 17) {
        return 'Good afternoon';
    } else if (hr >= 17 && hr < 24) {
        return 'Good evening';
    } else {
        return 'Welcome';
    }
}