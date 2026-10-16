/**
 * High-performance smooth momentum scroll & scroll-state manager
 * Eliminates stepped mouse-wheel judder and hover thrashing.
 */

export function initSmoothScroll(): () => void {
  // If user prefers reduced motion, preserve native behavior
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  let isScrollingTimeout: number | undefined;
  const setScrollingState = (scrolling: boolean) => {
    if (scrolling) {
      if (!document.documentElement.classList.contains('is-scrolling')) {
        document.documentElement.classList.add('is-scrolling');
      }
      if (isScrollingTimeout) window.clearTimeout(isScrollingTimeout);
      isScrollingTimeout = window.setTimeout(() => {
        document.documentElement.classList.remove('is-scrolling');
      }, 120);
    } else {
      document.documentElement.classList.remove('is-scrolling');
    }
  };

  // Sync scroll listener to keep is-scrolling class updated for trackpad/touch/keyboard
  const onNativeScroll = () => {
    setScrollingState(true);
  };
  window.addEventListener('scroll', onNativeScroll, { passive: true });

  // Virtual momentum wheel smoother for stepped mouse wheels (e.g. Windows notched wheels)
  let currentY = window.scrollY;
  let targetY = window.scrollY;
  let rafId: number | null = null;
  let isRunning = false;

  const update = () => {
    const diff = targetY - currentY;
    
    // Lerp interpolation (damping factor 0.14 gives snappy, responsive momentum without lag)
    currentY += diff * 0.14;

    if (Math.abs(diff) < 0.5) {
      currentY = targetY;
      window.scrollTo(0, currentY);
      isRunning = false;
      rafId = null;
      return;
    }

    window.scrollTo(0, currentY);
    rafId = requestAnimationFrame(update);
  };

  const onWheel = (e: WheelEvent) => {
    // Never hijack if ctrl is pressed (pinch zoom) or inside horizontal scroll container
    if (e.ctrlKey) return;

    // Detect if wheel event originates from an element with independent vertical scrolling
    let target = e.target as HTMLElement | null;
    let hasInnerScroll = false;
    while (target && target !== document.body && target !== document.documentElement) {
      const style = window.getComputedStyle(target);
      if (
        (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
        target.scrollHeight > target.clientHeight
      ) {
        hasInnerScroll = true;
        break;
      }
      target = target.parentElement;
    }
    if (hasInnerScroll) return;

    // Trackpad gestures typically emit smaller, non-integer deltaY with deltaMode 0
    // We only interpolate discrete stepped wheel events (typically deltaY >= 50 or deltaMode !== 0)
    // while allowing native high-precision trackpads to remain fluid 1:1
    const isSteppedWheel = e.deltaMode !== 0 || Math.abs(e.deltaY) >= 30;

    setScrollingState(true);

    if (isSteppedWheel) {
      e.preventDefault();

      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      
      // If user starts scrolling while still running, sync current position
      if (!isRunning) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }

      // Add wheel delta with clamped bounds
      targetY = Math.max(0, Math.min(maxScroll, targetY + e.deltaY));

      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(update);
      }
    }
  };

  window.addEventListener('wheel', onWheel, { passive: false });

  return () => {
    window.removeEventListener('scroll', onNativeScroll);
    window.removeEventListener('wheel', onWheel);
    if (rafId) cancelAnimationFrame(rafId);
    if (isScrollingTimeout) clearTimeout(isScrollingTimeout);
    document.documentElement.classList.remove('is-scrolling');
  };
}
