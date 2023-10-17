import { error } from "@sveltejs/kit";
import {
  updateLocalPlaylistData,
  getSessionSeqData,
} from "../../../modules/sessionStorage";

export const ssr = false; // disable ssr because local storage

export async function load({ params }) {
  // fetch p data from local
  let localPlaylistData = null;
  let localUserSeqData = null;
  try {
    localPlaylistData = await updateLocalPlaylistData(
      params.playlistID
    );
    localUserSeqData = await getSessionSeqData();
  } catch (errorObj) {
    throw error(404, errorObj.message);
  }

  return { localPlaylistData, localUserSeqData };
}
