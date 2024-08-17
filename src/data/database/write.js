import { collection, addDoc, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';

export async function saveDataToFirebase(item) {
    try {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
            const userSavedRef = collection(FIREBASE_DB, 'users', user.uid, 'favorites');
            await addDoc(userSavedRef, item); // Save the entire item object
        } else {
            alert('Error', 'You need to be logged in to save data.');
        }
    } catch (error) {
        console.error('Error saving data: ', error);
        alert('Error', 'Failed to save data.');
    }
};

export async function removeDataFromFirebase(itemId) {
    try {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
            const userSavedRef = collection(FIREBASE_DB, 'users', user.uid, 'favorites');

            const q = query(userSavedRef, where("mal_id", "==", itemId));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(async (docSnapshot) => {
                await deleteDoc(doc(FIREBASE_DB, 'users', user.uid, 'favorites', docSnapshot.id));
            });
        } else {
            alert('Error', 'You need to be logged in to remove data.');
        }
    } catch (error) {
        console.error('Error removing data: ', error);
        alert('Error', 'Failed to remove data.');
    }
};
