export const SEEN_KEY = 'em.preloaderSeen'
export const PRELOADER_EXIT_EVENT = 'em:preloader-exit'

export function preloaderWillShow(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return !window.sessionStorage.getItem(SEEN_KEY)
}
