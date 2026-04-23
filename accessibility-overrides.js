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
   * Fix: meta-viewport — WCAG 1.4.4 (Resize Text, Level AA)
   *
   * The viewport meta tag currently contains:
   *   maximum-scale=1.0, user-scalable=no
   *
   * These directives prevent users from pinching-to-zoom or otherwise
   * scaling text in the browser, which is a WCAG 1.4.4 failure. The fix
   * removes both restrictive directives while preserving the intended
   * responsive behaviour (width=device-width, initial-scale=1.0).
   *
   * Selector: html > head > meta[name="viewport"]
   */
  (function fixMetaViewport() {
    var metaViewport = document.querySelector(
      'html > head > meta[name="viewport"]'
    );

    if (!metaViewport) {
      return; // Element not found; nothing to do.
    }

    var currentContent = metaViewport.getAttribute('content') || '';

    // Only mutate if the problematic directives are still present,
    // making this safe to run multiple times (idempotent).
    var needsFix =
      /maximum-scale\s*=\s*1(\.0)?/i.test(currentContent) ||
      /user-scalable\s*=\s*no/i.test(currentContent);

    if (!needsFix) {
      return;
    }

    // Remove maximum-scale directive (any value that restricts zoom).
    var fixed = currentContent
      .replace(/,?\s*maximum-scale\s*=\s*[^,]*/gi, '')
      // Remove user-scalable=no directive.
      .replace(/,?\s*user-scalable\s*=\s*no/gi, '')
      // Clean up any leading/trailing commas or whitespace left behind.
      .replace(/^[,\s]+|[,\s]+$/g, '')
      // Collapse multiple consecutive commas/spaces into a single ', '.
      .replace(/\s*,\s*,+\s*/g, ', ');

    metaViewport.setAttribute('content', fixed);

    // Verify and log result for QA visibility in the console.
    if (typeof console !== 'undefined' && console.info) {
      console.info(
        '[AccessBridge] meta-viewport updated.\n' +
          '  Before: ' + currentContent + '\n' +
          '  After : ' + fixed
      );
    }
  })();

})();
