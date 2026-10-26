import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { setupStore } from '@/app/store'
import { BOOKS_SEED } from '@/data/books'
import { initialState } from '@/features/books/booksSlice'
import { BORROW_LIMIT_MESSAGE } from '@/features/books/borrowLimitMiddleware'

import { LibraryPage } from './LibraryPage'

function renderPage() {
  const store = setupStore({
    books: { ...initialState, status: 'succeeded', items: BOOKS_SEED.map((book) => ({ ...book })) },
  })
  render(
    <MemoryRouter>
      <Provider store={store}>
        <LibraryPage />
      </Provider>
    </MemoryRouter>,
  )
  return { store, user: userEvent.setup() }
}

describe('LibraryPage — luồng mượn/trả', () => {
  it('mượn tối đa 3 cuốn, cuốn thứ 4 bị chặn kèm cảnh báo, trả sách thì số bản tăng lại', async () => {
    const { store, user } = renderPage()

    await user.click(screen.getByRole('button', { name: 'Mượn Lập trình TypeScript thực chiến' }))
    await user.click(screen.getByRole('button', { name: 'Mượn Tư duy thiết kế sản phẩm số' }))
    await user.click(screen.getByRole('button', { name: 'Mượn Marketing căn bản' }))
    await user.click(screen.getByRole('button', { name: 'Mượn Tiếng Anh học thuật B2' }))

    expect(screen.getByRole('alert')).toHaveTextContent(BORROW_LIMIT_MESSAGE)
    expect(store.getState().books.borrowedIds).toEqual(['TV-001', 'TV-005', 'TV-010'])

    const typescriptBook = screen.getByRole('article', { name: 'Lập trình TypeScript thực chiến' })
    expect(within(typescriptBook).getByText('2/5')).toBeInTheDocument()

    await user.click(within(typescriptBook).getByRole('button', { name: 'Trả Lập trình TypeScript thực chiến' }))
    expect(within(typescriptBook).getByText('3/5')).toBeInTheDocument()
    expect(store.getState().books.borrowedIds).toEqual(['TV-005', 'TV-010'])
  })
})
