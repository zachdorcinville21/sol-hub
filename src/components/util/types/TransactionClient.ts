import * as solanaWeb3 from '@solana/web3.js';
import { Phantom } from '../../SolHub/util/types';

/**
 * An object for creating, signing, and executing transactions on the Solana blockchain.
 */
export default class TransactionClient implements TC {
    public walletAddress: string | null;
    private phantom: Phantom | any;
    private connection: solanaWeb3.Connection;

    constructor(walletAddress: string | null, phantom: Phantom | null) {
        this.walletAddress = walletAddress;
        this.phantom = phantom;
        this.connection = new solanaWeb3.Connection(
            solanaWeb3.clusterApiUrl('mainnet-beta'),
            'confirmed'
        );
    }

    public async send(receiverWalletAddress: string, amount: number): Promise<string | null> {
        console.log('executing transaction...');

        const sender = new solanaWeb3.PublicKey(this.walletAddress as solanaWeb3.PublicKeyInitData);
        const receiver = new solanaWeb3.PublicKey(receiverWalletAddress as solanaWeb3.PublicKeyInitData);

        const transaction = new solanaWeb3.Transaction().add(
            solanaWeb3.SystemProgram.transfer({
                fromPubkey: sender,
                toPubkey: receiver,
                lamports: amount * solanaWeb3.LAMPORTS_PER_SOL,
            }),
        );

        transaction.feePayer = await this.phantom?.publicKey;
        let blockhashObj = await this.connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhashObj.blockhash;

        if (transaction) {
            console.log("Transaction created successfully.");
        }

        const signed = await this.phantom?.signTransaction(transaction);

        let signature: string | null = null;

        try {
            signature = await this.connection.sendRawTransaction(signed.serialize());
            await this.connection.confirmTransaction(signature);
        } catch (e) {
            console.error(e);
        }

        return signature;
    }
}
