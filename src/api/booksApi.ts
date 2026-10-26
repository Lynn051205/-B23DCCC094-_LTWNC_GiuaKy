import { API_DELAY_MS } from '@/app/config'
import { BOOKS_SEED } from '@/data/books'
import type { ApiResult } from '@/types/api'
import type { Book } from '@/types/book'

export interface FetchBooksOptions {
  /** true để giả lập API thất bại */
  shouldFail: boolean
  delayMs: number
}

const DEFAULT_OPTIONS: FetchBooksOptions = {
  shouldFail: false,
  delayMs: API_DELAY_MS,
}

export const FETCH_BOOKS_ERROR = 'Không kết nối được tới máy chủ thư viện. Vui lòng thử lại sau.'

/** API giả lập: trả danh sách sách sau một khoảng trễ, có thể ép lỗi qua `shouldFail` */
export function fetchBooksApi(options: Partial<FetchBooksOptions> = {}): Promise<ApiResult<Book[]>> {
  const { shouldFail, delayMs } = { ...DEFAULT_OPTIONS, ...options }

  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({ ok: false, error: FETCH_BOOKS_ERROR })
        return
      }
      // Trả bản sao để state trong store không dùng chung tham chiếu với dữ liệu mẫu
      resolve({ ok: true, data: BOOKS_SEED.map((book) => ({ ...book })) })
    }, delayMs)
  })
}
