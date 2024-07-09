import * as SecureStore from 'expo-secure-store';

const TOKEN = 'spotify_access_token';
const EMAIL = 'email';

/* Reads the stored value associated with the provided key.
 * This function returns a promise that resolves to the 
 * previously stored value. It resolves with null if 
 * there is no entry for the given key 
 * or if the key has been invalidated. */
export const getToken = async (): Promise<string | null> => {
    try {
        return await SecureStore.getItemAsync(TOKEN);
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
}

/* Stores a key–value pair. This function
 * returns a promise that rejects if value 
 * cannot be stored on the device. */
export const storeToken = async (new_token: string) => {
    try {
        return await SecureStore.setItemAsync(TOKEN, new_token);
    } catch (error) {
        console.error('Error storing token:', error);
    }
}

/* Deletes the value associated with the provided key.
 * Returns a promise that rejects if the value can't be deleted. */
export const deleteToken = async () => {
    try {
        return await SecureStore.deleteItemAsync(TOKEN);
    } catch (error) {
        console.error('Error deleting token:', error);
    }
}

