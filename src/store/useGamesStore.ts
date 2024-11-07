import { create } from 'zustand'
import { persist } from 'zustand/middleware';
interface GameWithTimestamp extends GameDetail {
  timestamp: number;
}
interface AppState {
  savedGames: Array<GameWithTimestamp>;
  addGame: (game: GameDetail) => void;
}

export const useGameStore = create<AppState>()(
  persist(
    (set) => ({
      savedGames: [],
      addGame: (game) =>
        set((state) => ({
          savedGames: [
            ...state.savedGames,
            { ...game, timestamp: Date.now() }, 
          ],
        })),
    }),
    {
      name: 'game-storage',
      partialize: (state) => ({ savedGames: state.savedGames }), 
    }
  )
);