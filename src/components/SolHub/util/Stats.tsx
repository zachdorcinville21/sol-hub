interface StatsProps {
    price: string | null;
    change: string | null;
}

const Stats = ({ price, change }: StatsProps) => {
    const negative: boolean = change !== null && change.includes('-');
    const solPrice: string = `$${parseFloat(price!).toFixed(2)}`;
    const solChange: string = negative ? `${parseFloat(change!).toFixed(2)}%` : `+${parseFloat(change!).toFixed(2)}%`;

    return (
        <div className='w-1/5 bg-black p-6 rounded-md gap-4 flex flex-col justify-center items-center'>
            <div className='w-full flex flex-row justify-center items-center'>
                <img src='https://sticnuru.sirv.com/sol-hub-imgs/solana.png' className='w-10 h-10' alt='solana' />Ï
                <p className='text-2xl text-white font-normal flex items-center gap-2'>
                    Solana <sub className='text-base text-gray-400 mb-0.5'>SOL</sub>
                </p>
            </div>
            <div className='w-full flex flex-row gap-1 justify-center items-center'>
                <p className='text-white text-2xl font-medium'>{solPrice}</p>
                <div className='flex flex-row gap-2 items-center justify-center'>
                    <sup className={negative ? 'text-red-700 text-sm flex flex-row gap-1 items-center' : 'text-green-600 text-sm flex flex-row gap-1 items-center'}>
                        {solChange}
                        <small className='text-white'>(1D)</small>
                    </sup>
                </div>
            </div>
        </div>
    );
}


export default Stats;

