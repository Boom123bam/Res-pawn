import { writable } from 'svelte/store';
import { storeLocalUserData } from '../modules/localStorage';

// export const userData = writable(null);

function createUserData() {
    const { set, subscribe } = writable(null);

    return {
        set: (data) => {
            set(data);
            storeLocalUserData(data);
        },
        subscribe,
    };
}

export const userData = createUserData();
