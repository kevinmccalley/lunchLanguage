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
   * The existing <meta name="viewport"> tag includes `maximum-scale=1.0`
   * and `user-scalable=no`, which prevents users from pinching to zoom or
   * scaling text on mobile devices. This is a barrier for users with low
   * vision who rely on browser/OS zoom to read content.
   *
   * Fix: Remove `maximum-scale` and `user-scalable=no` from the viewport
   * meta tag, retaining only `width=device-width, initial-scale=1.0`.
   */
  (function fixMetaViewport() {
    var metaViewport = document.querySelector('html > head > meta[name="viewport"]');

    if (!metaViewport) {
      return; // No viewport meta tag found; nothing to fix.
    }

    var currentContent = metaViewport.getAttribute('content') || '';

    // Only modify if the problematic directives are present.
    var hasMaxScale = /maximum-scale/i.test(currentContent);
    var hasUserScalableNo = /user-scalable\s*=\s*no/i.test(currentContent);

    if (!hasMaxScale && !hasUserScalableNo) {
      return; // Already compliant; do not re-apply.
    }

    // Remove `maximum-scale=<value>` directive.
    var fixed = currentContent
      .replace(/,?\s*maximum-scale\s*=\s*[^,]*/gi, '')
      // Remove `user-scalable=no` directive.
      .replace(/,?\s*user-scalable\s*=\s*no/gi, '')
      // Clean up any leading/trailing commas or whitespace.
      .replace(/^[,\s]+|[,\s]+$/g, '')
      // Collapse multiple commas.
      .replace(/,\s*,/g, ',');

    metaViewport.setAttribute('content', fixed);

    console.info(
      '[AccessBridge] meta-viewport fix applied.\n' +
      '  Before: ' + currentContent + '\n' +
      '  After:  ' + fixed
    );
  })();

})();
