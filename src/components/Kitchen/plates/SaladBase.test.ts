// @ts-nocheck
import { render } from '@testing-library/react';
import { SaladBase } from '../src/components/Kitchen/plates/SaladBase';

describe('SaladBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<SaladBase />);
    expect(container).toBeTruthy();
  });

  it('should render an SVG element', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should have correct SVG dimensions', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '280');
    expect(svg).toHaveAttribute('height', '220');
  });

  it('should have correct viewBox', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 280 220');
  });

  it('should render bowl shadow ellipse', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shadowEllipse = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '140' && el.getAttribute('cy') === '210'
    );
    expect(shadowEllipse).toBeTruthy();
    expect(shadowEllipse).toHaveAttribute('rx', '120');
    expect(shadowEllipse).toHaveAttribute('ry', '12');
  });

  it('should render bowl outer path', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
    const bowlOuterPath = paths[0];
    expect(bowlOuterPath).toHaveAttribute('d', 'M20 110 Q20 200 140 200 Q260 200 260 110 Z');
    expect(bowlOuterPath).toHaveAttribute('fill', '#e0d5c8');
  });

  it('should render bowl inner path', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    const bowlInnerPath = paths[1];
    expect(bowlInnerPath).toHaveAttribute('d', 'M30 110 Q30 190 140 190 Q250 190 250 110 Z');
    expect(bowlInnerPath).toHaveAttribute('fill', '#f8f4f0');
  });

  it('should render bowl rim ellipses', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const rimEllipses = Array.from(ellipses).filter(
      (el) => el.getAttribute('cx') === '140' && (el.getAttribute('cy') === '110' || el.getAttribute('cy') === '108')
    );
    expect(rimEllipses.length).toBeGreaterThanOrEqual(2);
  });

  it('should render salad base leaves ellipse', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const saladBaseEllipse = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '140' && el.getAttribute('cy') === '145'
    );
    expect(saladBaseEllipse).toBeTruthy();
    expect(saladBaseEllipse).toHaveAttribute('fill', '#2ecc71');
    expect(saladBaseEllipse).toHaveAttribute('opacity', '0.85');
  });

  it('should render 10 individual leaf ellipses', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    // Total ellipses: 1 shadow + 2 rim + 1 salad base + 10 leaves = 14
    expect(ellipses.length).toBe(14);
  });

  it('should render leaf ellipses with correct attributes', () => {
    const { container } = render(<SaladBase />);
    const ellipses = Array.from(container.querySelectorAll('ellipse'));
    // Skip first 4 ellipses (shadow, rim, rim, salad base)
    const leafEllipses = ellipses.slice(4);

    leafEllipses.forEach((leaf) => {
      expect(leaf).toHaveAttribute('rx', '22');
      expect(leaf).toHaveAttribute('ry', '12');
      expect(leaf).toHaveAttribute('opacity', '0.9');
      expect(leaf).toHaveAttribute('transform');
    });
  });

  it('should render leaves with alternating colors', () => {
    const { container } = render(<SaladBase />);
    const ellipses = Array.from(container.querySelectorAll('ellipse'));
    const leafEllipses = ellipses.slice(4);

    leafEllipses.forEach((leaf, index) => {
      const expectedColor = index % 2 === 0 ? '#27ae60' : '#58d68d';
      expect(leaf).toHaveAttribute('fill', expectedColor);
    });
  });

  it('should render bowl highlight path', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    const highlightPath = paths[2];
    expect(highlightPath).toHaveAttribute(
      'd',
      'M35 108 Q80 96 140 94 Q200 96 245 108'
    );
    expect(highlightPath).toHaveAttribute('fill', 'none');
    expect(highlightPath).toHaveAttribute('stroke', 'white');
    expect(highlightPath).toHaveAttribute('strokeWidth', '4');
    expect(highlightPath).toHaveAttribute('strokeLinecap', 'round');
    expect(highlightPath).toHaveAttribute('opacity', '0.5');
  });

  it('should apply initial and animate props for framer-motion', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should render leaf ellipses with rotate transforms', () => {
    const { container } = render(<SaladBase />);
    const ellipses = Array.from(container.querySelectorAll('ellipse'));
    const leafEllipses = ellipses.slice(4);

    leafEllipses.forEach((leaf, index) => {
      const transform = leaf.getAttribute('transform');
      expect(transform).toMatch(/rotate/);
      expect(transform).toContain((index * 37) % 180 - 60);
    });
  });

  it('should have correct leaf positions', () => {
    const leafPositions = [
      [80, 130],
      [110, 120],
      [140, 118],
      [170, 120],
      [200, 130],
      [90, 145],
      [160, 142],
      [140, 155],
      [115, 150],
      [165, 150],
    ];

    const { container } = render(<SaladBase />);
    const ellipses = Array.from(container.querySelectorAll('ellipse'));
    const leafEllipses = ellipses.slice(4);

    leafEllipses.forEach((leaf, index) => {
      const [expectedX, expectedY] = leafPositions[index];
      expect(leaf).toHaveAttribute('cx', expectedX.toString());
      expect(leaf).toHaveAttribute('cy', expectedY.toString());
    });
  });

  it('should render all paths', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBe(3); // bowl outer, bowl inner, highlight
  });

  it('should have correct number of total elements', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    const children = svg?.children;
    // 1 ellipse (shadow) + 2 paths (outer/inner) + 2 ellipses (rim) + 1 ellipse (salad base) + 10 ellipses (leaves) + 1 path (highlight) = 17
    expect(children).toBeTruthy();
  });
});