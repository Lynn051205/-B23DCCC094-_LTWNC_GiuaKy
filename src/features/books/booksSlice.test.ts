import type { Book } from '@/types/book'

import booksReducer, {
  borrowBook,
  borrowRejected,
  fetchBooks,
  initialState,
  returnBook,
  type BooksState,
} from './booksSlice'

const makeBook = (overrides: Partial<Book> = {}): Book => ({
  id: 'b01',
  title: 'Clean Code',
  author: 'Robert C. Martin',
  category: 'CNTT',
  publishedYear: 2008,
  totalCopies: 5,
  availableCopies: 3,
  ...overrides,
})

const stateWith = (overrides: Partial<BooksState>): BooksState => ({
  ...initialState,
  status: 'succeeded',
  ...overrides,
})

describe('booksSlice reducer', () => {
  it('trả về state khởi tạo khi nhận action lạ', () => {
    expect(booksReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('fetchBooks.pending chuyển sang loading và xoá lỗi cũ', () => {
    const state = booksReducer(stateWith({ status: 'failed', error: 'Lỗi' }), fetchBooks.pending('req', undefined))
    expect(state.status).toBe('loading')
    expect(state.error).toBeNull()
  })

  it('fetchBooks.fulfilled lưu danh sách sách', () => {
    const books = [makeBook(), makeBook({ id: 'b02', title: 'Refactoring' })]
    const state = booksReducer(stateWith({ status: 'loading' }), fetchBooks.fulfilled(books, 'req', undefined))
    expect(state.status).toBe('succeeded')
    expect(state.items).toEqual(books)
  })

  it('fetchBooks.rejected lưu thông báo lỗi', () => {
    const action = fetchBooks.rejected(null, 'req', undefined, 'Mất kết nối')
    const state = booksReducer(stateWith({ status: 'loading' }), action)
    expect(state.status).toBe('failed')
    expect(state.error).toBe('Mất kết nối')
  })

  it('borrowBook giảm 1 bản và thêm vào danh sách đang mượn', () => {
    const state = booksReducer(stateWith({ items: [makeBook()] }), borrowBook('b01'))
    expect(state.items[0].availableCopies).toBe(2)
    expect(state.borrowedIds).toEqual(['b01'])
  })

  it('borrowBook không làm gì khi sách đã hết bản', () => {
    const before = stateWith({ items: [makeBook({ availableCopies: 0 })] })
    const state = booksReducer(before, borrowBook('b01'))
    expect(state.items[0].availableCopies).toBe(0)
    expect(state.borrowedIds).toEqual([])
  })

  it('returnBook tăng 1 bản và bỏ khỏi danh sách đang mượn', () => {
    const before = stateWith({ items: [makeBook({ availableCopies: 2 })], borrowedIds: ['b01'] })
    const state = booksReducer(before, returnBook('b01'))
    expect(state.items[0].availableCopies).toBe(3)
    expect(state.borrowedIds).toEqual([])
  })

  it('returnBook bỏ qua sách chưa mượn', () => {
    const before = stateWith({ items: [makeBook()] })
    expect(booksReducer(before, returnBook('b01'))).toEqual(before)
  })

  it('borrowRejected lưu cảnh báo', () => {
    const state = booksReducer(initialState, borrowRejected('Quá giới hạn'))
    expect(state.notice).toBe('Quá giới hạn')
  })
})
