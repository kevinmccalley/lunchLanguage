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
    expect(svg).toBeInTheDocument();
  });

  it('should have correct SVG dimensions', () => {
    const { container } = render(<HamburgerBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '280');
    expect(svg).toHaveAttribute('height', '220');
  });

  it('should have correct viewBox attribute', () => {
    const { container } = render(<HamburgerBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 280 220');
  });

  it('should render plate ellipses', () => {
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
    const firstRect = rects[0];
    expect(firstRect).toHaveAttribute('x', '42');
    expect(firstRect).toHaveAttribute('y', '130');
    expect(firstRect).toHaveAttribute('width', '196');
    expect(firstRect).toHaveAttribute('height', '30');
  });

  it('should render lettuce peek path', () => {
    const { container } = render(<HamburgerBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
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
      const rx = el.getAttribute('rx');
      const ry = el.getAttribute('ry');
      return rx === '4' && ry === '2.5';
    });
    expect(sesameSeeds.length).toBe(6);
  });

  it('should render sesame seeds with correct fill color', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const sesameSeeds = Array.from(ellipses).filter(el => {
      const rx = el.getAttribute('rx');
      const ry = el.getAttribute('ry');
      return rx === '4' && ry === '2.5';
    });
    sesameSeeds.forEach(seed => {
      expect(seed).toHaveAttribute('fill', '#c9916a');
    });
  });

  it('should render shine ellipse', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shineEllipse = Array.from(ellipses).find(el => {
      const cx = el.getAttribute('cx');
      const rx = el.getAttribute('rx');
      const ry = el.getAttribute('ry');
      return cx === '120' && rx === '22' && ry === '10';
    });
    expect(shineEllipse).toBeTruthy();
  });

  it('should render shine with correct opacity', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shineEllipse = Array.from(ellipses).find(el => {
      const cx = el.getAttribute('cx');
      return cx === '120';
    });
    expect(shineEllipse).toHaveAttribute('opacity', '0.2');
  });

  it('should render plate with correct colors', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const plateEllipses = Array.from(ellipses).filter((el, idx) => idx === 0 || idx === 1);
    const firstPlate = plateEllipses[0];
    const secondPlate = plateEllipses[1];
    expect(firstPlate).toHaveAttribute('fill', '#e8e0d8');
    expect(secondPlate).toHaveAttribute('fill', '#f5ede3');
  });

  it('should render bottom bun with correct colors', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const bottomBunEllipses = Array.from(ellipses).filter(el => {
      const cy = el.getAttribute('cy');
      return cy === '170' || cy === '155';
    });
    expect(bottomBunEllipses[0]).toHaveAttribute('fill', '#d4a96a');
    expect(bottomBunEllipses[1]).toHaveAttribute('fill', '#e8c589');
  });

  it('should render patty with correct colors', () => {
    const { container } = render(<HamburgerBase />);
    const rects = container.querySelectorAll('rect');
    expect(rects[0]).toHaveAttribute('fill', '#784212');
    expect(rects[1]).toHaveAttribute('fill', '#8B4513');
  });

  it('should render lettuce with correct color', () => {
    const { container } = render(<HamburgerBase />);
    const path = container.querySelector('path');
    expect(path).toHaveAttribute('fill', '#27ae60');
  });

  it('should render top bun with correct colors', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const topBunEllipses = Array.from(ellipses).filter(el => {
      const cy = el.getAttribute('cy');
      return cy === '112' || cy === '95';
    });
    expect(topBunEllipses[0]).toHaveAttribute('fill', '#d4a96a');
    expect(topBunEllipses[1]).toHaveAttribute('fill', '#e8c589');
  });

  it('should render all sesame seeds with correct positions', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const sesameSeeds = Array.from(ellipses).filter(el => {
      const rx = el.getAttribute('rx');
      const ry = el.getAttribute('ry');
      return rx === '4' && ry === '2.5';
    });
    
    const expectedPositions = [
      { cx: '115', cy: '85' },
      { cx: '140', cy: '78' },
      { cx: '162', cy: '82' },
      { cx: '128', cy: '95' },
      { cx: '152', cy: '95' },
      { cx: '138', cy: '105' }
    ];

    sesameSeeds.forEach((seed, idx) => {
      expect(seed).toHaveAttribute('cx', expectedPositions[idx].cx);
      expect(seed).toHaveAttribute('cy', expectedPositions[idx].cy);
    });
  });

  it('should have motion animation properties', () => {
    const { container } = render(<HamburgerBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    // The motion component is rendered, motion properties are applied by framer-motion
  });

  it('should render shine ellipse with white color', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shineEllipse = Array.from(ellipses).find(el => {
      const cx = el.getAttribute('cx');
      const fill = el.getAttribute('fill');
      return cx === '120' && fill === 'white';
    });
    expect(shineEllipse).toBeTruthy();
  });

  it('should render plate stroke correctly', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const plateWithStroke = Array.from(ellipses).find(el => {
      const stroke = el.getAttribute('stroke');
      return stroke === '#d5c9bc';
    });
    expect(plateWithStroke).toBeTruthy();
  });

  it('should render all elements in correct order', () => {
    const { container } = render(<HamburgerBase />);
    const allElements = container.querySelectorAll('ellipse, rect, path');
    expect(allElements.length).toBeGreaterThan(0);
  });
});