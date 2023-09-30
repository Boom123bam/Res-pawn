import { getAllPlaylists } from "../../../modules/firebase";

export async function load() {
  const playlists = await getAllPlaylists();
  return { playlists };
}
