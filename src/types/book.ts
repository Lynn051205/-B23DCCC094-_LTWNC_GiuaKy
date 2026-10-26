export const BOOK_CATEGORIES = ['CNTT', 'Kinh tế', 'Ngoại ngữ'] as const

export type BookCategory = (typeof BOOK_CATEGORIES)[number]

/** Giá trị của bộ lọc thể loại — thêm lựa chọn "Tất cả" */
export type CategoryFilter = BookCategory | 'all'

export interface Book {
  id: string
  title: string
  author: string
  category: BookCategory
  publishedYear: number
  totalCopies: number
  availableCopies: number
}

/** Thông tin rút gọn của một cuốn sách, chỉ đọc — dùng cho các danh sách phụ */
export type BookSummary = Readonly<Pick<Book, 'id' | 'title' | 'author' | 'category'>>

/** Số liệu thống kê của một thể loại */
export interface CategoryStat {
  titles: number
  availableCopies: number
}

export type CategoryStats = Record<BookCategory, CategoryStat>
