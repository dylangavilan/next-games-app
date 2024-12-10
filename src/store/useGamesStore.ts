import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface AppState {
  savedGames: Array<GameWithTimestamp>;
  addGame: (game: GameDetail) => void;
  removeGame: (gameId: number) => void;
}

export const useGameStore = create<AppState>()(
  persist(
    (set) => ({
      savedGames: [],
      addGame: (game) => {
        set((state) => {
          if (state.savedGames.some((savedGame) => savedGame.id === game.id)) {
            return { isLoading: false }; 
          }
          return {
            savedGames: [
              { ...game, timestamp: Date.now() },
              ...state.savedGames,
            ],
            isLoading: false,
          };
        });
      },
      removeGame: (gameId: number) => {
        set((state) => ({
          savedGames: state.savedGames.filter((game) => game.id !== gameId),
        }));
      },
    }),
    {
      name: 'game-storage',
      partialize: (state) => ({ savedGames: state.savedGames }),
    }
  )
);
