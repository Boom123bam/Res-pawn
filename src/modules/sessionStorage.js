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
  storeSessionSeqData(sessionSeqData);
  return sessionSeqData;
}

export async function updateLocalPlaylistData(playlistID) {
  let localPlaylistData = getSessionPlaylistData();
  // check if local playlistData is empty or not same as route id
  if (!localPlaylistData || localPlaylistData.id != playlistID) {
    // fetch from db and store on session
    localPlaylistData = await getPlaylistData(playlistID);
    if (localPlaylistData)
      storeSessionPlaylistData(localPlaylistData);
    else {
      console.error("playlist not in session storage");
      throw Error("Playlist Not found");
    }
  }
  return localPlaylistData;
}

export function storeSessionUserData(userData) {
  setSessionData("user", userData);
}

export function getSessionUserData() {
  return getSessionData("user");
}

export function storeSessionPlaylistData(playlistData) {
  setSessionData("playlist", playlistData);
}

export function getSessionPlaylistData() {
  return getSessionData("playlist");
}

export function storeSessionSeqData(seqData) {
  setSessionData("sequences", seqData);
}

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
