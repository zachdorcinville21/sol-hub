export {};

declare global {
    /**
     * Blueprint for the TransactionClient object.
     */
    interface TC {
        async send(receiverWalletAddress: string, amount: number): Promise<string | null>;
    }

    interface Message {
        message_id: number;
        author_id: string;
        receiver_id: string;
        message: string;
        created_at: Date;
    }
    
    interface Convo {
        convo_id: string;
        messages: Message[];
        participants: string[];
        updated_at: Date;
    }

    interface User {
        wallet_addr: string;
        username: string | null;
    }
}
