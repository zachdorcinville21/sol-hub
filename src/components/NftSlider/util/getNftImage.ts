export async function getNftImage(uri: string): Promise<string | null> {
  try {
    const result = await fetch(uri);
    const data = await result.json();

    return data.image;
  } catch (e) {
    console.error(e);
    return null;
  }
}
