import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { load, saveDataToFirebase, removeDataFromFirebase } from '../../data/database/index';

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async () => {
    try {
        return await load();
    } catch (error) {
        throw new Error(error.message);
    }
});

export const addFavorite = createAsyncThunk('favorites/addFavorite', async (item) => {
    try {
        await saveDataToFirebase(item);
        return item;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const removeFavorite = createAsyncThunk('favorites/removeFavorite', async (itemId) => {
    try {
        await removeDataFromFirebase(itemId);
        return itemId;
    } catch (error) {
        console.error('Error removing item: ', error);
        throw new Error(error.message);
    }
});

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        favorites: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.favorites = action.payload;
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                state.favorites.push(action.payload);
            })
            .addCase(addFavorite.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.favorites = state.favorites.filter(fav => fav.mal_id !== action.payload);
            })
            .addCase(removeFavorite.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export default favoritesSlice.reducer;
