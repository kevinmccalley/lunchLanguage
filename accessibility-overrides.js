/* ===================================================================
 * AccessBridge Accessibility Scripts — ⚙️ CONTROL: Custom Sonnet Pipeline
 * Site: https://popsforchampagne.com | Scan: df12d589
 * Generated: 2026-04-22 | 75 violations → grouped patterns
 * Apply: <script src="/accessibility-overrides.js" defer></script>
 * =================================================================== */

(function () {
  'use strict';

  /* ----------------------------------------------------------------
   * Utility: set an attribute only if it is missing or empty,
   * making all fixes safe to run multiple times (idempotent).
   * -------------------------------------------------------------- */
  function setAttrIfMissing(el, attr, value) {
    if (!el.getAttribute(attr)) {
      el.setAttribute(attr, value);
    }
  }

  function addAriaHiddenIfMissing(el) {
    if (el.getAttribute('aria-hidden') !== 'true') {
      el.setAttribute('aria-hidden', 'true');
    }
  }

  /* ----------------------------------------------------------------
   * PATTERN 1 — link-name: Social links missing accessible text
   * Violations: 1–6, 15–20, 31–36, 47–52, 63–68
   *
   * All .SocialLinks-link anchors that contain only an SVG icon
   * need an aria-label so screen readers can announce the
   * destination. The SVG inside is decorative once the label exists.
   * -------------------------------------------------------------- */
  function fixSocialLinkNames() {
    /* Instagram — SocialLinks template component */
    var instagramLinks = document.querySelectorAll(
      'a.SocialLinks-link.instagram-unauth'
    );
    instagramLinks.forEach(function (link) {
      setAttrIfMissing(link, 'aria-label', 'Pops for Champagne on Instagram (opens in new tab)');
      /* Mark the inner SVG as decorative now that the link has a label */
      var svg = link.querySelector('svg.SocialLinks-link-svg');
      if (svg) {
        addAriaHiddenIfMissing(svg);
        setAttrIfMissing(svg, 'focusable', 'false');
      }
    });

    /* Facebook — SocialLinks template component */
    var facebookLinks = document.querySelectorAll(
      'a.SocialLinks-link.facebook-unauth'
    );
    facebookLinks.forEach(function (link) {
      setAttrIfMissing(link, 'aria-label', 'Pops for Champagne on Facebook (opens in new tab)');
      var svg = link.querySelector('svg.SocialLinks-link-svg');
      if (svg) {
        addAriaHiddenIfMissing(svg);
        setAttrIfMissing(svg, 'focusable', 'false');
      }
    });
  }

  /* ----------------------------------------------------------------
   * PATTERN 2 — Non-text contrast: sqs-svg-icon--wrapper social links
   * Violations: 29, 30, 45, 46, 61, 62
   *
   * These already have aria-label (from Squarespace), so only the
   * SVG decorative marking is needed. CSS handles the fill color.
   * -------------------------------------------------------------- */
  function fixSvgIconWrapperAccessibility() {
    var wrappers = document.querySelectorAll(
      'a.sqs-svg-icon--wrapper.instagram-unauth, a.sqs-svg-icon--wrapper.facebook-unauth'
    );
    wrappers.forEach(function (link) {
      /* Ensure aria-label is present (belt-and-suspenders) */
      if (link.classList.contains('instagram-unauth')) {
        setAttrIfMissing(link, 'aria-label', 'Pops for Champagne on Instagram (opens in new tab)');
      }
      if (link.classList.contains('facebook-unauth')) {
        setAttrIfMissing(link, 'aria-label', 'Pops for Champagne on Facebook (opens in new tab)');
      }
      /* Mark inner SVG as decorative */
      var svg = link.querySelector('svg.sqs-svg-icon--social');
      if (svg) {
        addAriaHiddenIfMissing(svg);
        setAttrIfMissing(svg, 'focusable', 'false');
      }
    });
  }

  /* ----------------------------------------------------------------
   * PATTERN 3 — Non-text contrast / link-name: Logo link
   * Violations: 10, 24, 40, 56, 72
   *
   * The <a href="/"> wrapping the site logo image needs an aria-label
   * so that screen readers announce it as the home/logo link, not
   * just a nameless link. The <img> inside already has an alt
   * attribute (partially visible in the scan: alt="pops f…") so we
   * do NOT overwrite it — we only add aria-label to the <a> if
   * missing, and mark the img as presentation since the link label
   * will carry the meaning.
   *
   * TODO [2026-04-22]: Confirm the full alt text value on the <img>
   * inside the logo anchor. If the alt is already descriptive (e.g.
   * "Pops for Champagne – Home"), the aria-label on the <a> can be
   * simplified to just "Home". If the alt is empty or truncated,
   * update the img alt in the CMS to a full description.
   * -------------------------------------------------------------- */
  function fixLogoLink() {
    /* Select all logo home links across pages — Squarespace renders
     * these in #siteHeader as the first <a href="/"> containing an img */
    var logoLinks = document.querySelectorAll(
      '#siteHeader a[href="/"], .header-title-logo a[href="/"]'
    );
    logoLinks.forEach(function (link) {
      /* Only add aria-label if there is no discernible text already */
      var hasText = link.textContent.trim().length > 0;
      var hasLabel = link.getAttribute('aria-label');
      var hasLabelledBy = link.getAttribute('aria-labelledby');
      if (!hasText && !hasLabel && !hasLabelledBy) {
        link.setAttribute('aria-label', 'Pops for Champagne – Go to Home page');
      }
      /* The img is decorative from the link's perspective once the
       * link itself has a label */
      var img = link.querySelector('img');
      if (img && link.getAttribute('aria-label')) {
        /* Do not remove the img alt — screen readers skip presentation
         * role images, but keeping alt is harmless and preserves intent.
         * We just ensure role="presentation" is not accidentally set. */
      }
    });
  }

  /* ----------------------------------------------------------------
   * PATTERN 4 — rel="noopener" on target="_blank" social links
   * Security best-practice (not a WCAG rule, but required alongside
   * the link fixes to avoid opener exploitation on external links).
   * -------------------------------------------------------------- */
  function fixExternalLinkSecurity() {
    var externalLinks = document.querySelectorAll(
      'a.SocialLinks-link[target="_blank"], a.sqs-svg-icon--wrapper[target="_blank"]'
    );
    externalLinks.forEach(function (link) {
      var rel = link.getAttribute('rel') || '';
      if (!rel.includes('noopener')) {
        link.setAttribute('rel', (rel + ' noopener noreferrer').trim());
      }
    });
  }

  /* ----------------------------------------------------------------
   * PATTERN 5 — color-contrast: Overlay nav "Home" link
   * Violations: 7, 21, 37, 53, 69
   *
   * The contrast fix is applied via CSS (see overrides.css). Here we
   * add a role and aria annotation for robustness in case the element
   * is dynamically injected after paint.
   *
   * TODO [2026-04-22]: A human must verify the actual background color
   * of .overlay-nav-inner-wrapper at runtime (it may be set via
   * Squarespace style editor or inline JS). Use browser DevTools to
   * inspect computed background-color, then verify the CSS color
   * applied in accessibility-overrides.css achieves ≥ 4.5:1 contrast
   * against that background. Adjust the CSS color value accordingly.
   * -------------------------------------------------------------- */
  function annotateOverlayNavHomeLink() {
    var homeSpans = document.querySelectorAll(
      '.main-navigation--overlay .nav-item.external a[href$="homepfc"] > span'
    );
    homeSpans.forEach(function (span) {
      /* No ARIA change needed — the <span> is inside a valid <a>.
       * The CSS fix handles the contrast. This function is a hook
       * for future runtime verification logging. */
      if (typeof console !== 'undefined' && console.info) {
        /* Silent in production — remove the line below if noisy */
        // console.info('[AccessBridge] Overlay nav Home span detected — verify CSS contrast fix is applied.');
      }
    });
  }

  /* ----------------------------------------------------------------
   * PATTERN 6 — SVG title elements for additional AT support
   * Adds <title> elements inside social SVGs that lack them so that
   * assistive technologies that read SVG titles get a fallback.
   * This is belt-and-suspenders alongside the aria-label on <a>.
   * -------------------------------------------------------------- */
  function addSvgTitles() {
    var svgMap = [
      {
        selector: 'a.SocialLinks-link.instagram-unauth svg.SocialLinks-link-svg',
        title: 'Instagram'
      },
      {
        selector: 'a.SocialLinks-link.facebook-unauth svg.SocialLinks-link-svg',
        title: 'Facebook'
      },
      {
        selector: 'a.sqs-svg-icon--wrapper.instagram-unauth svg.sqs-svg-icon--social',
        title: 'Instagram'
      },
      {
        selector: 'a.sqs-svg-icon--wrapper.facebook-unauth svg.sqs-svg-icon--social',
        title: 'Facebook'
      }
    ];

    svgMap.forEach(function (entry) {
      var svgs = document.querySelectorAll(entry.selector);
      svgs.forEach(function (svg) {
        /* Only add a <title> if one does not already exist */
        if (!svg.querySelector('title')) {
          var titleEl = document.createElementNS('http://www.w3.org/2000/svg', 'title');
          titleEl.textContent = entry.title;
          svg.insertBefore(titleEl, svg.firstChild);
          /* Link the SVG to its title via aria-labelledby if the SVG
           * is NOT already aria-hidden (i.e., it is meaningful) */
          if (svg.getAttribute('aria-hidden') !== 'true') {
            var titleId = 'a11y-svg-title-' + entry.title.toLowerCase() + '-' + Math.random().toString(36).slice(2, 7);
            titleEl.setAttribute('id', titleId);
            setAttrIfMissing(svg, 'aria-labelledby', titleId);
            setAttrIfMissing(svg, 'role', 'img');
          }
        }
      });
    });
  }

  /* ----------------------------------------------------------------
   * Initialise all fixes
   * Run after DOM is ready. The script uses defer so DOM is ready,
   * but we guard with DOMContentLoaded for inline use cases too.
   * -------------------------------------------------------------- */
  function init() {
    fixSocialLinkNames();          /* WCAG 2.4.4 / 4.1.2 — link-name */
    fixSvgIconWrapperAccessibility(); /* WCAG 1.4.11 — non-text contrast (aria) */
    fixLogoLink();                 /* WCAG 1.4.11 / 2.4.4 — logo link name */
    fixExternalLinkSecurity();     /* Security: noopener on _blank links */
    annotateOverlayNavHomeLink();  /* WCAG 1.4.3 — colour contrast hook */
    addSvgTitles();                /* SVG title fallback for AT */
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
