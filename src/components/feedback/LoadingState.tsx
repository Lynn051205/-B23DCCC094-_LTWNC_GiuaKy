import styles from './Feedback.module.css'

const SKELETON_ROWS = ['row-a', 'row-b', 'row-c', 'row-d', 'row-e']

export function LoadingState({ label = 'Đang tải...' }: { label?: string }) {
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <p className={styles.loadingLabel}>{label}</p>
      <div className={styles.skeleton} aria-hidden="true">
        {SKELETON_ROWS.map((row) => (
          <div key={row} className={styles.skeletonRow}>
            <span className={styles.skeletonTitle} />
            <span className={styles.skeletonMeta} />
          </div>
        ))}
      </div>
    </div>
  )
}
