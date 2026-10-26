import { create } from 'zustand'

import type { CategoryFilter } from '@/types/book'

interface FilterState {
  keyword: string
  category: CategoryFilter
  setKeyword: (keyword: string) => void
  setCategory: (category: CategoryFilter) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>()((set) => ({
  keyword: '',
  category: 'all',
  setKeyword: (keyword) => set({ keyword }),
  setCategory: (category) => set({ category }),
  resetFilters: () => set({ keyword: '', category: 'all' }),
}))
