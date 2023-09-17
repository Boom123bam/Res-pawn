import { getPlaylistData } from "./firebase";
import { getAllUserSeqs } from "./firebase";

export async function updateLocalUserSeqData() {
  // if there is a user in local storage, fetch local seq data
  let user = await getLocalUserData();
  let localUserSeqData = null;

  if (user) {
    localUserSeqData = await getLocalUserSeqData();
    // if there is no seq data, fetch from database and store on local
    if (!localUserSeqData) {
      localUserSeqData = await getAllUserSeqs(user.id);
      storeUserSeqData(localUserSeqData);
    }
  } else storeUserSeqData(null);
  return localUserSeqData;
}

export async function updateLocalPlaylistData(playlistID) {
  let localPlaylistData = await getLocalPlaylistData();
  // check if local playlistData is empty or not same as route id
  if (!localPlaylistData || localPlaylistData.id != playlistID) {
    // if so, fetch from db and store on local
    localPlaylistData = await getPlaylistData(playlistID);
    if (localPlaylistData) await storePlaylistData(localPlaylistData);
    else throw Error("Playlist Not found");
  }
  return localPlaylistData;
}

export async function storeUserData(userData) {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(userData));
  }
}

export async function getLocalUserData() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("user"));
  }
  return null;
}

export async function storePlaylistData(playlistData) {
  if (typeof window !== "undefined") {
    localStorage.setItem("playlist", JSON.stringify(playlistData));
  }
}
export async function getLocalPlaylistData() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("playlist"));
  }
}

export async function storeUserSeqData(seqData) {
  if (typeof window !== "undefined") {
    localStorage.setItem("sequences", JSON.stringify(seqData));
  }
}
export async function getLocalUserSeqData() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("sequences"));
  }
}
