
export function getPhantomProvider() {
    if ("solana" in window) {
        const provider = window.solana;
        console.log("🚀 ~ file: getPhantomProvider.ts ~ line 9 ~ getPhantomProvider ~ provider", provider)

        if (provider.isPhantom) {
            return provider;
        } else {
            return null;
        }
    }
}

