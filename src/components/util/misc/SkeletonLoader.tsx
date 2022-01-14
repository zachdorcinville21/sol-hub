import Skeleton from '@mui/material/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

type SkeletonVariant = 'circular' | 'text' | 'rectangular';

interface SkeletonProps {
    type?: SkeletonVariant;
    width?: number;
    height?: number;
    color?: string;
    additionalStyles?: { [key: string]: string | number };
}

export const SkeletonLoader = (props: SkeletonProps) => {
    const useSkeletonStyles = makeStyles({
        skeleton: {
            backgroundColor: props.color ?? '#91a3b0',
            color: '#fff',
            ...props.additionalStyles ?? null,
        },
    });

    const classes = useSkeletonStyles();

    return (
        <Skeleton
            variant={props.type ?? 'text'}
            width={props.width ?? undefined}
            height={props.height ?? undefined}
            animation='pulse'
            classes={{ root: classes.skeleton }}
        />
    );
}

