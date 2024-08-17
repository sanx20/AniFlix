import { configureStore } from '@reduxjs/toolkit';
import mangaReducer from './slices/mangaSlice';
import mangaCharactersSlice from './slices/mangaCharactersSlice';
import animeReducer from './slices/AnimeSlice';
import animeCharactersSlice from './slices/AnimeCharacterSlice';
import favoritesReducer from './slices/favouriteSlice';


export const store = configureStore({
    reducer: {
        manga: mangaReducer,
        mangaCharacters: mangaCharactersSlice,
        anime: animeReducer,
        animeCharacters: animeCharactersSlice,
        favorites: favoritesReducer,
    },
});
