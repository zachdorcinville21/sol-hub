import { useState, useEffect } from 'react';
import { getNftImage } from './util/getNftImage';
import Carousel, { autoplayPlugin, slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

interface SliderProps {
    nfts: Array<{ [key: string]: any }> | null;
}

const NftSlider = ({ nfts }: SliderProps) => {
    const [nftImgs, setNftImgs] = useState<string[]>([]);

    const sliderWidth: string = 'w-full md: w-9/12 xl:w-8/12';

    const slidesToShow: number = window.screen.width <= 640 ? 1 : 3;

    useEffect(() => {
        (async () => {
            const imagePromises: Promise<string>[] = nfts!.map(async (nft: { [key: string]: any }) => {
                return await getNftImage(nft.data.uri);
            });

            const imgLinks = await Promise.all(imagePromises);
            setNftImgs(imgLinks);
        })();
    }, [nfts]);

    useEffect(() => {
        console.log(nftImgs);
    }, [nftImgs]);

    return (
        <div className={`${sliderWidth} flex flex-col gap-10 justify-center items-center`}>
            <div className='w-5/12 lg:w-3/12 p-1 rounded-md bg-black shadow-lg shadow-cyan-500 text-center'>
                <div className='text-white text-lg'>Collectibles</div>
            </div>
            {nftImgs.length > 0 &&
                <Carousel
                    plugins={[
                        'infinite',
                        {
                            resolve: slidesToShowPlugin,
                            options: {
                                numberOfSlides: slidesToShow,
                            }
                        },
                        {
                            resolve: autoplayPlugin,
                            options: {
                                interval: 2000,
                            }
                        },
                    ]}
                    animationSpeed={1000}
                >
                    {nftImgs?.map((img: string, idx: number) => (
                        <img key={idx} className='w-40 h-40' src={img} alt='art' />
                    ))}
                </Carousel>
            }
        </div>
    );
}


export default NftSlider;

