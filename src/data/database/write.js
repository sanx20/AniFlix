import { collection, addDoc, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';

export async function saveDataToFirebase(item) {
    try {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
            const userSavedRef = collection(FIREBASE_DB, 'users', user.uid, 'favorites');
            await addDoc(userSavedRef, {
                mal_id: item.mal_id || null,
                title: item.title || 'N/A',
                title_english: item.title_english || 'N/A',
                synopsis: item.synopsis || 'No synopsis available',
                score: item.score || null,
                rank: item.rank || null,
                popularity: item.popularity || null,
                members: item.members || null,
                favorites: item.favorites || null,
                published: item.published?.string || 'N/A',
                genres: item.genres?.map((genre) => genre.name) || [],
                authors: item.authors?.map((author) => author.name) || [],
                background: item.background || null,
                images: {
                    webp: {
                        image_url: item.images?.webp?.image_url || 'https://example.com/default-image.png',
                        large_image_url: item.images?.webp?.large_image_url || 'https://example.com/default-image.png',
                    }
                },
                type: item.type || 'Unknown'
            });
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
