import { configureStore } from '@reduxjs/toolkit';
import mangaReducer from './slices/mangaSlice';
import mangaCharactersSlice from './slices/mangaCharactersSlice';
import animeReducer from './slices/AnimeSlice';
import animeCharactersSlice from './slices/AnimeCharacterSlice';

export const store = configureStore({
    reducer: {
        manga: mangaReducer,
        mangaCharacters: mangaCharactersSlice,
        anime: animeReducer,
        animeCharacters: animeCharactersSlice,
    },
});
