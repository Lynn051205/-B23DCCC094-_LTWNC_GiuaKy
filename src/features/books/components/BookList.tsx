import type { Book } from '@/types/book'

import { BookCard } from './BookCard'
import styles from './BookList.module.css'

interface BookListProps {
  books: Book[]
  borrowedIds: ReadonlySet<string>
  onBorrow: (id: string) => void
  onReturn: (id: string) => void
}

export function BookList({ books, borrowedIds, onBorrow, onReturn }: BookListProps) {
  return (
    <div className={styles.list}>
      <div className={styles.head} aria-hidden="true">
        <span>Sách</span>
        <span>Thể loại</span>
        <span>Năm XB</span>
        <span>Số bản</span>
        <span />
      </div>
      <ul className={styles.items}>
        {books.map((book) => (
          <li key={book.id}>
            <BookCard book={book} isBorrowed={borrowedIds.has(book.id)} onBorrow={onBorrow} onReturn={onReturn} />
          </li>
        ))}
      </ul>
    </div>
  )
}
