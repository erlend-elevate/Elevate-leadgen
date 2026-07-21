import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'

// Route-level code splitting: home ships in the main chunk (LCP),
// secondary pages load on demand.
const SampleReport = lazy(() => import('@/pages/SampleReport'))
const ThankYou = lazy(() => import('@/pages/ThankYou'))
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'))
const Terms = lazy(() => import('@/pages/Terms'))

/**
 * Routing pattern B (nested layout route) — Layout renders <Outlet/>.
 * Do NOT wrap routes in <Layout> as children; that renders a blank page.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="sample-report"
          element={
            <Suspense fallback={null}>
              <SampleReport />
            </Suspense>
          }
        />
        <Route
          path="thank-you"
          element={
            <Suspense fallback={null}>
              <ThankYou />
            </Suspense>
          }
        />
        <Route
          path="privacy-policy"
          element={
            <Suspense fallback={null}>
              <PrivacyPolicy />
            </Suspense>
          }
        />
        <Route
          path="terms"
          element={
            <Suspense fallback={null}>
              <Terms />
            </Suspense>
          }
        />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
