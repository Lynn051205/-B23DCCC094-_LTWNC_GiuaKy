import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { fetchBooksApi, type FetchBooksOptions } from '@/api/booksApi'
import { isApiSuccess } from '@/types/api'
import type { Book } from '@/types/book'

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface BooksState {
  items: Book[]
  status: RequestStatus
  error: string | null
  borrowedIds: string[]
  /** Cảnh báo hiển thị cho người dùng, ví dụ khi mượn quá giới hạn */
  notice: string | null
}

export const initialState: BooksState = {
  items: [],
  status: 'idle',
  error: null,
  borrowedIds: [],
  notice: null,
}

export const fetchBooks = createAsyncThunk<
  Book[],
  Partial<FetchBooksOptions> | undefined,
  { state: { books: BooksState }; rejectValue: string }
>(
  'books/fetchBooks',
  async (options, { rejectWithValue }) => {
    const result = await fetchBooksApi(options)
    return isApiSuccess(result) ? result.data : rejectWithValue(result.error)
  },
  {
    // Bỏ qua lần gọi trùng khi đang tải (StrictMode chạy effect 2 lần ở dev)
    condition: (_, { getState }) => getState().books.status !== 'loading',
  },
)

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    borrowBook(state, action: PayloadAction<string>) {
      const book = state.items.find((item) => item.id === action.payload)
      if (!book || book.availableCopies === 0 || state.borrowedIds.includes(book.id)) return

      book.availableCopies -= 1
      state.borrowedIds.push(book.id)
      state.notice = null
    },
    returnBook(state, action: PayloadAction<string>) {
      const index = state.borrowedIds.indexOf(action.payload)
      if (index === -1) return

      state.borrowedIds.splice(index, 1)
      const book = state.items.find((item) => item.id === action.payload)
      if (book) book.availableCopies += 1
      state.notice = null
    },
    borrowRejected(state, action: PayloadAction<string>) {
      state.notice = action.payload
    },
    noticeDismissed(state) {
      state.notice = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? action.error.message ?? 'Đã có lỗi xảy ra.'
      })
  },
})

export const { borrowBook, returnBook, borrowRejected, noticeDismissed } = booksSlice.actions

export default booksSlice.reducer
