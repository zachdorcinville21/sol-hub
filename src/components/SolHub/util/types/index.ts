type PhantomEvent = 'connect' | 'disconnect';

export interface Phantom {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    on: (e: PhantomEvent, callback: () => void) => void;
}

