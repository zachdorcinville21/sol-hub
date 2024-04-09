import { useEffect, useRef, useState } from "react";
import { PuffLoader } from "react-spinners";
import { getNftImage } from "../util/crud/getNftImage";
import { useWallet } from "../SolHub/util/useWallet";
import Tilt from "react-parallax-tilt";
import { useAnimation } from "../util/hooks/useAnimation";
import { theme } from "../util/theme";

export default function Gallery(): JSX.Element {
  const { nfts } = useWallet();
  const containerRef = useRef(null);

  const { fadeIn } = useAnimation();

  const [nftImgs, setNftImgs] = useState<string[]>([]);
  const [imgsLoaded, setImgsLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (nfts) {
        const imageLinks = [];

        for (const nft of nfts) {
          if (nft.data.uri === null) continue;
          const image = await getNftImage(nft.data.uri);
          if (!!image) {
            imageLinks.push(image);
          }
        }

        if (imageLinks.length) {
          setNftImgs(imageLinks);
          setImgsLoaded(true);
        }
      }
    })();
  }, [nfts]);

  useEffect(() => {
    if (imgsLoaded && containerRef.current) {
      fadeIn(containerRef.current);
    }
  }, [imgsLoaded, containerRef.current]);

  return (
    <div className="w-full flex justify-center items-center">
      {imgsLoaded ? (
        <div
          id="nft-gallery"
          className="w-8/12 grid gap-16 justify-items-center justify-center opacity-0"
          style={{ gridTemplateColumns: "repeat(auto-fit, 180px)" }}
          ref={containerRef}
        >
          {nftImgs.map((img: string, i: number) => (
            <Tilt tiltReverse>
              {img !== null ? (
                <img key={i} className="transition-all" src={img} alt="art" />
              ) : (
                <div
                  className="w-40 h-40 border-2 border-white flex flex-col justify-center items-center"
                >
                  <img
                    src="https://sticnuru.sirv.com/sol-hub-imgs/question.png"
                    className="w-20 h-20"
                    alt="question mark"
                  />
                  <p className="text-white font-noto text-sm">
                    Media not available
                  </p>
                </div>
              )}
            </Tilt>
          ))}
        </div>
      ) : (
        <PuffLoader loading color={theme.colors.blue[900]} size="100px" />
      )}
    </div>
  );
}
