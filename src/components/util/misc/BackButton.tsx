import { Link } from 'react-router-dom';

interface BackButtonProps {
    to: string;
}

export function BackButton({ to }: BackButtonProps): JSX.Element {
    return (
        <div className='absolute left-8 top-8'>
            <Link to={to}>
                <img src='https://sticnuru.sirv.com/go-images/left-arrow.svg' alt='go back' className='w-10 h-10' />
            </Link>
        </div>
    );
}
