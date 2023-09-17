import { error } from "@sveltejs/kit";
import {
  updateLocalPlaylistData,
  updateLocalUserSeqData,
} from "../../../modules/localStorage";

export const ssr = false; // disable ssr because local storage

export async function load({ params }) {
  // fetch p data from local
  let localPlaylistData = null;
  let localUserSeqData = null;
  try {
    localPlaylistData = await updateLocalPlaylistData(
      params.playlistID
    );
    localUserSeqData = await updateLocalUserSeqData();
  } catch (errorObj) {
    throw error(404, errorObj.message);
  }
  // get local (user playlist data)
  // if does not match

  return { localPlaylistData, localUserSeqData };
}
