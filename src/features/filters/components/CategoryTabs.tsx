import { useAppSelector } from '@/app/hooks'
import { selectBooks, selectCategoryStats } from '@/features/books/booksSelectors'
import { BOOK_CATEGORIES, type CategoryFilter } from '@/types/book'

import { useFilterStore } from '../filterStore'

import styles from './CategoryTabs.module.css'

const OPTIONS: ReadonlyArray<{ value: CategoryFilter; label: string }> = [
  { value: 'all', label: 'Tất cả' },
  ...BOOK_CATEGORIES.map((category) => ({ value: category, label: category })),
]

export function CategoryTabs() {
  const category = useFilterStore((state) => state.category)
  const setCategory = useFilterStore((state) => state.setCategory)
  const totalTitles = useAppSelector(selectBooks).length
  const stats = useAppSelector(selectCategoryStats)

  return (
    <div className={styles.group} role="group" aria-label="Lọc theo thể loại">
      {OPTIONS.map((option) => {
        const isActive = option.value === category
        const count = option.value === 'all' ? totalTitles : stats[option.value].titles
        return (
          <button
            key={option.value}
            type="button"
            className={isActive ? `${styles.tab} ${styles.active}` : styles.tab}
            aria-pressed={isActive}
            onClick={() => setCategory(option.value)}
          >
            {option.label}
            <span className={styles.count}>{count}</span>
          </button>
        )
      })}
    </div>
  )
}
