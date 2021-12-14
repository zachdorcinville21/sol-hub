import { Phantom } from "./types";


export async function connectToWallet(phantom: Phantom | null): Promise<string | null> {
    let result = null;

    try {
        const res: any = await phantom?.connect();
        if (res) result = res.publicKey.toString();
    } catch (e) {
        console.error(e);
    }

    return result;
}