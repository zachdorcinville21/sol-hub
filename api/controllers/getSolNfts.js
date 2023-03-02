import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";

export async function getSolNfts(req, res) {
    const { publicKey } = req.body.data;

    try {
        const tokenList = await getParsedNftAccountsByOwner({ publicAddress: publicKey });
        res.send({ tokenList });
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
}
