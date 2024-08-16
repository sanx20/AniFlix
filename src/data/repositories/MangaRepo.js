import { AppConstant } from '../../constants/AppConstant';
import { MangaModel } from '../models/manga/MangaModel';

export class MangaRepo {
    static async fetchMangaData(filter) {
        try {
            const response = await fetch(AppConstant.getMangaList + '?filter=' + filter);
            console.log(AppConstant.getMangaList + '?filter=' + filter);
            if (!response.ok) {
                throw new Error('Error fetching manga data');
            }
            const data = await response.json();
            return data.data.map((item) => MangaModel.fromJson(item));
        } catch (error) {
            throw new Error('Error fetching manga data: ' + error.message);
        }
    }
}
