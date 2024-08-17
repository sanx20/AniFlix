import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ReviewsRepo } from '../../data/repositories/ReviewsRepo';

export const fetchAnimeReviews = createAsyncThunk(
    'reviews/fetchAnimeReviews',
    async ({ page = 1 }, thunkAPI) => {
        try {
            const reviewsData = await ReviewsRepo.fetchReviewsData(page);
            if (!reviewsData) {
                return thunkAPI.rejectWithValue('Failed to fetch reviews data');
            }
            return { data: reviewsData.data, pagination: reviewsData.pagination, currentPage: page };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviewsData: [],
        pagination: {
            last_visible_page: 1,
            has_next_page: false,
            currentPage: 1,
        },
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAnimeReviews.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAnimeReviews.fulfilled, (state, action) => {
            state.loading = false;
            state.reviewsData = [...state.reviewsData, ...action.payload.data];
            state.pagination = {
                ...action.payload.pagination,
                currentPage: action.payload.currentPage,
            };
        });
        builder.addCase(fetchAnimeReviews.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error.message;
        });
    },
});

export default reviewsSlice.reducer;
