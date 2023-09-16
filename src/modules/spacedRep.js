import { getSoonestSeq } from "./firebase";

async function getNextSeq() {
  const soonestSeq = await getSoonestSeq();
  if (soonestSeq) {
    return soonestSeq.id;
  } else {
    // get random seq in playlist
  }
}
