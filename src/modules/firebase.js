import {
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
  collection,
  doc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

async function getPlaylistData(id) {
  try {
    const docRef = doc(db, `Playlists/${id}`);
    const docSnap = await getDoc(docRef);

    return docSnap.data();
  } catch (error) {
    console.log(error);
  }
}

async function checkIfUsernameTaken(username) {
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

async function addUserToCollection(userID, username) {
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

export { getPlaylistData, checkIfUsernameTaken, addUserToCollection };
