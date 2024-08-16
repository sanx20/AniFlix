import { AppConstant } from '../../constants/AppConstant';

export class MangaRepo {
    static async fetchMangaData(page) {
        try {
            const response = await fetch(AppConstant.getMangaList + '?page=' + page);
            if (!response.ok) {
                throw new Error('Error fetching manga data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error fetching manga data: ' + error.message);
        }
    }

    static async fetchMangaChracaters(mangaId) {
        try {
            const response = await fetch(AppConstant.getMangaCharacters + mangaId + '/characters');
            if (!response.ok) {
                throw new Error('Error fetching manga characters');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error fetching manga characters: ' + error.message);
        }
    }
}