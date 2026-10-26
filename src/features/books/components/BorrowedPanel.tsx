import { MAX_BORROWED_BOOKS } from '@/app/config'
import { useAppSelector } from '@/app/hooks'
import { Button } from '@/components/ui/Button'

import { selectBorrowedBooks } from '../booksSelectors'
import { categoryToneClass } from '../categoryTone'

import styles from './BorrowedPanel.module.css'

interface BorrowedPanelProps {
  onReturn: (id: string) => void
}

export function BorrowedPanel({ onReturn }: BorrowedPanelProps) {
  const borrowedBooks = useAppSelector(selectBorrowedBooks)
  const count = borrowedBooks.length
  const isFull = count >= MAX_BORROWED_BOOKS

  return (
    <section className={styles.panel} aria-labelledby="borrowed-heading">
      <header className={styles.header}>
        <h2 id="borrowed-heading" className={styles.heading}>
          Sách đang mượn
        </h2>
        <span className={styles.counter}>{`${count}/${MAX_BORROWED_BOOKS}`}</span>
      </header>

      <div
        className={isFull ? `${styles.track} ${styles.full}` : styles.track}
        role="progressbar"
        aria-label="Số sách đã mượn"
        aria-valuemin={0}
        aria-valuemax={MAX_BORROWED_BOOKS}
        aria-valuenow={count}
      >
        <div className={styles.fill} style={{ width: `${(count / MAX_BORROWED_BOOKS) * 100}%` }} />
      </div>

      {count === 0 ? (
        <p className={styles.empty}>Bạn chưa mượn cuốn nào. Bấm “Mượn” ở danh sách để bắt đầu.</p>
      ) : (
        <ul className={styles.list}>
          {borrowedBooks.map((book) => (
            <li key={book.id} className={`${styles.item} ${categoryToneClass(book.category)}`}>
              <div className={styles.itemText}>
                <p className={styles.itemTitle}>{book.title}</p>
                <p className={styles.itemAuthor}>{book.author}</p>
              </div>
              <Button variant="secondary" size="sm" onClick={() => onReturn(book.id)} aria-label={`Trả ${book.title}`}>
                Trả
              </Button>
            </li>
          ))}
        </ul>
      )}

      <p className={styles.rule}>
        {isFull
          ? 'Bạn đã mượn đủ số lượng cho phép. Trả bớt sách để mượn cuốn khác.'
          : `Mỗi sinh viên được mượn tối đa ${MAX_BORROWED_BOOKS} cuốn cùng lúc.`}
      </p>
    </section>
  )
}
