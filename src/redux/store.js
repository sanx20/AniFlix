import { configureStore } from '@reduxjs/toolkit';
import mangaReducer from './slices/mangaSlice';
import mangaCharactersSlice from './slices/mangaCharactersSlice';

export const store = configureStore({
    reducer: {
        manga: mangaReducer,
        mangaCharacters: mangaCharactersSlice,
    },
});
