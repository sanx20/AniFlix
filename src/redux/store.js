import { configureStore } from '@reduxjs/toolkit';
import mangaReducer from './slices/mangaSlice';

export const store = configureStore({
    reducer: {
        manga: mangaReducer,
    },
});
