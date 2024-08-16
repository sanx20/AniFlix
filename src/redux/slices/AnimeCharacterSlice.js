import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AnimeRepo } from '../../data/repositories/AnimeRepo';

export const fetchAnimeCharacters = createAsyncThunk(
    'anime/fetchAnimeCharacters',
    async (animeId, thunkAPI) => {
        try {
            const animeCharacters = await AnimeRepo.fetchAnimeChracaters(animeId);
            if (!animeCharacters) {
                return thunkAPI.rejectWithValue('Failed to fetch anime characters');
            }
            return animeCharacters;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const animeCharactersSlice = createSlice({
    name: 'animeCharacters',
    initialState: {
        characters: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnimeCharacters.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchAnimeCharacters.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.characters = action.payload.data;
            })
            .addCase(fetchAnimeCharacters.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export default animeCharactersSlice.reducer;