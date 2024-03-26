import { writable } from 'svelte/store';
import { storeSessionUserData } from '../modules/sessionStorage';

// export const userData = writable(null);

function createUserData() {
    const { set, subscribe } = writable(null);

    return {
        set: (data) => {
            set(data);
            storeSessionUserData(data);
        },
        subscribe,
    };
}

export const userData = createUserData();
