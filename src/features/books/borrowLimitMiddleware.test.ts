import { setupStore } from '@/app/store'
import type { Book } from '@/types/book'

import { borrowBook, initialState } from './booksSlice'
import { BORROW_LIMIT_MESSAGE } from './borrowLimitMiddleware'

const books: Book[] = ['b01', 'b02', 'b03', 'b04'].map((id) => ({
  id,
  title: `Sách ${id}`,
  author: 'Tác giả',
  category: 'CNTT',
  publishedYear: 2020,
  totalCopies: 2,
  availableCopies: 2,
}))

describe('borrowLimitMiddleware', () => {
  it('chặn cuốn thứ 4 và phát cảnh báo', () => {
    const store = setupStore({ books: { ...initialState, status: 'succeeded', items: books } })

    store.dispatch(borrowBook('b01'))
    store.dispatch(borrowBook('b02'))
    store.dispatch(borrowBook('b03'))
    store.dispatch(borrowBook('b04'))

    const state = store.getState().books
    expect(state.borrowedIds).toEqual(['b01', 'b02', 'b03'])
    expect(state.items.find((book) => book.id === 'b04')?.availableCopies).toBe(2)
    expect(state.notice).toBe(BORROW_LIMIT_MESSAGE)
  })
})
