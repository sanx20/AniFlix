import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MangaRepo } from '../../data/repositories/MangaRepo';

export const fetchManga = createAsyncThunk(
    'manga/fetchManga',
    async (page = 1, thunkAPI) => {
        try {
            const mangaData = await MangaRepo.fetchMangaData(page);
            if (!mangaData) {
                return thunkAPI.rejectWithValue('Failed to fetch manga data');
            }
            return mangaData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const mangaSlice = createSlice({
    name: 'manga',
    initialState: {
        mangaList: [],
        status: 'idle',
        isFetchingMore: false,
        error: null,
        hasNextPage: true,
        currentPage: 1,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchManga.pending, (state, action) => {
                if (state.currentPage === 1) {
                    state.status = 'loading';
                } else {
                    state.isFetchingMore = true;
                }
            })
            .addCase(fetchManga.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isFetchingMore = false;

                if (action.payload && action.payload.data && Array.isArray(action.payload.data)) {
                    state.mangaList = [...state.mangaList, ...action.payload.data];

                    if (action.payload.pagination) {
                        state.hasNextPage = action.payload.pagination.has_next_page || false;
                        state.currentPage = action.payload.pagination.current_page || 1;
                    }
                } else {
                    state.status = 'failed';
                    state.error = 'Invalid data structure';
                }
            })
            .addCase(fetchManga.rejected, (state, action) => {
                state.status = 'failed';
                state.isFetchingMore = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default mangaSlice.reducer;
