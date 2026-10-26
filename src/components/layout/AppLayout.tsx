import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { CloseMenuIcon, CloudBookIcon, GridIcon, LibraryIcon, MenuIcon } from '@/components/icons'
import { fetchBooks } from '@/features/books/booksSlice'
import { ThemeToggle } from '@/features/theme/ThemeToggle'

import styles from './AppLayout.module.css'

const NAV_ITEMS = [
  { to: '/stats', label: 'Tổng quan', end: false, icon: GridIcon },
  { to: '/', label: 'Kho sách', end: true, icon: LibraryIcon },
]

const navClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink

export function AppLayout() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const shouldFail = searchParams.get('fail') === '1'
  const pageTitle = location.pathname === '/stats' ? 'Tổng quan' : 'Kho sách'

  useEffect(() => {
    dispatch(fetchBooks({ shouldFail }))
    // Chỉ tải một lần khi khởi động app.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <div className={styles.shell}>
      {isMenuOpen && (
        <button
          className={styles.scrim}
          type="button"
          aria-label="Đóng menu"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <aside className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.brandRow}>
          <NavLink to="/" className={styles.brand} aria-label="Thư viện Mây — trang chủ">
            <span className={styles.brandMark}><CloudBookIcon width={24} height={24} /></span>
            <span className={styles.brandText}>
              <strong>Thư viện Mây</strong>
              <small>QUẢN LÝ THƯ VIỆN</small>
            </span>
          </NavLink>
          <button
            type="button"
            className={styles.closeMenu}
            aria-label="Đóng menu"
            onClick={(event) => {
              event.preventDefault()
              setIsMenuOpen(false)
            }}
          >
            <CloseMenuIcon />
          </button>
        </div>

        <nav className={styles.navigation} aria-label="Điều hướng chính">
          <p className={styles.navCaption}>KHÔNG GIAN LÀM VIỆC</p>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <NavLink key={item.to} to={item.to} end={item.end} className={navClassName}>
                <Icon className={styles.navIcon} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className={styles.sidebarBottom}>
          <div className={styles.user}>
            <span className={styles.avatar} aria-hidden="true">MA</span>
            <span className={styles.userText}>
              <strong>Minh Anh</strong>
              <small>Thành viên · Khoa Công nghệ</small>
            </span>
          </div>
        </div>
      </aside>

      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <div className={styles.topbarStart}>
            <button
              type="button"
              className={styles.menuButton}
              aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <MenuIcon />
            </button>
            <div className={styles.breadcrumb}>
              <span>Thư viện</span>
              <span className={styles.breadcrumbDivider}>/</span>
              <strong>{pageTitle}</strong>
            </div>
          </div>
          <div className={styles.topbarActions}>
            <span className={styles.workspaceLabel}>Cơ sở trung tâm</span>
            <ThemeToggle />
          </div>
        </header>

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
