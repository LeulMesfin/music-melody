import { useState, useEffect } from 'react';
import { getToken, storeToken, deleteToken } from './tokenLayout';

export const tokenHook = () => {
    const [token, setToken] = useState<string | null>(null);

    // as soon as page renders, get the token
    useEffect(() => {
        getToken();
      }, []);

    /* updates the token to a new value */
    const updateToken = async(newTok: string) => {
        await storeToken(newTok);
        setToken(newTok);
    }

    /* deletes token from secure storage*/
    const clearToken = async() => {
        await deleteToken();
        setToken(null);
    }

    /* gets token from secure storage */
    const generateToken = async() => {
        const stored_token = await getToken();
        setToken(stored_token);
    }


    return { token, updateToken, clearToken, generateToken };
}

export { storeToken };
