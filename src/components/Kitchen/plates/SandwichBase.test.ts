// @ts-nocheck
import React from 'react';
import { render } from '@testing-library/react';
import { SandwichBase } from './SandwichBase';

describe('SandwichBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<SandwichBase />);
    expect(container).toBeTruthy();
  });

  it('should render an SVG element', () => {
    const { container } = render(<SandwichBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should have correct SVG dimensions', () => {
    const { container } = render(<SandwichBase />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('300');
    expect(svg?.getAttribute('height')).toBe('200');
  });

  it('should have correct viewBox attribute', () => {
    const { container } = render(<SandwichBase />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('viewBox')).toBe('0 0 300 200');
  });

  it('should render plate ellipses', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThanOrEqual(2);
  });

  it('should render bottom bread slice with correct path', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('should render filling layers with rectangles', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBe(3);
  });

  it('should have correct fill color for first filling layer (green)', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    expect(rects[0]?.getAttribute('fill')).toBe('#27ae60');
  });

  it('should have correct fill color for second filling layer (yellow)', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    expect(rects[1]?.getAttribute('fill')).toBe('#f1c40f');
  });

  it('should have correct fill color for third filling layer (tan)', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    expect(rects[2]?.getAttribute('fill')).toBe('#e8c589');
  });

  it('should render filling layers with opacity', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    rects.forEach((rect) => {
      expect(rect.getAttribute('opacity')).toBe('0.8');
    });
  });

  it('should render all rectangles with rounded corners', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    rects.forEach((rect) => {
      expect(rect.getAttribute('rx')).toBe('4');
    });
  });

  it('should render bread shine ellipse', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shineEllipse = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '110' && el.getAttribute('cy') === '85'
    );
    expect(shineEllipse).toBeTruthy();
  });

  it('should have bread shine with correct opacity', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shineEllipse = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '110' && el.getAttribute('cy') === '85'
    );
    expect(shineEllipse?.getAttribute('opacity')).toBe('0.18');
  });

  it('should have bread shine with white fill', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shineEllipse = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '110' && el.getAttribute('cy') === '85'
    );
    expect(shineEllipse?.getAttribute('fill')).toBe('white');
  });

  it('should render plate with correct fill colors', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const firstPlateEllipse = ellipses[0];
    const secondPlateEllipse = ellipses[1];
    expect(firstPlateEllipse?.getAttribute('fill')).toBe('#e8e0d8');
    expect(secondPlateEllipse?.getAttribute('fill')).toBe('#f5ede3');
  });

  it('should have motion.svg with correct animation initial state', () => {
    const { container } = render(<SandwichBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should render multiple paths for bread and crust', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(5);
  });

  it('should have plate ellipse with correct stroke', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const secondEllipse = ellipses[1];
    expect(secondEllipse?.getAttribute('stroke')).toBe('#d5c9bc');
    expect(secondEllipse?.getAttribute('strokeWidth')).toBe('1.5');
  });

  it('should render all filling layers with correct dimensions', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    expect(rects[0]?.getAttribute('width')).toBe('204');
    expect(rects[1]?.getAttribute('width')).toBe('200');
    expect(rects[2]?.getAttribute('width')).toBe('204');
  });

  it('should render all filling layers with correct height', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    rects.forEach((rect) => {
      expect(rect.getAttribute('height')).toBe('14');
    });
  });

  it('should render bottom bread with correct fill', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    const bottomBreadPath = paths[0];
    expect(bottomBreadPath?.getAttribute('fill')).toBe('#d4a96a');
  });

  it('should render top bread slice with tan color', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    const topBreadPath = Array.from(paths).find(
      (path) => path.getAttribute('d')?.includes('M40 100')
    );
    expect(topBreadPath?.getAttribute('fill')).toBe('#d4a96a');
  });

  it('should render crust with darker brown color', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    const crustPath = Array.from(paths).find(
      (path) => path.getAttribute('fill') === '#c9916a'
    );
    expect(crustPath).toBeTruthy();
  });

  it('should render bread shine ellipse with rotation transform', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shineEllipse = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '110'
    );
    expect(shineEllipse?.getAttribute('transform')).toContain('rotate');
  });

  it('should have correct aspect ratio for plate ellipses', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const firstPlate = ellipses[0];
    const rx = parseFloat(firstPlate?.getAttribute('rx') || '0');
    const ry = parseFloat(firstPlate?.getAttribute('ry') || '0');
    expect(rx).toBeGreaterThan(ry);
  });

  it('should render stroke for top bread shine with correct properties', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    const shineStroke = Array.from(paths).find(
      (path) => path.getAttribute('stroke') === '#e8c589'
    );
    expect(shineStroke?.getAttribute('strokeWidth')).toBe('8');
    expect(shineStroke?.getAttribute('strokeLinecap')).toBe('round');
  });
});
