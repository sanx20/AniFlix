import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MangaRepo } from '../../data/repositories/MangaRepo';

export const fetchMangaCharacters = createAsyncThunk(
    'manga/fetchMangaCharacters',
    async (mangaId, thunkAPI) => {
        try {
            const mangaCharacters = await MangaRepo.fetchMangaChracaters(mangaId);
            if (!mangaCharacters) {
                return thunkAPI.rejectWithValue('Failed to fetch manga characters');
            }
            return mangaCharacters;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const mangaCharactersSlice = createSlice({
    name: 'mangaCharacters',
    initialState: {
        characters: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMangaCharacters.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchMangaCharacters.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.characters = action.payload.data;
            })
            .addCase(fetchMangaCharacters.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export default mangaCharactersSlice.reducer;