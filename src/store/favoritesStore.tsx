import { create } from "zustand";

interface FavoritesState {
    favorites: string[]; //dogs ids
    toggleFavorite: (dogId: string) => void;
    isFavorited: (id: string) => boolean;
}

export const favoritesStore = create<FavoritesState>((set, get) => ({
    favorites: [],
    toggleFavorite: (dogId) => {
        set((state) => {
            const isFav = state.favorites.includes(dogId);
            return {
                favorites: isFav
                    ? state.favorites.filter((id) => id !== dogId) // Remove if already favorited
                    : [...state.favorites, dogId], // Add if not favorited
            };
        });
    },
    isFavorited: (id) => get().favorites.includes(id),
}));
