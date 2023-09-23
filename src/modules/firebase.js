import {
  getDoc,
  setDoc,
  addDoc,
  query,
  where,
  getDocs,
  collection,
  doc,
  orderBy,
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
    return {};
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
    if (docSnap.data()) return docSnap.data();
    else throw Error(`no seq with id:${id}`);
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserSeqData(userID, seqID, newSeqData) {
  await setDoc(
    doc(db, `Users/${userID}/Sequences`, seqID),
    newSeqData
  );
}

export async function getAllPlaylists() {
  const playlistsCollectionRef = collection(db, `Playlists`);
  const q = query(playlistsCollectionRef);

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const playlists = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return playlists;
  } else {
    // no docs
    return [];
  }
}

export async function createPlaylist(name, seqs) {
  // Create a new user document with the provided data
  const docRef = await addDoc(collection(db, "Playlists"), {
    name,
    sequences: seqs,
  });
}
