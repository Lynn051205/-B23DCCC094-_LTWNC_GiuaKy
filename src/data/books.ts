import type { Book } from '@/types/book'

/** Dữ liệu mẫu mà API giả lập trả về */
export const BOOKS_SEED: readonly Book[] = [
  { id: 'TV-001', title: 'Lập trình TypeScript thực chiến', author: 'Nguyễn Hoàng Nam', category: 'CNTT', publishedYear: 2023, totalCopies: 5, availableCopies: 3 },
  { id: 'TV-002', title: 'Kiến trúc phần mềm hiện đại', author: 'Trần Minh Khoa', category: 'CNTT', publishedYear: 2022, totalCopies: 4, availableCopies: 2 },
  { id: 'TV-003', title: 'Thiết kế hệ thống phân tán', author: 'Lê Anh Tuấn', category: 'CNTT', publishedYear: 2021, totalCopies: 3, availableCopies: 0 },
  { id: 'TV-004', title: 'Cơ sở dữ liệu ứng dụng', author: 'Phạm Thu Hà', category: 'CNTT', publishedYear: 2024, totalCopies: 6, availableCopies: 4 },
  { id: 'TV-005', title: 'Tư duy thiết kế sản phẩm số', author: 'Vũ Thanh Bình', category: 'CNTT', publishedYear: 2023, totalCopies: 3, availableCopies: 1 },
  { id: 'TV-006', title: 'An toàn thông tin căn bản', author: 'Đỗ Quang Huy', category: 'CNTT', publishedYear: 2022, totalCopies: 4, availableCopies: 4 },
  { id: 'TV-007', title: 'Kinh tế vi mô nhập môn', author: 'Nguyễn Mai Phương', category: 'Kinh tế', publishedYear: 2021, totalCopies: 5, availableCopies: 2 },
  { id: 'TV-008', title: 'Hành vi người tiêu dùng', author: 'Trần Thùy Dương', category: 'Kinh tế', publishedYear: 2020, totalCopies: 4, availableCopies: 0 },
  { id: 'TV-009', title: 'Quản trị tài chính doanh nghiệp', author: 'Lê Quốc Bảo', category: 'Kinh tế', publishedYear: 2022, totalCopies: 2, availableCopies: 1 },
  { id: 'TV-010', title: 'Marketing căn bản', author: 'Phạm Gia Linh', category: 'Kinh tế', publishedYear: 2023, totalCopies: 3, availableCopies: 3 },
  { id: 'TV-011', title: 'Khởi nghiệp tinh gọn', author: 'Hoàng Đức Anh', category: 'Kinh tế', publishedYear: 2021, totalCopies: 4, availableCopies: 2 },
  { id: 'TV-012', title: 'Tiếng Anh học thuật B2', author: 'Nguyễn Bảo Ngọc', category: 'Ngoại ngữ', publishedYear: 2024, totalCopies: 6, availableCopies: 3 },
  { id: 'TV-013', title: 'Thực hành IELTS theo chủ đề', author: 'Trung tâm Ngoại ngữ Mộc', category: 'Ngoại ngữ', publishedYear: 2023, totalCopies: 4, availableCopies: 0 },
  { id: 'TV-014', title: 'Giao tiếp tiếng Nhật sơ cấp', author: 'Phan Khánh Vy', category: 'Ngoại ngữ', publishedYear: 2022, totalCopies: 3, availableCopies: 2 },
  { id: 'TV-015', title: 'Từ vựng tiếng Hàn ứng dụng', author: 'Đặng Minh Châu', category: 'Ngoại ngữ', publishedYear: 2021, totalCopies: 5, availableCopies: 4 },
  { id: 'TV-016', title: 'Viết email tiếng Anh chuyên nghiệp', author: 'Bùi Thanh Tâm', category: 'Ngoại ngữ', publishedYear: 2023, totalCopies: 4, availableCopies: 1 },
]
