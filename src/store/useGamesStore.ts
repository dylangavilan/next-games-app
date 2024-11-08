import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface AppState {
  savedGames: Array<GameWithTimestamp>;
  addGame: (game: GameDetail) => void;
  removeGame: (gameId: number) => void;
  isLoading: boolean;
}

export const useGameStore = create<AppState>()(
  persist(
    (set) => ({
      savedGames: [],
      isLoading: false,
      addGame: (game) => {
        set({ isLoading: true });
        set((state) => {
          if (state.savedGames.some((savedGame) => savedGame.id === game.id)) {
            return { isLoading: false }; 
          }
          return {
            savedGames: [
              ...state.savedGames,
              { ...game, timestamp: Date.now() },
            ],
            isLoading: false,
          };
        });
      },
      removeGame: (gameId: number) => {
        set({ isLoading: true });  
        set((state) => ({
          savedGames: state.savedGames.filter((game) => game.id !== gameId),
          isLoading: false, 
        }));
      },
    }),
    {
      name: 'game-storage',
      partialize: (state) => ({ savedGames: state.savedGames, isLoading: state.isLoading }),
    }
  )
);
