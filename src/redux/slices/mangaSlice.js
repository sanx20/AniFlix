import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MangaRepo } from '../../data/repositories/MangaRepo';

export const fetchAiringManga = createAsyncThunk(
    'manga/fetchAiringManga',
    async (_, thunkAPI) => {
        try {
            const airingMangaData = await MangaRepo.fetchMangaData('airing');
            return airingMangaData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchUpcomingManga = createAsyncThunk(
    'manga/fetchUpcomingManga',
    async (_, thunkAPI) => {
        try {
            const upcomingMangaData = await MangaRepo.fetchMangaData('upcoming');
            return upcomingMangaData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchByPopularityManga = createAsyncThunk(
    'manga/fetchByPopularityManga',
    async (_, thunkAPI) => {
        try {
            const byPopularityMangaData = await MangaRepo.fetchMangaData('bypopularity');
            return byPopularityMangaData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchFavoriteManga = createAsyncThunk(
    'manga/fetchFavoriteManga',
    async (_, thunkAPI) => {
        try {
            const favoriteMangaData = MangaRepo.fetchMangaData('favorite');
            return favoriteMangaData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


const mangaSlice = createSlice({
    name: 'mangaList',
    initialState: {
        airingManga: [],
        upcomingManga: [],
        byPopularityManga: [],
        favoriteManga: [],
        status: {
            airing: 'idle',
            upcoming: 'idle',
            byPopularity: 'idle',
            favorite: 'idle',
        },
        error: {
            airing: null,
            upcoming: null,
            byPopularity: null,
            favorite: null,
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAiringManga.pending, (state) => {
                state.status.airing = 'loading';
            })
            .addCase(fetchAiringManga.fulfilled, (state, action) => {
                state.status.airing = 'succeeded';
                state.airingManga = action.payload;
            })
            .addCase(fetchAiringManga.rejected, (state, action) => {
                state.status.airing = 'failed';
                state.error.airing = action.payload;
            });

        builder
            .addCase(fetchUpcomingManga.pending, (state) => {
                state.status.upcoming = 'loading';
            })
            .addCase(fetchUpcomingManga.fulfilled, (state, action) => {
                state.status.upcoming = 'succeeded';
                state.upcomingManga = action.payload;
            })
            .addCase(fetchUpcomingManga.rejected, (state, action) => {
                state.status.upcoming = 'failed';
                state.error.upcoming = action.payload;
            });

        builder
            .addCase(fetchByPopularityManga.pending, (state) => {
                state.status.byPopularity = 'loading';
            })
            .addCase(fetchByPopularityManga.fulfilled, (state, action) => {
                state.status.byPopularity = 'succeeded';
                state.byPopularityManga = action.payload;
            })
            .addCase(fetchByPopularityManga.rejected, (state, action) => {
                state.status.byPopularity = 'failed';
                state.error.byPopularity = action.payload;
            });

        builder
            .addCase(fetchFavoriteManga.pending, (state) => {
                state.status.favorite = 'loading';
            })
            .addCase(fetchFavoriteManga.fulfilled, (state, action) => {
                state.status.favorite = 'succeeded';
                state.favoriteManga = action.payload;
            })
            .addCase(fetchFavoriteManga.rejected, (state, action) => {
                state.status.favorite = 'failed';
                state.error.favorite = action.payload;
            });
    },
});

export default mangaSlice.reducer;
