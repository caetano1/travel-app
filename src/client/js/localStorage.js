// Functions needed to store user's input after closing browser
// and to erase current data

import { updateUI } from './updateUi'

const eraseLocalStorage = () => {
    localStorage.clear();
    location.reload();
};

const checkStoredInfo = () => {
    if (localStorage.sessionData) {
        const storedData = JSON.parse(localStorage.getItem('sessionData'));
        updateUI(storedData);
    }
};

export { eraseLocalStorage, checkStoredInfo }