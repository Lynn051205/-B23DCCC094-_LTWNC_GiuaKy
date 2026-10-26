import { AlertIcon } from '@/components/icons'
import { Button } from '@/components/ui/Button'

import styles from './Feedback.module.css'

interface ErrorStateProps {
  title?: string
  message: string
  onRetry: () => void
}

export function ErrorState({ title = 'Không tải được danh sách sách', message, onRetry }: ErrorStateProps) {
  return (
    <div className={styles.error} role="alert">
      <AlertIcon className={styles.errorIcon} width={22} height={22} />
      <h2 className={styles.errorTitle}>{title}</h2>
      <p className={styles.errorMessage}>{message}</p>
      <Button variant="secondary" onClick={onRetry}>
        Thử lại
      </Button>
    </div>
  )
}
