// @ts-nocheck
import { render } from '@testing-library/react';
import { SandwichBase } from '../src/components/Kitchen/plates/SandwichBase';

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
    expect(svg).toHaveAttribute('width', '300');
    expect(svg).toHaveAttribute('height', '200');
  });

  it('should have correct viewBox', () => {
    const { container } = render(<SandwichBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 300 200');
  });

  it('should render plate ellipses', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThanOrEqual(3);
  });

  it('should render plate with correct fill color', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses[0]).toHaveAttribute('fill', '#e8e0d8');
  });

  it('should render bottom bread slice path', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('should render bottom bread with correct fill', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    const bottomBread = paths[0];
    expect(bottomBread).toHaveAttribute('fill', '#d4a96a');
  });

  it('should render filling layer rectangles', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThanOrEqual(3);
  });

  it('should render green filling layer with correct color', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    const greenFilling = rects[0];
    expect(greenFilling).toHaveAttribute('fill', '#27ae60');
  });

  it('should render yellow filling layer with correct color', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    const yellowFilling = rects[1];
    expect(yellowFilling).toHaveAttribute('fill', '#f1c40f');
  });

  it('should render tan filling layer with correct color', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    const tanFilling = rects[2];
    expect(tanFilling).toHaveAttribute('fill', '#e8c589');
  });

  it('should render all rectangles with rounded corners', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    rects.forEach((rect) => {
      expect(rect).toHaveAttribute('rx', '4');
    });
  });

  it('should render filling layers with opacity', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    rects.forEach((rect) => {
      expect(rect).toHaveAttribute('opacity', '0.8');
    });
  });

  it('should render top bread slice', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(4);
  });

  it('should render crust path', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    const crustPath = Array.from(paths).find(
      (p) => p.getAttribute('fill') === '#c9916a'
    );
    expect(crustPath).toBeTruthy();
  });

  it('should render bread shine ellipse', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThanOrEqual(3);
  });

  it('should render shine with low opacity', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shineEllipse = ellipses[ellipses.length - 1];
    expect(shineEllipse).toHaveAttribute('opacity', '0.18');
  });

  it('should apply animation initial state', () => {
    const { container } = render(<SandwichBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveStyle('transform');
  });

  it('should render all paths with proper structure', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    paths.forEach((path) => {
      expect(path).toHaveAttribute('d');
    });
  });

  it('should render stroke on plate top ellipse', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses[1]).toHaveAttribute('stroke', '#d5c9bc');
    expect(ellipses[1]).toHaveAttribute('strokeWidth', '1.5');
  });

  it('should render crust with correct dimensions', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    const crustPath = Array.from(paths).find(
      (p) => p.getAttribute('fill') === '#c9916a'
    );
    expect(crustPath).toHaveAttribute('d');
    expect(crustPath?.getAttribute('d')).toContain('M42 100');
  });

  it('should render bread shine with rotation transform', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shineEllipse = ellipses[ellipses.length - 1];
    const transform = shineEllipse.getAttribute('transform');
    expect(transform).toContain('rotate');
  });

  it('should have correct number of child elements', () => {
    const { container } = render(<SandwichBase />);
    const svg = container.querySelector('svg');
    expect(svg?.children.length).toBeGreaterThan(0);
  });

  it('should be a valid React component', () => {
    expect(() => render(<SandwichBase />)).not.toThrow();
  });
});