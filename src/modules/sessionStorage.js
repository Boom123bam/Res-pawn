import { getPlaylistData, getAllUserSeqs } from './firestore';

export async function updateLocalSeqData(uid) {
    const localSeqData = await getAllUserSeqs(uid);
    storeLocalSeqData(localSeqData);
    return localSeqData;
}

export async function getLocalSeqData() {
    // fetches local seq data from db if there is a user in local storage
    let user = getLocalUserData();
    let localSeqData = user
        ? await getAllUserSeqs(user.uid)
        : getLocalData('sequences');
    if (!localSeqData) localSeqData = null;
    storeLocalSeqData(localSeqData);
    return localSeqData;
}

export async function updateLocalPlaylistData(playlistID) {
    let localPlaylistData = getLocalPlaylistData();
    // check if local playlistData is empty or not same as route id
    if (!localPlaylistData || localPlaylistData.id != playlistID) {
        // fetch from db and store on local
        localPlaylistData = await getPlaylistData(playlistID);
        if (localPlaylistData) storeLocalPlaylistData(localPlaylistData);
        else {
            console.error('playlist not in local storage');
            throw Error('Playlist Not found');
        }
    }
    return localPlaylistData;
}

export function storeLocalUserData(userData) {
    setLocalData('user', userData);
}

export function getLocalUserData() {
    return getLocalData('user');
}

export function storeLocalPlaylistData(playlistData) {
    setLocalData('playlist', playlistData);
}

export function getLocalPlaylistData() {
    return getLocalData('playlist');
}

export function storeLocalSeqData(seqData) {
    setLocalData('sequences', seqData);
}

function getLocalData(name) {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem(name));
    }
    return null;
}

function setLocalData(name, data) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(name, JSON.stringify(data));
    }
}
