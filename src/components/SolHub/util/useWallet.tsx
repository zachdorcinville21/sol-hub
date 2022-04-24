import { useContext } from 'react';
import { WalletContext } from '../../../context/wallet';

/**
 * Returns stateful information about a Phantom wallet along with functions to connect and disconnect.
 */
export function useWallet(): WalletControls {
    const walletInfo = useContext(WalletContext);

    return walletInfo;
}


