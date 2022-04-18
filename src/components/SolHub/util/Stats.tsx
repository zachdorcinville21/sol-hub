interface StatsProps {
    price: string | null;
    change: string | null;
    balance: number | null;
}

const Stats = ({ price, change, balance }: StatsProps) => {
    const negative: boolean = change !== null && change.includes('-');
    const solPrice: string = price !== null ? `$${parseFloat(price!).toFixed(2)}` : '';
    const solChange: string = change !== null ? (negative ? `${parseFloat(change!).toFixed(2)}%` : `+${parseFloat(change!).toFixed(2)}%`) : '';

    const statsWidth: string = 'w-8/12 sm:w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12 2xl:w-2/12';

    return (
        <div className={`${statsWidth} bg-black p-6 rounded-md gap-8 flex flex-col justify-center items-center`}>
            <div className='w-full flex flex-col justify-center items-center gap-3'>
                <div className='w-full flex flex-row justify-center items-center'>
                    <img src='https://sticnuru.sirv.com/sol-hub-imgs/solana.png' className='w-10 h-10' alt='solana' />Ï
                    <p className='text-3xl text-white font-normal font-noto flex mt-2 items-center gap-2'>
                        Solana <sub className='text-base text-gray-400 mb-0.5'>SOL</sub>
                    </p>
                </div>
                <div className='w-full flex flex-row gap-1 justify-center items-center'>
                    <p className='text-white text-3xl font-normal font-anek'>{solPrice}</p>
                    <div className='flex flex-row gap-2 items-center justify-center'>
                        <sup className={negative ? 'text-red-700 font-noto text-base flex flex-row gap-1 items-center' : 'text-green-600 font-noto text-sm flex flex-row gap-1 items-center'}>
                            {solChange}
                            <small className='text-white text-sm font-noto'>(1D)</small>
                        </sup>
                    </div>
                </div>
            </div>

            <div className='w-full flex justify-center'>
                <p className='text-white font-noto font-light text-lg'>{`Current balance: ${balance ?? 0} SOL`}</p>
            </div>
        </div>
    );
}


export default Stats;

