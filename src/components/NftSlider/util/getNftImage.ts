export async function getNftImage(uri: string): Promise<string> {
    let image = null;

    try {
        const result = await fetch(uri);
        const data = await result.json();

        if (data) image = data.image;
    } catch (e) {
        console.error(e);
    }

    return image;
}

