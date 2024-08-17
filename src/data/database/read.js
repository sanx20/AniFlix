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

        const favorites = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                mal_id: data.mal_id ?? -1,
                title: data.title ?? 'Not Found',
                title_english: data.title_english ?? 'Not Found',
                title_japanese: data.title_japanese ?? 'Not Found',
                synopsis: data.synopsis ?? 'No synopsis available',
                score: data.score ?? -1,
                rank: data.rank ?? -1,
                popularity: data.popularity ?? -1,
                members: data.members ?? -1,
                favorites: data.favorites ?? -1,
                published: data.published?.string ?? 'Not Found',
                chapters: data.chapters ?? -1,
                volumes: data.volumes ?? -1,
                status: data.status ?? 'Not Found',
                publishing: data.publishing ?? false,
                genres: data.genres ?? [],
                authors: data.authors ?? [],
                background: data.background ?? 'Not Found',
                images: data.images ?? {
                    jpg: {
                        image_url: 'https://example.com/default-image.png',
                        small_image_url: 'https://example.com/default-image.png',
                        large_image_url: 'https://example.com/default-image.png',
                    },
                    webp: {
                        image_url: 'https://example.com/default-image.png',
                        small_image_url: 'https://example.com/default-image.png',
                        large_image_url: 'https://example.com/default-image.png',
                    }
                },
                type: data.type ?? 'Not Found',
                titles: data.titles ?? [],
                title_synonyms: data.title_synonyms ?? [],
                explicit_genres: data.explicit_genres ?? [],
                themes: data.themes ?? [],
                demographics: data.demographics ?? [],
                serializations: data.serializations ?? [],
            };
        });

        return favorites;
    } catch (error) {
        console.error('Error loading data: ', error);
        throw new Error('Failed to load data.');
    }
}
