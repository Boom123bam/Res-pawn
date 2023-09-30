import { getPlaylistData } from "./firebase";
import { getAllUserSeqs } from "./firebase";

export async function updateLocalUserSeqData() {
  // if there is a user in local storage, fetch local seq data
  let user = await getLocalUserData();

  let localUserSeqData = await getLocalUserSeqData();
  // if there is no seq data, fetch from database and store on local
  if (user && !localUserSeqData) {
    localUserSeqData = await getAllUserSeqs(user.uid);
  }
  if (!localUserSeqData) localUserSeqData = null;
  storeUserSeqData(localUserSeqData);
  return localUserSeqData;
}

export async function updateLocalPlaylistData(playlistID) {
  let localPlaylistData = await getLocalPlaylistData();
  // check if local playlistData is empty or not same as route id
  if (!localPlaylistData || localPlaylistData.id != playlistID) {
    // if so, fetch from db and store on local
    localPlaylistData = await getPlaylistData(playlistID);
    if (localPlaylistData) await storePlaylistData(localPlaylistData);
    else {
      console.error("playlist not in session storage");
      throw Error("Playlist Not found");
    }
  }
  return localPlaylistData;
}

export async function storeUserData(userData) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("user", JSON.stringify(userData));
  }
}

export async function getLocalUserData() {
  if (typeof window !== "undefined") {
    return JSON.parse(sessionStorage.getItem("user"));
  }
  return null;
}

export async function storePlaylistData(playlistData) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("playlist", JSON.stringify(playlistData));
  }
}
export async function getLocalPlaylistData() {
  if (typeof window !== "undefined") {
    return JSON.parse(sessionStorage.getItem("playlist"));
  }
}

export async function storeUserSeqData(seqData) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("sequences", JSON.stringify(seqData));
  }
}
export async function getLocalUserSeqData() {
  if (typeof window !== "undefined") {
    return JSON.parse(sessionStorage.getItem("sequences"));
  }
}
