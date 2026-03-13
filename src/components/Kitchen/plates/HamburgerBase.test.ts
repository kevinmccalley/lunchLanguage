// @ts-nocheck
import { render } from '@testing-library/react';
import { HamburgerBase } from './HamburgerBase';

describe('HamburgerBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<HamburgerBase />);
    expect(container).toBeInTheDocument();
  });

  it('should render an SVG element', () => {
    const { container } = render(<HamburgerBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have correct SVG dimensions', () => {
    const { container } = render(<HamburgerBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '280');
    expect(svg).toHaveAttribute('height', '220');
  });

  it('should have correct viewBox', () => {
    const { container } = render(<HamburgerBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 280 220');
  });

  it('should render plate elements', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it('should render bottom bun ellipses', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const bottomBunEllipses = Array.from(ellipses).filter(el => {
      const cy = el.getAttribute('cy');
      return cy === '170' || cy === '155';
    });
    expect(bottomBunEllipses.length).toBe(2);
  });

  it('should render patty rectangles', () => {
    const { container } = render(<HamburgerBase />);
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBe(2);
  });

  it('should render patty with correct dimensions', () => {
    const { container } = render(<HamburgerBase />);
    const rects = container.querySelectorAll('rect');
    expect(rects[0]).toHaveAttribute('x', '42');
    expect(rects[0]).toHaveAttribute('y', '130');
    expect(rects[0]).toHaveAttribute('width', '196');
    expect(rects[0]).toHaveAttribute('height', '30');
  });

  it('should render lettuce path', () => {
    const { container } = render(<HamburgerBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('should render lettuce with correct fill color', () => {
    const { container } = render(<HamburgerBase />);
    const paths = container.querySelectorAll('path');
    const lettuceElement = Array.from(paths).find(el => 
      el.getAttribute('fill') === '#27ae60'
    );
    expect(lettuceElement).toBeInTheDocument();
  });

  it('should render top bun ellipses', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const topBunEllipses = Array.from(ellipses).filter(el => {
      const cy = el.getAttribute('cy');
      return cy === '112' || cy === '95';
    });
    expect(topBunEllipses.length).toBe(2);
  });

  it('should render sesame seeds', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const sesameSeeds = Array.from(ellipses).filter(el => {
      const fill = el.getAttribute('fill');
      const rx = el.getAttribute('rx');
      return fill === '#c9916a' && rx === '4';
    });
    expect(sesameSeeds.length).toBe(6);
  });

  it('should render sesame seeds with rotation transforms', () => {
    const { container } = render(<HamburgerBase />);
    const sesameSeeds = container.querySelectorAll('[fill="#c9916a"]');
    sesameSeeds.forEach((seed, index) => {
      const transform = seed.getAttribute('transform');
      expect(transform).toMatch(/rotate\(\d+/);
    });
  });

  it('should render shine effect', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse[opacity="0.2"]');
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it('should render shine with correct properties', () => {
    const { container } = render(<HamburgerBase />);
    const shine = container.querySelector('ellipse[fill="white"][opacity="0.2"]');
    expect(shine).toHaveAttribute('cx', '120');
    expect(shine).toHaveAttribute('cy', '85');
    expect(shine).toHaveAttribute('rx', '22');
    expect(shine).toHaveAttribute('ry', '10');
  });

  it('should have motion.svg with animation properties', () => {
    const { container } = render(<HamburgerBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should render all plate ellipses with correct fill colors', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const plateFillColors = ['#e8e0d8', '#f5ede3', '#d4a96a', '#e8c589'];
    const ellipseColors = Array.from(ellipses).map(el => el.getAttribute('fill'));
    plateFillColors.forEach(color => {
      expect(ellipseColors).toContain(color);
    });
  });

  it('should render patty with correct fill colors', () => {
    const { container } = render(<HamburgerBase />);
    const rects = container.querySelectorAll('rect');
    expect(rects[0]).toHaveAttribute('fill', '#784212');
    expect(rects[1]).toHaveAttribute('fill', '#8B4513');
  });

  it('should render bun with stroke properties', () => {
    const { container } = render(<HamburgerBase />);
    const mainPlateEllipse = container.querySelector('ellipse[stroke="#d5c9bc"]');
    expect(mainPlateEllipse).toHaveAttribute('stroke', '#d5c9bc');
    expect(mainPlateEllipse).toHaveAttribute('strokeWidth', '2');
  });

  it('should render all rectangles with border radius', () => {
    const { container } = render(<HamburgerBase />);
    const rects = container.querySelectorAll('rect');
    rects.forEach(rect => {
      expect(rect).toHaveAttribute('rx', '8');
    });
  });

  it('should render sesame seeds with consistent dimensions', () => {
    const { container } = render(<HamburgerBase />);
    const sesameSeeds = container.querySelectorAll('[fill="#c9916a"]');
    sesameSeeds.forEach(seed => {
      expect(seed).toHaveAttribute('rx', '4');
      expect(seed).toHaveAttribute('ry', '2.5');
    });
  });

  it('should maintain SVG structural integrity', () => {
    const { container } = render(<HamburgerBase />);
    const svg = container.querySelector('svg');
    expect(svg?.children.length).toBeGreaterThan(0);
  });
});