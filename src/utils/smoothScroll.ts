/**
 * Non-blocking, 100% passive scroll performance manager.
 * Keeps browser compositor scrolling at full hardware refresh rate (144Hz+)
 * while disabling hover thrashing during active scroll.
 */

export function initSmoothScroll(): () => void {
  let isScrollingTimeout: number | undefined;

  const onScroll = () => {
    if (!document.documentElement.classList.contains('is-scrolling')) {
      document.documentElement.classList.add('is-scrolling');
    }
    if (isScrollingTimeout) {
      window.clearTimeout(isScrollingTimeout);
    }
    isScrollingTimeout = window.setTimeout(() => {
      document.documentElement.classList.remove('is-scrolling');
    }, 100);
  };

  // Strictly passive listener — zero blocking of compositor threads
  window.addEventListener('scroll', onScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', onScroll);
    if (isScrollingTimeout) clearTimeout(isScrollingTimeout);
    document.documentElement.classList.remove('is-scrolling');
  };
}
