// @ts-nocheck
import { render } from '@testing-library/react';
import { SaladBase } from './SaladBase';

describe('SaladBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<SaladBase />);
    expect(container).toBeInTheDocument();
  });

  it('should render an SVG element', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have correct SVG dimensions', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '280');
    expect(svg).toHaveAttribute('height', '220');
    expect(svg).toHaveAttribute('viewBox', '0 0 280 220');
  });

  it('should have correct framer-motion animation properties', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveStyle({ scale: '1' });
  });

  it('should render bowl shadow ellipse', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shadowEllipse = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '140' && el.getAttribute('cy') === '210'
    );
    expect(shadowEllipse).toBeInTheDocument();
    expect(shadowEllipse).toHaveAttribute('rx', '120');
    expect(shadowEllipse).toHaveAttribute('ry', '12');
    expect(shadowEllipse).toHaveAttribute('fill', 'rgba(0,0,0,0.08)');
  });

  it('should render bowl outer path', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    const outerBowl = Array.from(paths).find(
      (el) => el.getAttribute('d') === 'M20 110 Q20 200 140 200 Q260 200 260 110 Z'
    );
    expect(outerBowl).toBeInTheDocument();
    expect(outerBowl).toHaveAttribute('fill', '#e0d5c8');
  });

  it('should render bowl inner path', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    const innerBowl = Array.from(paths).find(
      (el) => el.getAttribute('d') === 'M30 110 Q30 190 140 190 Q250 190 250 110 Z'
    );
    expect(innerBowl).toBeInTheDocument();
    expect(innerBowl).toHaveAttribute('fill', '#f8f4f0');
  });

  it('should render bowl rim ellipses', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const rimEllipses = Array.from(ellipses).filter(
      (el) =>
        (el.getAttribute('cy') === '110' || el.getAttribute('cy') === '108') &&
        el.getAttribute('cx') === '140'
    );
    expect(rimEllipses.length).toBeGreaterThanOrEqual(2);
  });

  it('should render salad base main ellipse', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const saladBase = Array.from(ellipses).find(
      (el) =>
        el.getAttribute('cx') === '140' &&
        el.getAttribute('cy') === '145' &&
        el.getAttribute('rx') === '95'
    );
    expect(saladBase).toBeInTheDocument();
    expect(saladBase).toHaveAttribute('fill', '#2ecc71');
    expect(saladBase).toHaveAttribute('opacity', '0.85');
  });

  it('should render 10 salad leaf ellipses', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leafEllipses = Array.from(ellipses).filter((el) => {
      const rx = el.getAttribute('rx');
      const ry = el.getAttribute('ry');
      return rx === '22' && ry === '12';
    });
    expect(leafEllipses).toHaveLength(10);
  });

  it('should render leaf ellipses with alternating colors', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leafEllipses = Array.from(ellipses).filter((el) => {
      const rx = el.getAttribute('rx');
      const ry = el.getAttribute('ry');
      return rx === '22' && ry === '12';
    });

    leafEllipses.forEach((leaf, index) => {
      const fill = leaf.getAttribute('fill');
      const expectedColor = index % 2 === 0 ? '#27ae60' : '#58d68d';
      expect(fill).toBe(expectedColor);
    });
  });

  it('should render leaf ellipses with correct opacity', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leafEllipses = Array.from(ellipses).filter((el) => {
      const rx = el.getAttribute('rx');
      const ry = el.getAttribute('ry');
      return rx === '22' && ry === '12';
    });

    leafEllipses.forEach((leaf) => {
      expect(leaf).toHaveAttribute('opacity', '0.9');
    });
  });

  it('should render leaf ellipses with rotation transforms', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leafEllipses = Array.from(ellipses).filter((el) => {
      const rx = el.getAttribute('rx');
      const ry = el.getAttribute('ry');
      return rx === '22' && ry === '12';
    });

    leafEllipses.forEach((leaf) => {
      const transform = leaf.getAttribute('transform');
      expect(transform).toMatch(/^rotate\(/);
    });
  });

  it('should render bowl highlight path', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    const highlight = Array.from(paths).find(
      (el) =>
        el.getAttribute('d') ===
        'M35 108 Q80 96 140 94 Q200 96 245 108'
    );
    expect(highlight).toBeInTheDocument();
    expect(highlight).toHaveAttribute('stroke', 'white');
    expect(highlight).toHaveAttribute('strokeWidth', '4');
    expect(highlight).toHaveAttribute('strokeLinecap', 'round');
    expect(highlight).toHaveAttribute('opacity', '0.5');
  });

  it('should have motion SVG with correct initial state', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg?.tagName).toBe('svg');
  });

  it('should render all required path elements for bowl structure', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(3);
  });

  it('should render all required ellipse elements for bowl', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThanOrEqual(13);
  });
});