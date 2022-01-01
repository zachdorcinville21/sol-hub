export interface Message {
    message_id: number;
    author_id: string;
    receiver_id: string;
    message: string;
    created_at: Date;
}

export interface Convo {
    convo_id: string;
    messages: Message[];
    participants: string[];
    updated_at: Date;
}