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
    limit,
} from "firebase/firestore";
import { db } from "../firebase";

export async function getAllUserSeqs(userID) {
    // returns all the seqs in user/seqs
    const seqsCollectionRef = collection(db, `Users/${userID}/Sequences`);

    // query all user seqs
    const q = query(
        seqsCollectionRef,
        orderBy("nextReview") // first = soonest
    );

    const querySnapshot = await getDocs(q);
    const seqs = {}; // store seqs as an obj, key = seqID, value = seq data
    querySnapshot.docs.forEach((doc) => (seqs[doc.id] = doc.data())); // id: {data}
    return querySnapshot.empty ? {} : seqs;
}

export async function getUserData(id) {
    try {
        const userDocRef = doc(db, "Users", id);
        const userDocSnap = await getDoc(userDocRef);
        return userDocSnap.exists() ? userDocSnap.data() : null;
    } catch (error) {
        console.error("Error getting user data document:", error);
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
            console.error(`playlist doc with ID ${id} not found`);
            return null;
        }
    } catch (error) {
        console.error(`error getting playlist doc with ID ${id}`, error);
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
    } catch (error) {
        console.error(`Error adding user document with ID:${userID}`, error);
    }
}

export async function getSeqData(id) {
    try {
        const docRef = doc(db, `Sequences/${id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.data()) return docSnap.data();
        else throw Error(`no seq with id:${id}`);
    } catch (error) {
        console.error(`error getting seq data with id ${id}`);
    }
}

export async function updateUserSeqData(userID, seqID, newSeqData) {
    await setDoc(doc(db, `Users/${userID}/Sequences`, seqID), newSeqData);
}

export async function getAllPlaylists(amount = 10) {
    const playlistsCollectionRef = collection(db, `Playlists`);
    const q = query(
        playlistsCollectionRef,
        orderBy("rating", "asc"), // Sort by the first element of the "rating" list in ascending order
        limit(amount)
    );
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

export async function createPlaylist(name, color, rating, seqs) {
    // Create a new user document with the provided data
    const docRef = await addDoc(collection(db, "Playlists"), {
        name,
        sequences: seqs,
        color,
        rating,
    });
    console.log(`added playlist ${name} with ${seqs.length} seqs`);
}

/**
 * @param {seqId:seqData} data
 * uploads all seqs in the data to Users/${uid}/Sequences
 **/
export async function storeAllUserSeqData(uid, data) {
    for (const seqID in data) {
        if (data.hasOwnProperty(seqID)) {
            await setDoc(doc(db, `Users/${uid}/Sequences`, seqID), data[seqID]);
        }
    }
}
