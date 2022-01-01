import { createClient } from 'redis';

const client = createClient();

(async () => {
    await client.connect();
})();

export async function setVal(req, res) {
    const { key, val } = req.body.data;

    try {
        await client.set(key, JSON.stringify(val));
        res.status(200);
    } catch (e) {
        res.status(500);
        throw new Error(e);
    }

    return res.sendStatus(res.statusCode);
}

export async function getVal(req, res) {
    let data = null;

    const { key } = req.body.data;

    try {
        data = await client.get(key);
    } catch (e) {
        throw new Error(e);
    }

    return res.send(data);
}

