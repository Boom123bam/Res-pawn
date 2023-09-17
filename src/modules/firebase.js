import {
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
  collection,
  doc,
  orderBy,
  limit,
  FieldPath,
} from "firebase/firestore";
import { db } from "../firebase";

export async function getAllUserSeqs(userID) {
  // returns all the seqs in user/seqs
  console.log(`Users/${userID}/Sequences`);
  const seqsCollectionRef = collection(
    db,
    `Users/${userID}/Sequences`
  );

  // query all user seqs
  const q = query(
    seqsCollectionRef,
    orderBy("nextReview") // first = soonest
  );

  const querySnapshot = await getDocs(q);
  const seqs = {}; // store seqs as an obj, key = seqID, value = seq data
  querySnapshot.docs.forEach((doc) => (seqs[doc.id] = doc.data())); // id: {data}
  if (!querySnapshot.empty) {
    return seqs;
  } else {
    // no docs
    return null;
  }
}

export async function getUserData(id) {
  try {
    const userDocRef = doc(db, "Users", id);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      // The document exists, get data
      const userData = userDocSnap.data();
      return userData;
    } else {
      // The document does not exist
      return null;
    }
  } catch (error) {
    console.error("Error getting user document:", error);
    return null;
  }
}

export async function getPlaylistData(id) {
  try {
    const docRef = doc(db, `Playlists/${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Get the document data
      const data = docSnap.data();
      // Add the document ID to the data
      data.id = docSnap.id;
      return data;
    } else {
      // Document does not exist
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function checkIfUsernameTaken(username) {
  const usersCollection = collection(db, "Users");
  const usernameQuery = query(
    usersCollection,
    where("username", "==", username)
  );
  const usernameQuerySnapshot = await getDocs(usernameQuery);

  if (!usernameQuerySnapshot.empty) {
    // Username is already taken
    return true;
  }
  return false;
}

export async function addUserToCollection(userID, username) {
  try {
    const docData = {
      username,
    };

    // Create a new user document with the provided data
    await setDoc(doc(db, "Users", userID), docData);

    console.log("User document added");
  } catch (error) {
    console.error("Error adding user document: ", error);
  }
}

export async function getSeqData(id) {
  try {
    const docRef = doc(db, `Sequences/${id}`);
    const docSnap = await getDoc(docRef);

    return docSnap.data();
  } catch (error) {
    console.log(error);
  }
}

/* 
export async function getSoonestSeq(userID, playlistID, mins) {
  // gets Users/userID/Playlists/pID/Sequences for a list of seqs the user played in the playlist
  // gets the soonest one in userID/Sequences
  try {
    const playlistDocRef = doc(
      db,
      `Users/${userID}/Playlists`,
      playlistID
    );

    const docSnapshot = await getDoc(playlistDocRef);
    const playlistData = docSnapshot.data();
    const seqIDs = playlistData.Sequences;
    console.log(playlistData);

    const currentTime = new Date();
    const futureTime = new Date(currentTime.getTime() + mins * 60000); // minutes in milliseconds

    const collectionRef = collection(db, `Users/${userID}/Sequences`);

    const q = query(
      collectionRef,
      where(FieldPath.documentId(), "in", seqIDs), // id matches
      where("nextReview", "<=", Timestamp.fromDate(futureTime)), // Check if 'nextReview' is less than or equal to the future time
      orderBy("nextReview"), // Order by 'nextReview' in ascending order
      limit(1) // Limit the result to the first document
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // There is at least one document matching the criteria
      const lowestNextReviewDoc = querySnapshot.docs[0];
      return lowestNextReviewDoc;
    } else {
      // no docs match criteria
      return null;
    }
  } catch (error) {
    console.error("Error getting documents:", error);
  }
}

export async function getRandomSeq(userID, playlistID) {
  // gets a random seq that is in the current playlsit and that the user has not played in the current playlist before

  const collectionRef = collection(db, `Users/${userID}/Sequences`);

  // const q = query(
  //   collectionRef,
  //   where("playlists", "array-contains", playlistID),
  //   where("nextReview", "<=", Timestamp.fromDate(futureTime)), // Check if 'nextReview' is less than or equal to the future time
  //   orderBy("nextReview"), // Order by 'nextReview' in ascending order
  //   limit(1) // Limit the result to the first document
  // );
  // try {
  //   const querySnapshot = await getDocs(q);

  //   if (!querySnapshot.empty) {
  //     // There is at least one document matching the criteria
  //     const lowestNextReviewDoc = querySnapshot.docs[0];
  //     console.log(
  //       "Document with the lowest 'nextReview' field:",
  //       lowestNextReviewDoc.data()
  //     );
  //     return lowestNextReviewDoc;
  //   } else {
  //     console.log("No documents match the criteria.");
  //     return null;
  //   }
  // } catch (error) {
  //   console.error("Error getting documents:", error);
  // }
}
 */
