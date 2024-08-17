import { AppConstant } from '../../constants/AppConstant';

export class AnimeRepo {
    static async fetchAnimeData(page) {
        try {
            const response = await fetch(AppConstant.getAnimeList + '?page=' + page);
            if (!response.ok) {
                throw new Error('Error fetching anime data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error fetching anime data: ' + error.message);
        }
    }

    static async fetchAnimeChracaters(animeId) {
        try {
            const response = await fetch(AppConstant.getAnimeCharacters + animeId + '/characters');
            if (!response.ok) {
                throw new Error('Error fetching anime characters');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error fetching anime characters: ' + error.message);
        }
    }

    static async fetchAnimeById(animeId) {
        try {
            const response = await fetch(AppConstant.getAnimeById + '/' + animeId + '/full');
            if (!response.ok) {
                throw new Error('Error fetching anime data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error fetching anime data: ' + error.message);
        }
    }
}