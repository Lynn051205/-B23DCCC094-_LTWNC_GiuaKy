import type { BookCategory } from '@/types/book'

import tones from '@/styles/category.module.css'

const TONE_CLASS: Record<BookCategory, string> = {
  CNTT: tones.it,
  'Kinh tế': tones.econ,
  'Ngoại ngữ': tones.lang,
}

/** Class gán biến CSS --tone theo màu của thể loại */
export function categoryToneClass(category: BookCategory): string {
  return TONE_CLASS[category]
}
