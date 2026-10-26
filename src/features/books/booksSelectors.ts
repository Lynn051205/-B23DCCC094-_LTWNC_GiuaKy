import { createSelector } from '@reduxjs/toolkit'

import type { RootState } from '@/app/rootReducer'
import { BOOK_CATEGORIES, type Book, type CategoryStats } from '@/types/book'

export const selectBooks = (state: RootState): Book[] => state.books.items
export const selectBooksStatus = (state: RootState) => state.books.status
export const selectBooksError = (state: RootState) => state.books.error
export const selectBorrowedIds = (state: RootState) => state.books.borrowedIds
export const selectNotice = (state: RootState) => state.books.notice

const isDefined = <T>(value: T | undefined): value is T => value !== undefined

export const selectBorrowedBooks = createSelector([selectBooks, selectBorrowedIds], (books, ids) =>
  ids.map((id) => books.find((book) => book.id === id)).filter(isDefined),
)

export const selectAvailableCopies = createSelector([selectBooks], (books) =>
  books.reduce((sum, book) => sum + book.availableCopies, 0),
)

export const selectCategoryStats = createSelector([selectBooks], (books) => {
  const stats = Object.fromEntries(
    BOOK_CATEGORIES.map((category) => [category, { titles: 0, availableCopies: 0 }]),
  ) as CategoryStats

  for (const book of books) {
    stats[book.category].titles += 1
    stats[book.category].availableCopies += book.availableCopies
  }
  return stats
})
