import type { Book, CategoryFilter } from '@/types/book'

/** Chữ thường, bỏ dấu tiếng Việt — để "kinh te" vẫn khớp "Kinh tế" */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .trim()
}

export function filterBooks(books: Book[], keyword: string, category: CategoryFilter): Book[] {
  const query = normalizeText(keyword)

  return books.filter((book) => {
    if (category !== 'all' && book.category !== category) return false
    if (!query) return true
    return (
      normalizeText(book.title).includes(query) ||
      normalizeText(book.author).includes(query) ||
      normalizeText(book.id).includes(query)
    )
  })
}
