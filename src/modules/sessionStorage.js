import { getPlaylistData } from "./firebase";
import { getAllUserSeqs } from "./firebase";

export async function getSessionSeqData() {
  // fetches session seq data from db if there is a user in session storage
  let user = getSessionUserData();
  let sessionSeqData = getSessionData("sequences");
  // if there is no seq data, fetch from database and store on session storage
  if (user && !sessionSeqData) {
    sessionSeqData = await getAllUserSeqs(user.uid);
  }
  if (!sessionSeqData) sessionSeqData = null;
  storeUserSeqData(sessionSeqData);
  return sessionSeqData;
}

export async function updateLocalPlaylistData(playlistID) {
  let localPlaylistData = getLocalPlaylistData();
  // check if local playlistData is empty or not same as route id
  if (!localPlaylistData || localPlaylistData.id != playlistID) {
    // if so, fetch from db and store on local
    localPlaylistData = await getPlaylistData(playlistID);
    if (localPlaylistData) storePlaylistData(localPlaylistData);
    else {
      console.error("playlist not in session storage");
      throw Error("Playlist Not found");
    }
  }
  return localPlaylistData;
}

export function storeUserData(userData) {
  setSessionData("user", userData);
}

export function getSessionUserData() {
  return getSessionData("user");
}

export function storePlaylistData(playlistData) {
  setSessionData("playlist", playlistData);
}

export function getLocalPlaylistData() {
  return getSessionData("playlist");
}

export function storeUserSeqData(seqData) {
  setSessionData("sequences", seqData);
}
// export function getSessionSeqData() {
//   return getSessionData("sequences");
// }

function getSessionData(name) {
  if (typeof window !== "undefined") {
    return JSON.parse(sessionStorage.getItem(name));
  }
  return null;
}

function setSessionData(name, data) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(name, JSON.stringify(data));
  }
}
