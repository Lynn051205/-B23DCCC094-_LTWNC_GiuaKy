import { memo } from 'react'

import { Button } from '@/components/ui/Button'
import type { Book } from '@/types/book'

import { categoryToneClass } from '../categoryTone'

import styles from './BookCard.module.css'

export interface BookCardProps {
  book: Book
  isBorrowed: boolean
  onBorrow: (id: string) => void
  onReturn: (id: string) => void
}

export const BookCard = memo(function BookCard({ book, isBorrowed, onBorrow, onReturn }: BookCardProps) {
  const isOutOfStock = book.availableCopies === 0
  const cardClass = [styles.card, categoryToneClass(book.category), isOutOfStock && styles.outOfStock]
    .filter(Boolean)
    .join(' ')

  return (
    <article className={cardClass} aria-label={book.title}>
      <div className={styles.main}>
        <h3 className={styles.title}>
          {book.title}
          {isBorrowed && <span className={styles.badge}>Đang mượn</span>}
        </h3>
        <p className={styles.author}>{book.author} <span>· {book.id}</span></p>
      </div>

      <p className={styles.category}>
        <span className="visually-hidden">Thể loại: </span>
        {book.category}
      </p>

      <p className={styles.year}>
        <span className="visually-hidden">Năm xuất bản: </span>
        {book.publishedYear}
      </p>

      <p className={styles.stock}>
        <span className={styles.stockValue}>{`${book.availableCopies}/${book.totalCopies}`}</span>
        <span className={styles.stockLabel}>{isOutOfStock ? 'Hết sách' : 'còn lại'}</span>
      </p>

      <div className={styles.action}>
        {isBorrowed ? (
          <Button variant="secondary" size="sm" onClick={() => onReturn(book.id)} aria-label={`Trả ${book.title}`}>
            Trả
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={() => onBorrow(book.id)}
            disabled={isOutOfStock}
            title={isOutOfStock ? 'Sách đã hết bản' : undefined}
            aria-label={`Mượn ${book.title}`}
          >
            Mượn
          </Button>
        )}
      </div>
    </article>
  )
})
