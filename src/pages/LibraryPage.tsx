import { useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { MAX_BORROWED_BOOKS, SEARCH_DEBOUNCE_MS } from '@/app/config'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import { Button } from '@/components/ui/Button'
import {
  selectAvailableCopies,
  selectBooks,
  selectBooksError,
  selectBooksStatus,
  selectBorrowedIds,
} from '@/features/books/booksSelectors'
import { borrowBook, fetchBooks, returnBook } from '@/features/books/booksSlice'
import { BookList } from '@/features/books/components/BookList'
import { BorrowedPanel } from '@/features/books/components/BorrowedPanel'
import { BorrowNotice } from '@/features/books/components/BorrowNotice'
import { CategoryTabs } from '@/features/filters/components/CategoryTabs'
import { SearchBar } from '@/features/filters/components/SearchBar'
import { filterBooks } from '@/features/filters/filterBooks'
import { useFilterStore } from '@/features/filters/filterStore'
import { useDebounce } from '@/hooks/useDebounce'

import styles from './LibraryPage.module.css'

export function LibraryPage() {
  const dispatch = useAppDispatch()
  const books = useAppSelector(selectBooks)
  const status = useAppSelector(selectBooksStatus)
  const error = useAppSelector(selectBooksError)
  const borrowedIds = useAppSelector(selectBorrowedIds)
  const availableCopies = useAppSelector(selectAvailableCopies)

  const keyword = useFilterStore((state) => state.keyword)
  const category = useFilterStore((state) => state.category)
  const resetFilters = useFilterStore((state) => state.resetFilters)
  const debouncedKeyword = useDebounce(keyword, SEARCH_DEBOUNCE_MS)

  const visibleBooks = useMemo(
    () => filterBooks(books, debouncedKeyword, category),
    [books, debouncedKeyword, category],
  )
  const borrowedSet = useMemo(() => new Set(borrowedIds), [borrowedIds])

  const handleBorrow = useCallback((id: string) => {
    dispatch(borrowBook(id))
  }, [dispatch])

  const handleReturn = useCallback((id: string) => {
    dispatch(returnBook(id))
  }, [dispatch])

  const handleRetry = useCallback(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  const isReady = status === 'succeeded'
  const isSearching = keyword !== debouncedKeyword

  return (
    <>
      <section className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>DANH MỤC THƯ VIỆN</p>
          <h1 className={styles.title}>Kho sách</h1>
          <p className={styles.subtitle}>
            {isReady
              ? `${books.length} đầu sách đang được quản lý tại cơ sở trung tâm.`
              : 'Tra cứu đầu sách và thực hiện mượn trả ngay tại đây.'}
          </p>
        </div>
        <Link to="/stats" className={styles.overviewLink}>
          Xem tổng quan
        </Link>
      </section>

      {isReady && (
        <dl className={styles.quickStats}>
          <div className={styles.quickStat}>
            <dt>Tổng đầu sách</dt>
            <dd>
              {books.length}<span> tựa sách</span>
            </dd>
          </div>
          <div className={styles.quickStat}>
            <dt>Bản sẵn sàng</dt>
            <dd>
              {availableCopies}<span> bản trên kệ</span>
            </dd>
          </div>
          <div className={styles.quickStat}>
            <dt>Đang mượn</dt>
            <dd>
              {borrowedIds.length}<span> / {MAX_BORROWED_BOOKS} lượt</span>
            </dd>
          </div>
        </dl>
      )}

      {status === 'failed' && <ErrorState message={error ?? 'Đã có lỗi xảy ra.'} onRetry={handleRetry} />}
      {(status === 'idle' || status === 'loading') && <LoadingState />}

      {isReady && (
        <>
          <div className={styles.toolbar}>
            <SearchBar />
            <CategoryTabs />
          </div>

          <div className={styles.layout}>
            <div>
              <p className={styles.meta} aria-live="polite">
                {isSearching
                  ? 'Đang tìm...'
                  : `Hiển thị ${visibleBooks.length} trên ${books.length} đầu sách`}
              </p>

              {visibleBooks.length > 0 ? (
                <BookList
                  books={visibleBooks}
                  borrowedIds={borrowedSet}
                  onBorrow={handleBorrow}
                  onReturn={handleReturn}
                />
              ) : (
                <div className={styles.empty}>
                  <p className={styles.emptyTitle}>Không tìm thấy sách phù hợp</p>
                  <p className={styles.emptyText}>Thử từ khoá khác hoặc chọn thể loại “Tất cả”.</p>
                  <Button variant="secondary" onClick={resetFilters}>
                    Xoá bộ lọc
                  </Button>
                </div>
              )}
            </div>

            <aside className={styles.aside}>
              <BorrowedPanel onReturn={handleReturn} />
            </aside>
          </div>

          <BorrowNotice />
        </>
      )}
    </>
  )
}
