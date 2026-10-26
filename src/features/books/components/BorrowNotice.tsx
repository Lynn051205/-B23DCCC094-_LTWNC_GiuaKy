import { useEffect } from 'react'

import { NOTICE_AUTO_HIDE_MS } from '@/app/config'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { AlertIcon, CloseIcon } from '@/components/icons'

import { selectNotice } from '../booksSelectors'
import { noticeDismissed } from '../booksSlice'

import styles from './BorrowNotice.module.css'

/** Cảnh báo nổi ở cuối màn hình, tự ẩn sau vài giây */
export function BorrowNotice() {
  const dispatch = useAppDispatch()
  const notice = useAppSelector(selectNotice)

  useEffect(() => {
    if (!notice) return
    const timerId = setTimeout(() => dispatch(noticeDismissed()), NOTICE_AUTO_HIDE_MS)
    return () => clearTimeout(timerId)
  }, [notice, dispatch])

  if (!notice) return null

  return (
    <div className={styles.toast} role="alert">
      <AlertIcon className={styles.icon} />
      <p className={styles.message}>{notice}</p>
      <button type="button" className={styles.close} onClick={() => dispatch(noticeDismissed())} aria-label="Đóng cảnh báo">
        <CloseIcon width={16} height={16} />
      </button>
    </div>
  )
}
