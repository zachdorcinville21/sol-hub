export function getPhantomProvider() {
    if ("solana" in window) {
        const provider = window.solana;

        if (provider.isPhantom) {
            return provider;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

