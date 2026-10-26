import { useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { MAX_BORROWED_BOOKS } from '@/app/config'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { AlertCircleIcon, BoxIcon, CheckCircleIcon, LibraryIcon } from '@/components/icons'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import {
  selectAvailableCopies,
  selectBooks,
  selectBooksError,
  selectBooksStatus,
  selectBorrowedBooks,
  selectCategoryStats,
} from '@/features/books/booksSelectors'
import { fetchBooks } from '@/features/books/booksSlice'
import { categoryToneClass } from '@/features/books/categoryTone'
import { BOOK_CATEGORIES } from '@/types/book'

import styles from './StatsPage.module.css'

/** Trang tổng quan — được lazy load từ App */
export default function StatsPage() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectBooksStatus)
  const error = useAppSelector(selectBooksError)
  const books = useAppSelector(selectBooks)
  const availableCopies = useAppSelector(selectAvailableCopies)
  const categoryStats = useAppSelector(selectCategoryStats)
  const borrowedBooks = useAppSelector(selectBorrowedBooks)

  const handleRetry = useCallback(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  const totalCopies = useMemo(
    () => books.reduce((sum, book) => sum + book.totalCopies, 0),
    [books],
  )
  const outOfStockTitles = books.filter((book) => book.availableCopies === 0).length
  const attentionBooks = books.filter((book) => book.availableCopies <= 1)
  const maxTitles = Math.max(1, ...BOOK_CATEGORIES.map((category) => categoryStats[category].titles))
  const availabilityPercent = totalCopies ? Math.round((availableCopies / totalCopies) * 100) : 0
  const currentDate = new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <>
      <section className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>{currentDate}</p>
          <h1 className={styles.title}>Tổng quan thư viện</h1>
          <p className={styles.subtitle}>Theo dõi tình trạng kho sách và hoạt động mượn trả tại cơ sở.</p>
        </div>
        <Link to="/" className={styles.primaryLink}>
          <LibraryIcon width={17} height={17} />
          Mở kho sách
        </Link>
      </section>

      {status === 'failed' && <ErrorState message={error ?? 'Đã có lỗi xảy ra.'} onRetry={handleRetry} />}
      {(status === 'idle' || status === 'loading') && <LoadingState />}

      {status === 'succeeded' && (
        <>
          <dl className={styles.summary}>
            <div className={styles.figure}>
              <span className={`${styles.figureIcon} ${styles.iconTeal}`}><LibraryIcon /></span>
              <dt className={styles.figureLabel}>Đầu sách trong kho</dt>
              <dd className={styles.figureValue}>{books.length}</dd>
              <span className={styles.figureHint}>Tổng số tựa sách</span>
            </div>
            <div className={styles.figure}>
              <span className={`${styles.figureIcon} ${styles.iconGreen}`}><BoxIcon /></span>
              <dt className={styles.figureLabel}>Tổng số bản</dt>
              <dd className={styles.figureValue}>{totalCopies}</dd>
              <span className={styles.figureHint}>Trên tất cả thể loại</span>
            </div>
            <div className={styles.figure}>
              <span className={`${styles.figureIcon} ${styles.iconMint}`}><CheckCircleIcon /></span>
              <dt className={styles.figureLabel}>Sẵn sàng cho mượn</dt>
              <dd className={styles.figureValue}>{availableCopies}</dd>
              <span className={styles.figureHint}>{availabilityPercent}% tổng số bản</span>
            </div>
            <div className={styles.figure}>
              <span className={`${styles.figureIcon} ${styles.iconAmber}`}><AlertCircleIcon /></span>
              <dt className={styles.figureLabel}>Đang hết bản</dt>
              <dd className={styles.figureValue}>{outOfStockTitles}</dd>
              <span className={styles.figureHint}>Đầu sách cần bổ sung</span>
            </div>
          </dl>

          <div className={styles.contentGrid}>
            <section className={styles.section} aria-labelledby="by-category">
              <header className={styles.sectionHeader}>
                <div>
                  <h2 id="by-category" className={styles.sectionTitle}>Phân bổ theo thể loại</h2>
                  <p className={styles.sectionCaption}>Số đầu sách và bản còn trên kệ</p>
                </div>
                <span className={styles.totalPill}>{books.length} tựa sách</span>
              </header>
              <ul className={styles.chart}>
                {BOOK_CATEGORIES.map((category) => {
                  const stat = categoryStats[category]
                  return (
                    <li key={category} className={`${styles.row} ${categoryToneClass(category)}`}>
                      <span className={styles.label}>{category}</span>
                      <span className={styles.track} aria-hidden="true">
                        <span className={styles.bar} style={{ width: `${(stat.titles / maxTitles) * 100}%` }} />
                      </span>
                      <span className={styles.value}>
                        <strong>{stat.titles}</strong>
                        <span className={styles.valueSub}>{stat.availableCopies} bản còn</span>
                      </span>
                    </li>
                  )
                })}
              </ul>
              <div className={styles.availability}>
                <span>Khả năng phục vụ hiện tại</span>
                <strong>{availableCopies} / {totalCopies} bản</strong>
              </div>
              <div
                className={styles.availabilityTrack}
                role="progressbar"
                aria-label="Tỷ lệ bản sách sẵn sàng"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={availabilityPercent}
              >
                <span style={{ width: `${availabilityPercent}%` }} />
              </div>
            </section>

            <section className={styles.section} aria-labelledby="attention-list">
              <header className={styles.sectionHeader}>
                <div>
                  <h2 id="attention-list" className={styles.sectionTitle}>Cần theo dõi</h2>
                  <p className={styles.sectionCaption}>Sách hết hoặc chỉ còn một bản</p>
                </div>
                <span className={styles.attentionCount}>{attentionBooks.length}</span>
              </header>
              {attentionBooks.length === 0 ? (
                <p className={styles.empty}>Kho sách đang đáp ứng tốt, chưa có đầu sách cần lưu ý.</p>
              ) : (
                <ul className={styles.attentionList}>
                  {attentionBooks.map((book) => (
                    <li key={book.id} className={styles.attentionItem}>
                      <span className={styles.attentionMark}>
                        <AlertCircleIcon width={17} height={17} />
                      </span>
                      <span className={styles.attentionText}>
                        <strong>{book.title}</strong>
                        <small>{book.id} · {book.category}</small>
                      </span>
                      <span className={book.availableCopies === 0 ? styles.outStatus : styles.lowStatus}>
                        {book.availableCopies === 0 ? 'Hết bản' : 'Còn 1 bản'}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          <section className={styles.section} aria-labelledby="borrowed-list">
            <header className={styles.sectionHeader}>
              <div>
                <h2 id="borrowed-list" className={styles.sectionTitle}>Đang mượn trong phiên này</h2>
                <p className={styles.sectionCaption}>Danh sách được cập nhật khi bạn mượn hoặc trả sách</p>
              </div>
              <span className={styles.totalPill}>{borrowedBooks.length}/{MAX_BORROWED_BOOKS} lượt mượn</span>
            </header>
            {borrowedBooks.length === 0 ? (
              <p className={styles.empty}>Chưa có sách được mượn trong phiên này.</p>
            ) : (
              <ul className={styles.borrowed}>
                {borrowedBooks.map((book) => (
                  <li key={book.id} className={`${styles.borrowedItem} ${categoryToneClass(book.category)}`}>
                    <span className={styles.borrowedTitle}>{book.title}</span>
                    <span className={styles.borrowedMeta}>{book.id} · {book.author} · {book.category}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </>
  )
}
