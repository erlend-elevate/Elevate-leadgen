/** Single source of truth for the audit Typeform. Every primary CTA links here. */
export const TYPEFORM_URL = 'https://form.typeform.com/to/Ps2ivRIT'

/**
 * Typeform reads hidden fields from the hash fragment only, so UTM parameters
 * from the current page URL are appended after '#', never as a query string.
 */
export function typeformUrl(): string {
  const params = new URLSearchParams(window.location.search)
  const utm = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
    .filter((k) => params.get(k))
    .map((k) => `${k}=${encodeURIComponent(params.get(k) as string)}`)
    .join('&')
  return utm ? `${TYPEFORM_URL}#${utm}` : TYPEFORM_URL
}
