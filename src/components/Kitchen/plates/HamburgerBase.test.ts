// @ts-nocheck
import { render } from '@testing-library/react';
import { HamburgerBase } from './HamburgerBase';

describe('HamburgerBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<HamburgerBase />);
    expect(container).toBeTruthy();
  });

  it('should render an SVG element', () => {
    const { container } = render(<HamburgerBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should have correct SVG dimensions', () => {
    const { container } = render(<HamburgerBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '280');
    expect(svg).toHaveAttribute('height', '220');
    expect(svg).toHaveAttribute('viewBox', '0 0 280 220');
  });

  it('should render plate ellipses', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThan(0);
    
    // Check for plate ellipses (first two should be the plate)
    const firstPlateEllipse = ellipses[0];
    expect(firstPlateEllipse).toHaveAttribute('cx', '140');
    expect(firstPlateEllipse).toHaveAttribute('cy', '195');
    expect(firstPlateEllipse).toHaveAttribute('fill', '#e8e0d8');
  });

  it('should render bottom bun ellipses', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    // Bottom bun should be among the ellipses
    const bottomBunEllipses = Array.from(ellipses).filter(el => {
      const cy = el.getAttribute('cy');
      return cy === '170' || cy === '155';
    });
    expect(bottomBunEllipses.length).toBeGreaterThan(0);
  });

  it('should render patty rectangles', () => {
    const { container } = render(<HamburgerBase />);
    const rects = container.querySelectorAll('rect');
    
    // Should have at least 2 patty rectangles
    const pattyRects = Array.from(rects).filter(rect => {
      const x = rect.getAttribute('x');
      return x === '42';
    });
    expect(pattyRects.length).toBeGreaterThanOrEqual(2);
  });

  it('should render patty with correct dimensions', () => {
    const { container } = render(<HamburgerBase />);
    const rects = container.querySelectorAll('rect');
    
    const pattyRects = Array.from(rects).filter(rect => {
      const x = rect.getAttribute('x');
      return x === '42';
    });
    
    expect(pattyRects[0]).toHaveAttribute('width', '196');
    expect(pattyRects[0]).toHaveAttribute('height', '30');
    expect(pattyRects[0]).toHaveAttribute('fill', '#784212');
  });

  it('should render lettuce peek path', () => {
    const { container } = render(<HamburgerBase />);
    const paths = container.querySelectorAll('path');
    
    expect(paths.length).toBeGreaterThan(0);
    const lettucePath = paths[0];
    expect(lettucePath).toHaveAttribute('fill', '#27ae60');
    expect(lettucePath.getAttribute('d')).toBeTruthy();
  });

  it('should render top bun ellipses', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    // Top bun should be among the ellipses
    const topBunEllipses = Array.from(ellipses).filter(el => {
      const cy = el.getAttribute('cy');
      return cy === '112' || cy === '95';
    });
    expect(topBunEllipses.length).toBeGreaterThan(0);
  });

  it('should render sesame seeds', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    // Should have ellipses for sesame seeds (6 seeds + other ellipses)
    expect(ellipses.length).toBeGreaterThanOrEqual(6);
  });

  it('should render sesame seeds with correct fill color', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    // Check for sesame seed color
    const sesameSeedEllipses = Array.from(ellipses).filter(el => {
      const fill = el.getAttribute('fill');
      return fill === '#c9916a';
    });
    
    expect(sesameSeedEllipses.length).toBeGreaterThan(0);
  });

  it('should render sesame seeds with rotation transforms', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    const sesameSeedEllipses = Array.from(ellipses).filter(el => {
      const fill = el.getAttribute('fill');
      return fill === '#c9916a';
    });
    
    sesameSeedEllipses.forEach(seed => {
      const transform = seed.getAttribute('transform');
      expect(transform).toMatch(/rotate/);
    });
  });

  it('should render shine ellipse', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    const shineEllipse = Array.from(ellipses).find(el => {
      const cx = el.getAttribute('cx');
      const opacity = el.getAttribute('opacity');
      return cx === '120' && opacity === '0.2';
    });
    
    expect(shineEllipse).toBeTruthy();
  });

  it('should have motion animation attributes', () => {
    const { container } = render(<HamburgerBase />);
    const svg = container.querySelector('svg');
    
    // motion.svg should exist in the rendered output
    expect(svg).toBeTruthy();
  });

  it('should render all hamburger components together', () => {
    const { container } = render(<HamburgerBase />);
    
    const ellipses = container.querySelectorAll('ellipse');
    const rects = container.querySelectorAll('rect');
    const paths = container.querySelectorAll('path');
    
    // Should have multiple components
    expect(ellipses.length).toBeGreaterThan(0);
    expect(rects.length).toBeGreaterThan(0);
    expect(paths.length).toBeGreaterThan(0);
  });

  it('should render with proper color scheme', () => {
    const { container } = render(<HamburgerBase />);
    
    // Check for expected colors in the SVG
    const svg = container.querySelector('svg');
    const svgContent = svg?.outerHTML || '';
    
    expect(svgContent).toContain('#e8e0d8'); // Plate color
    expect(svgContent).toContain('#d4a96a'); // Bun color
    expect(svgContent).toContain('#784212'); // Patty color
    expect(svgContent).toContain('#27ae60'); // Lettuce color
  });

  it('should have proper structure with nested children', () => {
    const { container } = render(<HamburgerBase />);
    const svg = container.querySelector('svg');
    
    // SVG should have children
    expect(svg?.children.length).toBeGreaterThan(0);
  });
});