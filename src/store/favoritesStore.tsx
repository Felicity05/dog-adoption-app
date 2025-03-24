import { create } from "zustand";

interface FavoritesState {
    favorites: string[]; // dogs ids
    favoritesCount: number;
    currentUserId: string | null;
    initialize: (userId: string) => void;
    toggleFavorite: (dogId: string) => void;
    isFavorited: (id: string) => boolean;
    clearFavorites: () => void;
    updateFavorites: (favorites: string[]) => void;
}

const FAVORITES_LIMIT = 100;
const getStorageKey = (userId: string) => `user_${userId}_favorites`;

export const favoritesStore = create<FavoritesState>((set, get) => ({
    favorites: [],
    favoritesCount: 0,
    currentUserId: null,

    // Initialize store with user-specific data
    initialize: (userId) => {
        const saved = localStorage.getItem(getStorageKey(userId));
        set({
            currentUserId: userId,
            favorites: saved ? JSON.parse(saved) : [],
            favoritesCount: saved ? JSON.parse(saved).length : 0
        });
    },

    // Helper function
    updateFavorites: (newFavorites: string[]) => {
        set({
            favorites: newFavorites,
            favoritesCount: newFavorites.length
        });
        localStorage.setItem(
            getStorageKey(get().currentUserId!),
            JSON.stringify(newFavorites)
        );
    },

    // Toggle favorite and persist to storage
    toggleFavorite: (dogId) => {
        const { currentUserId, favorites, updateFavorites } = get();
        if (!currentUserId) return;

        // Removal case
        if (favorites.includes(dogId)) {
            const newFavorites = favorites.filter(id => id !== dogId);
            updateFavorites(newFavorites);
            return;
        }

        // Addition case
        if (favorites.length >= FAVORITES_LIMIT) {
            alert(`You've reached the limit for your favorites, remove one and try again!`);
            return;
        } 

        updateFavorites([...favorites, dogId]);
    },

    isFavorited: (id) => get().favorites.includes(id),

    // Clear both memory and storage
    clearFavorites: () => {
        const { currentUserId } = get();
        if (currentUserId) {
            localStorage.setItem(
                getStorageKey(currentUserId),
                JSON.stringify([])
            );
        }
        set({ favorites: [], favoritesCount: 0 });
    }
}));