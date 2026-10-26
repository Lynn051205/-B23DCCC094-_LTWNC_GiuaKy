import { CloseIcon, SearchIcon } from '@/components/icons'

import { useFilterStore } from '../filterStore'

import styles from './SearchBar.module.css'

export function SearchBar() {
  const keyword = useFilterStore((state) => state.keyword)
  const setKeyword = useFilterStore((state) => state.setKeyword)

  return (
    <div className={styles.field}>
      <label htmlFor="book-search" className="visually-hidden">
        Tìm sách theo tên hoặc tác giả
      </label>
      <SearchIcon className={styles.icon} />
      <input
        id="book-search"
        type="search"
        className={styles.input}
        placeholder="Tìm tên sách, tác giả hoặc mã sách"
        autoComplete="off"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />
      {keyword && (
        <button type="button" className={styles.clear} onClick={() => setKeyword('')} aria-label="Xoá từ khoá">
          <CloseIcon width={16} height={16} />
        </button>
      )}
    </div>
  )
}
