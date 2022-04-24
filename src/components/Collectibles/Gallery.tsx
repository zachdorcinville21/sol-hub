import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { RingLoader } from 'react-spinners';
import { getNftImage } from '../NftSlider/util/getNftImage';
import { useWallet } from '../SolHub/util/useWallet';
import Tilt from 'react-parallax-tilt';
import { useAnimation } from '../util/hooks/useAnimation';

const paperStyles = makeStyles({
    paper: {
        width: "70%",
        backgroundColor: '#000',
        padding: '2rem',
        display: 'flex',
        boxShadow: '0 0 40px rgba(37, 99, 235, 0.75)',
        borderRadius: '3%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default function Gallery(): JSX.Element {
    const classes = paperStyles();
    const { nfts } = useWallet();

    const { fadeIn } = useAnimation();

    const [nftImgs, setNftImgs] = useState<string[]>([]);
    const [imgsLoaded, setImgsLoaded] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const imagePromises: Promise<string>[] = nfts!.map(async (nft: { [key: string]: any }) => {
                return await getNftImage(nft.data.uri);
            });

            const imgLinks = await Promise.all(imagePromises);
            console.log(imgLinks)

            setNftImgs(imgLinks);
            setImgsLoaded(true);

            fadeIn("#nft-gallery");
        })();

        //eslint-disable-next-line
    }, [nfts]);

    return (
        <Paper classes={{ root: classes.paper }}>
            {imgsLoaded &&
                <div id="nft-gallery" className='w-full grid grid-cols-4 gap-16 justify-items-center opacity-0'>
                    {nftImgs.map((img: string, i: number) => (
                        <Tilt tiltReverse>
                            {img !== null ?
                                <img key={i} className='w-24 h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 transition-all' src={img} alt='art' /> :
                                <div className='w-40 h-40 border-2 border-white flex flex-col justify-center items-center'>
                                    <img src='https://sticnuru.sirv.com/sol-hub-imgs/question.png' className='w-20 h-20' alt='question mark' />
                                    <p className='text-white font-noto text-sm'>Media not available</p>
                                </div>
                            }
                        </Tilt>
                    ))}
                </div>
            }
            {
                !imgsLoaded &&
                <RingLoader loading color='#fff' />
            }
        </Paper>
    );
}
