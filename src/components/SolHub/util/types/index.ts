type PhantomEvent = 'connect' | 'disconnect';

export interface Phantom {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    on: (e: PhantomEvent, callback: () => void) => void;
    publicKey: any;
    request: (params: { [key: string]: any }) => Promise<any>;
}

export interface NotifUpdateConfig {
    type: 'set' | 'subtract';
}

