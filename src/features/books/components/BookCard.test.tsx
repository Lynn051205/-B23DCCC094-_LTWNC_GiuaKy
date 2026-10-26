import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { Book } from '@/types/book'

import { BookCard, type BookCardProps } from './BookCard'

const book: Book = {
  id: 'b07',
  title: 'Nguyên lý kinh tế học',
  author: 'N. Gregory Mankiw',
  category: 'Kinh tế',
  publishedYear: 2014,
  totalCopies: 5,
  availableCopies: 2,
}

function renderCard(props: Partial<BookCardProps> = {}) {
  const onBorrow = jest.fn()
  const onReturn = jest.fn()
  render(<BookCard book={book} isBorrowed={false} onBorrow={onBorrow} onReturn={onReturn} {...props} />)
  return { onBorrow, onReturn, user: userEvent.setup() }
}

describe('BookCard', () => {
  it('hiển thị đúng thông tin của sách', () => {
    renderCard()
    expect(screen.getByRole('heading', { name: 'Nguyên lý kinh tế học' })).toBeInTheDocument()
    expect(screen.getByText('N. Gregory Mankiw')).toBeInTheDocument()
    expect(screen.getByText('Kinh tế')).toBeInTheDocument()
    expect(screen.getByText('2014')).toBeInTheDocument()
    expect(screen.getByText('2/5')).toBeInTheDocument()
  })

  it('bấm "Mượn" gọi onBorrow với đúng id', async () => {
    const { onBorrow, user } = renderCard()
    await user.click(screen.getByRole('button', { name: /mượn/i }))
    expect(onBorrow).toHaveBeenCalledTimes(1)
    expect(onBorrow).toHaveBeenCalledWith('b07')
  })

  it('vô hiệu hoá nút "Mượn" khi sách hết bản', async () => {
    const { onBorrow, user } = renderCard({ book: { ...book, availableCopies: 0 } })
    const button = screen.getByRole('button', { name: /mượn/i })
    expect(button).toBeDisabled()
    expect(screen.getByText('Hết sách')).toBeInTheDocument()
    await user.click(button)
    expect(onBorrow).not.toHaveBeenCalled()
  })

  it('sách đang mượn hiện nút "Trả" và gọi onReturn với đúng id', async () => {
    const { onReturn, user } = renderCard({ isBorrowed: true })
    expect(screen.queryByRole('button', { name: /mượn/i })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /trả/i }))
    expect(onReturn).toHaveBeenCalledWith('b07')
  })
})
