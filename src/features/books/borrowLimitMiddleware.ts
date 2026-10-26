import type { Middleware } from '@reduxjs/toolkit'

import { MAX_BORROWED_BOOKS } from '@/app/config'
import type { RootState } from '@/app/rootReducer'

import { borrowBook, borrowRejected } from './booksSlice'

export const BORROW_LIMIT_MESSAGE = `Bạn đã mượn đủ ${MAX_BORROWED_BOOKS} cuốn. Hãy trả bớt sách trước khi mượn thêm.`

/**
 * Chặn action mượn sách khi sinh viên đã mượn đủ giới hạn.
 * Action bị chặn không tới reducer; thay vào đó phát cảnh báo `borrowRejected`.
 */
export const borrowLimitMiddleware: Middleware<object, RootState> = (api) => (next) => (action) => {
  if (borrowBook.match(action) && api.getState().books.borrowedIds.length >= MAX_BORROWED_BOOKS) {
    return api.dispatch(borrowRejected(BORROW_LIMIT_MESSAGE))
  }
  return next(action)
}
