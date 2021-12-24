import { useState, useEffect } from 'react';
import { getUsername } from "../user-crud/getUsername";
import { updateUsername } from "../user-crud/updateUsername";

interface ProfileData {
    username: string | null;
    onSave: (username: string) => Promise<void>;
}


export const useProfileData = (publicKey: string | null, walletConnected: boolean): ProfileData => {
    const [username, setUsername] = useState<string | null>(null);

    const onSave = async (username: string) => {
        try {
            const newUsername = await updateUsername(publicKey, username);
            setUsername(newUsername);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const usernameFromDb = await getUsername(publicKey);
                setUsername(usernameFromDb);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [walletConnected, publicKey]);

    return {
        username,
        onSave,
    }
}

