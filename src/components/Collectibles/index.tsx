import { BackButton } from "../util/misc/BackButton";
import Gallery from "./Gallery";

export default function Collectibles(): JSX.Element {
    return (
        <div className="bg-gray-900 w-full min-h-screen flex flex-col pt-28 pb-36 gap-12 justify-start items-center">
            <BackButton to="/" />
            <h1 className='font-noto text-white text-4xl'>Collectibles</h1>
            <Gallery />
        </div>
    );
}
