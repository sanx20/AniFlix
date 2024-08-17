import { collection, getDocs } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';

export async function load() {
    try {
        const user = FIREBASE_AUTH.currentUser;

        if (!user) {
            throw new Error('User not authenticated');
        }

        const userId = user.uid;

        const favoritesRef = collection(FIREBASE_DB, 'users', userId, 'favorites');
        const querySnapshot = await getDocs(favoritesRef);

        const favorites = [];

        querySnapshot.forEach((doc) => {
            favorites.push({
                ...doc.data(),
                id: doc.id,
            });
        });

        return favorites;
    } catch (error) {
        console.error('Error loading data: ', error);
        throw new Error('Failed to load data.');
    }
}
