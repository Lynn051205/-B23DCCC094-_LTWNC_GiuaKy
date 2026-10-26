import { BOOKS_SEED } from '@/data/books'

import { filterBooks } from './filterBooks'

const books = [...BOOKS_SEED]

describe('filterBooks', () => {
  it('tìm theo tên sách, không phân biệt hoa thường và hỗ trợ tiếng Việt không dấu', () => {
    const result = filterBooks(books, 'lap trinh typescript', 'all')
    expect(result.map((book) => book.id)).toEqual(['TV-001'])
  })

  it('tìm theo tác giả và bỏ qua dấu tiếng Việt', () => {
    expect(filterBooks(books, 'phan khanh vy', 'all').map((book) => book.id)).toEqual(['TV-014'])
  })

  it('kết hợp từ khoá với thể loại', () => {
    const result = filterBooks(books, 'typescript', 'CNTT')
    expect(result.map((book) => book.id)).toEqual(['TV-001'])
    expect(filterBooks(books, 'typescript', 'Kinh tế')).toEqual([])
  })

  it('tìm theo mã đầu sách', () => {
    expect(filterBooks(books, 'tv-016', 'all').map((book) => book.id)).toEqual(['TV-016'])
  })
})
