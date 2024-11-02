// import { create } from 'zustand'
// import { fetchTodos } from '@/services/api'

// interface Todo {
//   id: number
//   title: string
//   completed: boolean
// }

// interface AppState {
//   todos: Todo[]
//   isLoading: boolean
//   error: string | null
//   fetchTodos: () => Promise<void>
// }

// export const useAppStore = create<AppState>((set) => ({
//   todos: [],
//   isLoading: false,
//   error: null,
//   fetchTodos: async () => {
//     set({ isLoading: true })
//     try {
//       const todos = await fetchTodos()
//       set({ todos, isLoading: false, error: null })
//     } catch (error) {
//       set({ error: (error as Error).message, isLoading: false })
//     }
//   },
// }))