import { getAllPlaylists } from "../../../modules/firestore";

export async function load() {
  const playlists = await getAllPlaylists();
  return { playlists };
}
