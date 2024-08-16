import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AnimeRepo } from '../../data/repositories/AnimeRepo';

export const fetchAnime = createAsyncThunk(
    'anime/fetchAnime',
    async (page = 1, thunkAPI) => {
        try {
            const animeData = await AnimeRepo.fetchAnimeData(page);
            if (!animeData) {
                return thunkAPI.rejectWithValue('Failed to fetch anime data');
            }
            return animeData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const animeSlice = createSlice({
    name: 'anime',
    initialState: {
        animeList: [],
        status: 'idle',
        isFetchingMore: false,
        error: null,
        hasNextPage: true,
        currentPage: 1,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnime.pending, (state, action) => {
                if (state.currentPage === 1) {
                    state.status = 'loading';
                } else {
                    state.isFetchingMore = true;
                }
            })
            .addCase(fetchAnime.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isFetchingMore = false;

                if (action.payload && action.payload.data && Array.isArray(action.payload.data)) {
                    state.animeList = [...state.animeList, ...action.payload.data];

                    if (action.payload.pagination) {
                        state.hasNextPage = action.payload.pagination.has_next_page || false;
                        state.currentPage = action.payload.pagination.current_page || 1;
                    }
                } else {
                    state.status = 'failed';
                    state.error = 'Invalid data structure';
                }
            })
            .addCase(fetchAnime.rejected, (state, action) => {
                state.status = 'failed';
                state.isFetchingMore = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default animeSlice.reducer;
