import { AppConstant } from '../../constants/AppConstant';

export class ReviewsRepo {
    static async fetchReviewsData(page) {
        try {
            const response = await fetch(AppConstant.getReviewsList + '?page=' + page);
            if (!response.ok) {
                throw new Error('Error fetching reviews data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error fetching reviews data: ' + error.message);
        }
    }
}