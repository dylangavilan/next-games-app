import { create } from 'zustand'
import { persist } from 'zustand/middleware';
interface GameWithTimestamp extends Game {
  timestamp: number;
}
interface AppState {
  savedGames: Array<GameWithTimestamp>;
  addGame: (game: Game) => void;
}

export const useAppStore = create<AppState>()(
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