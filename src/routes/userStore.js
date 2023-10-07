import { writable } from "svelte/store";
import { storeUserData } from "../modules/sessionStorage";

// export const userData = writable(null);

function createUserData() {
  const { set, subscribe } = writable(null);

  return {
    set: (data) => {
      set(data);
      storeUserData(data);
    },
    subscribe,
  };
}

export const userData = createUserData();
