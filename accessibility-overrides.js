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
   * The existing viewport meta tag sets maximum-scale=1.0 and user-scalable=no,
   * which prevents users from pinching-to-zoom or otherwise scaling text on
   * mobile devices. This is a direct WCAG 1.4.4 violation.
   *
   * Fix: Rewrite the content attribute to allow user scaling up to 5x,
   * which satisfies WCAG 1.4.4 while retaining responsive-width behaviour.
   *
   * Selector: html > head > meta[name="viewport"]
   */
  (function fixMetaViewport() {
    var viewport = document.querySelector('html > head > meta[name="viewport"]');

    if (!viewport) {
      // No viewport meta found — create a compliant one.
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }

    var current = viewport.getAttribute('content') || '';

    // Check whether the current content already allows scaling.
    // We look for the two known blocking directives.
    var hasUserScalableNo = /user-scalable\s*=\s*no/i.test(current);
    var hasMaxScaleOne    = /maximum-scale\s*=\s*1(\.0+)?(?=[,\s]|$)/i.test(current);

    if (!hasUserScalableNo && !hasMaxScaleOne) {
      // Already compliant — nothing to do.
      return;
    }

    // Build a compliant content string:
    //   1. Start from the existing value so we preserve width= and initial-scale=.
    //   2. Remove the offending directives.
    //   3. Ensure maximum-scale=5 is present (allows generous zoom per WCAG).
    //   4. Ensure user-scalable=yes is present.
    var updated = current
      // Remove user-scalable=no (and any surrounding comma/whitespace)
      .replace(/,?\s*user-scalable\s*=\s*no/gi, '')
      // Remove maximum-scale=1 or maximum-scale=1.0 (and any surrounding comma/whitespace)
      .replace(/,?\s*maximum-scale\s*=\s*1(\.0+)?(?=[,\s]|$)/gi, '')
      // Clean up any leading/trailing commas or extra spaces left behind
      .replace(/^[,\s]+|[,\s]+$/g, '')
      .replace(/,\s*,/g, ',');

    // Append compliant directives if not already present after cleanup.
    if (!/maximum-scale/i.test(updated)) {
      updated += ', maximum-scale=5';
    }
    if (!/user-scalable/i.test(updated)) {
      updated += ', user-scalable=yes';
    }

    viewport.setAttribute('content', updated);
  })();

})();
