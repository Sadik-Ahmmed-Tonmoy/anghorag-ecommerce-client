import CryptoJS from 'crypto-js';

const getFromLocalStorage = () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
        try {
            // const bytes = CryptoJS.AES.decrypt(authToken, 'secret_passphrase');
            // const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

            return authToken;
        } catch (error) {
            console.error('Error while decrypting:', error);
            return null;
        }
    }
    return null;
};

export { getFromLocalStorage };
