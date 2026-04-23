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
   * Fix: meta-viewport — WCAG 2.1 AA / 1.4.4 (Resize Text)
   *
   * The existing <meta name="viewport"> tag disables user scaling via
   * `maximum-scale=1.0` and `user-scalable=no`, which prevents users
   * from zooming text up to 200% as required by WCAG 1.4.4.
   *
   * This fix removes those restrictions while preserving the
   * responsive `width=device-width, initial-scale=1.0` behaviour.
   */
  (function fixMetaViewport() {
    var meta = document.querySelector('html > head > meta[name="viewport"]');

    if (!meta) {
      // No viewport meta found — nothing to fix.
      return;
    }

    var currentContent = meta.getAttribute('content') || '';

    // Check whether the problematic directives are present.
    var hasMaxScale   = /maximum-scale\s*=\s*[01](\.0)?/i.test(currentContent);
    var hasUserScalable = /user-scalable\s*=\s*(no|0)/i.test(currentContent);

    if (!hasMaxScale && !hasUserScalable) {
      // Already compliant — do not mutate.
      return;
    }

    // Build a compliant content string:
    //   - Keep width=device-width and initial-scale=1.0
    //   - Remove maximum-scale and user-scalable restrictions
    var newContent = currentContent
      // Remove maximum-scale=... (any value that restricts zoom)
      .replace(/,?\s*maximum-scale\s*=\s*[^,]*/gi, '')
      // Remove user-scalable=no or user-scalable=0
      .replace(/,?\s*user-scalable\s*=\s*(no|0)/gi, '')
      // Clean up any leading/trailing commas or whitespace
      .replace(/^[,\s]+|[,\s]+$/g, '')
      // Collapse multiple commas
      .replace(/,\s*,+/g, ',');

    meta.setAttribute('content', newContent);
  })();

})();
