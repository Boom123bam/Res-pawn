import { writable } from "svelte/store";

export const sequenceData = writable(null);

function createControlLog() {
  const { subscribe, set, update } = writable({
    lastControl: null,
    index: 0,
  });

  return {
    subscribe,
    setLastControl: (lastControl) =>
      update((log) => ({ lastControl, index: log.index + 1 })),
    reset: () => set({ lastControl: null, index: 0 }),
  };
}

export const controlLog = createControlLog();

// export const currentFen = writable(null);

export const board = writable(null);
