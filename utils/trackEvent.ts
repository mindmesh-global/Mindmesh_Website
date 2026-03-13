/**
 * GA4 custom event tracking utilities.
 * Uses gtag('event', ...) - requires GoogleAnalytics from @next/third-parties/google in layout.
 * Measurement ID: G-NWRP4F6JWN
 */

function gtagEvent(
  eventName: string,
  params: Record<string, string | number | boolean>
): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

/**
 * Generic event tracking - use for custom events.
 */
export function trackEvent(
  eventName: string,
  params: Record<string, string | number | boolean> = {}
): void {
  gtagEvent(eventName, params);
}

/**
 * Track CTA button clicks (Get Started, Sign Up, Book Demo, etc.)
 */
export function trackButtonClick(buttonName: string): void {
  gtagEvent('button_click', { button_name: buttonName });
}

/**
 * Track navigation menu link clicks.
 */
export function trackNavClick(linkName: string): void {
  gtagEvent('nav_click', { link_name: linkName });
}

/**
 * Track phone or email link clicks.
 */
export function trackContactClick(contactType: 'phone' | 'email'): void {
  gtagEvent('contact_click', { contact_type: contactType });
}

/**
 * Track download button/link clicks.
 */
export function trackDownloadClick(fileName: string): void {
  gtagEvent('download_click', { file_name: fileName });
}
