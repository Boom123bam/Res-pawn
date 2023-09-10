// /** @type {import('./$types').PageServerLoad} */
// export function load({ params }) {
//   return {
//     post: {
//       title: `Title for ${params.playlistId} goes here`,
//       content: `Content for ${params.playlistId} goes here`,
//     },
//   };
// }

import { error } from "@sveltejs/kit";
import { getPlaylistData } from "../../../modules/firebase";

/** @type {import('./$types').PageServerLoad} */

export async function load({ params }) {
  //   console.log(params);
  const post = await getPlaylistData(params.playlistId);

  if (post) {
    return post;
  }

  throw error(404, "Not found");
}
