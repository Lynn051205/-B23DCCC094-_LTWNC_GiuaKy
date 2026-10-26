import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { LoadingState } from '@/components/feedback/LoadingState'
import { AppLayout } from '@/components/layout/AppLayout'
import { LibraryPage } from '@/pages/LibraryPage'

const StatsPage = lazy(() => import('@/pages/StatsPage'))

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<LibraryPage />} />
        <Route
          path="stats"
          element={
            <Suspense fallback={<LoadingState />}>
              <StatsPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
