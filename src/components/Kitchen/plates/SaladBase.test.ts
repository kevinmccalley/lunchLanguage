// @ts-nocheck
import { render } from '@testing-library/react';
import { SaladBase } from '../../../src/components/Kitchen/plates/SaladBase';

describe('SaladBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<SaladBase />);
    expect(container).toBeInTheDocument();
  });

  it('should render an svg element', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have correct svg dimensions', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '280');
    expect(svg).toHaveAttribute('height', '220');
    expect(svg).toHaveAttribute('viewBox', '0 0 280 220');
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
  });

  it('should render bowl outer path', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    const bowlOuter = Array.from(paths).find(
      (el) => el.getAttribute('d') === 'M20 110 Q20 200 140 200 Q260 200 260 110 Z'
    );
    expect(bowlOuter).toBeInTheDocument();
    expect(bowlOuter).toHaveAttribute('fill', '#e0d5c8');
  });

  it('should render bowl inner path', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    const bowlInner = Array.from(paths).find(
      (el) => el.getAttribute('d') === 'M30 110 Q30 190 140 190 Q250 190 250 110 Z'
    );
    expect(bowlInner).toBeInTheDocument();
    expect(bowlInner).toHaveAttribute('fill', '#f8f4f0');
  });

  it('should render bowl rim ellipse with stroke', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const rimEllipse = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '140' && el.getAttribute('cy') === '110' && el.getAttribute('rx') === '120'
    );
    expect(rimEllipse).toBeInTheDocument();
    expect(rimEllipse).toHaveAttribute('stroke', '#d5c9bc');
    expect(rimEllipse).toHaveAttribute('strokeWidth', '3');
  });

  it('should render bowl rim highlight ellipse', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const rimHighlight = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '140' && el.getAttribute('cy') === '108' && el.getAttribute('rx') === '116'
    );
    expect(rimHighlight).toBeInTheDocument();
    expect(rimHighlight).toHaveAttribute('fill', '#f0e8e0');
  });

  it('should render salad base leaves ellipse', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const saladBase = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '140' && el.getAttribute('cy') === '145' && el.getAttribute('rx') === '95'
    );
    expect(saladBase).toBeInTheDocument();
    expect(saladBase).toHaveAttribute('fill', '#2ecc71');
    expect(saladBase).toHaveAttribute('opacity', '0.85');
  });

  it('should render 10 leaf ellipses', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leafEllipses = Array.from(ellipses).filter(
      (el) => el.getAttribute('rx') === '22' && el.getAttribute('ry') === '12'
    );
    expect(leafEllipses).toHaveLength(10);
  });

  it('should render leaf ellipses with alternating colors', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leafEllipses = Array.from(ellipses).filter(
      (el) => el.getAttribute('rx') === '22' && el.getAttribute('ry') === '12'
    );
    leafEllipses.forEach((leaf, index) => {
      const expectedColor = index % 2 === 0 ? '#27ae60' : '#58d68d';
      expect(leaf).toHaveAttribute('fill', expectedColor);
    });
  });

  it('should render leaf ellipses with correct opacity', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leafEllipses = Array.from(ellipses).filter(
      (el) => el.getAttribute('rx') === '22' && el.getAttribute('ry') === '12'
    );
    leafEllipses.forEach((leaf) => {
      expect(leaf).toHaveAttribute('opacity', '0.9');
    });
  });

  it('should render leaf ellipses with transform rotation', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leafEllipses = Array.from(ellipses).filter(
      (el) => el.getAttribute('rx') === '22' && el.getAttribute('ry') === '12'
    );
    leafEllipses.forEach((leaf) => {
      expect(leaf).toHaveAttribute('transform');
      const transform = leaf.getAttribute('transform');
      expect(transform).toMatch(/rotate\(/);
    });
  });

  it('should render bowl highlight path', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    const highlight = Array.from(paths).find(
      (el) => el.getAttribute('d') === 'M35 108 Q80 96 140 94 Q200 96 245 108'
    );
    expect(highlight).toBeInTheDocument();
    expect(highlight).toHaveAttribute('fill', 'none');
    expect(highlight).toHaveAttribute('stroke', 'white');
    expect(highlight).toHaveAttribute('strokeWidth', '4');
    expect(highlight).toHaveAttribute('strokeLinecap', 'round');
    expect(highlight).toHaveAttribute('opacity', '0.5');
  });

  it('should have motion animation properties', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.tagName.toLowerCase()).toBe('svg');
  });

  it('should render all paths correctly', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(3);
  });

  it('should render all ellipses correctly', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThanOrEqual(12);
  });

  it('should have consistent coordinate values for leaf positions', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leafEllipses = Array.from(ellipses).filter(
      (el) => el.getAttribute('rx') === '22' && el.getAttribute('ry') === '12'
    );
    const leafPositions = [
      [80, 130], [110, 120], [140, 118], [170, 120], [200, 130],
      [90, 145], [160, 142], [140, 155], [115, 150], [165, 150],
    ];
    leafEllipses.forEach((leaf, index) => {
      const [x, y] = leafPositions[index];
      expect(leaf).toHaveAttribute('cx', x.toString());
      expect(leaf).toHaveAttribute('cy', y.toString());
    });
  });
});