import { useState, useEffect } from 'react';
import { uc } from '../user-crud/index';

interface ProfileData {
    username: string | null;
    email: string | null;
    onSave: (username: string, email: string) => Promise<boolean>;
}


export const useProfileData = (publicKey: string | null, walletConnected: boolean): ProfileData => {
    const [username, setUsername] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    const onSave = async (username: string, email: string): Promise<boolean> => {
        let success: boolean = false;

        try {
            if (username !== '') {
                const newUsername = await uc.updateUsername(publicKey, username);
                setUsername(newUsername);
            }

            if (email !== '') {
                const newEmail = await uc.updateEmail(publicKey, email);
                setEmail(newEmail);
            }

            success = true;
        } catch (e) {
            success = false;
            console.error(e);
        }

        return success;
    }

    useEffect(() => {
        (async () => {
            try {
                const usernameFromDb = await uc.getUsername(publicKey);
                setUsername(usernameFromDb);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [walletConnected, publicKey]);

    return {
        username,
        email,
        onSave,
    }
}

