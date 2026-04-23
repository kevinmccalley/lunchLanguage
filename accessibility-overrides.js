/* ===================================================================
 * AccessBridge — Accessibility Override Scripts
 * Auto-generated coordinated fix for 1 WCAG violations.
 * Generated: 2026-04-23
 *
 * To apply, add before </body>:
 *   <script src="/accessibility-overrides.js" defer></script>
 * =================================================================== */

(function () {
  'use strict';

  /**
   * Fix: meta-viewport — WCAG 2.1 AA, Success Criterion 1.4.4 (Resize Text)
   *
   * The viewport meta tag currently contains:
   *   maximum-scale=1.0, user-scalable=no
   * Both of these attributes prevent users from zooming the page,
   * which blocks low-vision users who rely on browser zoom or
   * pinch-to-zoom to read content.
   *
   * This fix replaces the entire content attribute with a value that
   * allows unrestricted scaling while preserving the responsive layout
   * baseline (width=device-width, initial-scale=1.0).
   *
   * NOTE: The ideal permanent fix is to update the HTML source directly:
   *   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   * This JS patch is a runtime fallback until the template is updated.
   */
  function fixMetaViewport() {
    var metaViewport = document.querySelector(
      'html > head > meta[name="viewport"]'
    );

    if (!metaViewport) {
      return; // Nothing to fix if element is absent.
    }

    var currentContent = metaViewport.getAttribute('content') || '';

    // Only mutate if the problematic directives are still present.
    var needsFix =
      /user-scalable\s*=\s*no/i.test(currentContent) ||
      /maximum-scale\s*=\s*1(\.0)?(?![0-9])/i.test(currentContent);

    if (!needsFix) {
      return; // Already compliant — idempotent guard.
    }

    // Remove user-scalable=no (any variant spacing/casing).
    var fixed = currentContent
      .replace(/,?\s*user-scalable\s*=\s*no/gi, '')
      .replace(/user-scalable\s*=\s*no\s*,?/gi, '');

    // Remove maximum-scale=1 or maximum-scale=1.0
    // (only when the value is exactly 1 or 1.0, which blocks zoom).
    fixed = fixed
      .replace(/,?\s*maximum-scale\s*=\s*1(\.0)?(?![0-9])/gi, '')
      .replace(/maximum-scale\s*=\s*1(\.0)?(?![0-9])\s*,?/gi, '');

    // Clean up any leading/trailing commas or extra whitespace left behind.
    fixed = fixed.replace(/^\s*,\s*/, '').replace(/\s*,\s*$/, '').trim();

    metaViewport.setAttribute('content', fixed);

    // Confirm the fix in the console for auditing purposes.
    if (typeof console !== 'undefined' && console.info) {
      console.info(
        '[AccessBridge] meta-viewport fixed.\n' +
          '  Before: ' + currentContent + '\n' +
          '  After:  ' + fixed
      );
    }
  }

  // Run immediately — the <head> is already parsed when this
  // deferred script executes, so no DOMContentLoaded wrapper needed.
  fixMetaViewport();
})();
