'use client'
import { create } from 'zustand'

interface GamesStore extends GamesState, GamesActions {}

type GamesState = {
  counter: number;
};

const initialState: GamesState = {
  counter: 0,
};

type GamesActions = {
  incrementCounter: () => void
}

export const useGamesStore = create<GamesStore>()((set) => ({
  ...initialState,
  incrementCounter: () => set((state) => ({ counter: state.counter + 1 })),
}));

export default useGamesStore;