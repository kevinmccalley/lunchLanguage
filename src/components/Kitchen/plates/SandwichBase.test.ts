// @ts-nocheck
import { render } from '@testing-library/react';
import { SandwichBase } from '../src/components/Kitchen/plates/SandwichBase';

describe('SandwichBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<SandwichBase />);
    expect(container).toBeInTheDocument();
  });

  it('should render an SVG element', () => {
    const { container } = render(<SandwichBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have correct SVG dimensions', () => {
    const { container } = render(<SandwichBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '300');
    expect(svg).toHaveAttribute('height', '200');
  });

  it('should have correct viewBox attribute', () => {
    const { container } = render(<SandwichBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 300 200');
  });

  it('should render plate ellipse elements', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThanOrEqual(2);
  });

  it('should render bottom bread slice path', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('should render filling layer rectangles', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBe(3);
  });

  it('should have correct number of filling layer rectangles with proper dimensions', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    
    expect(rects[0]).toHaveAttribute('x', '48');
    expect(rects[0]).toHaveAttribute('y', '122');
    expect(rects[0]).toHaveAttribute('width', '204');
    expect(rects[0]).toHaveAttribute('height', '14');
    
    expect(rects[1]).toHaveAttribute('x', '50');
    expect(rects[1]).toHaveAttribute('y', '110');
    expect(rects[1]).toHaveAttribute('width', '200');
    expect(rects[1]).toHaveAttribute('height', '14');
    
    expect(rects[2]).toHaveAttribute('x', '48');
    expect(rects[2]).toHaveAttribute('y', '98');
    expect(rects[2]).toHaveAttribute('width', '204');
    expect(rects[2]).toHaveAttribute('height', '14');
  });

  it('should render bread shine ellipse', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shineEllipse = Array.from(ellipses).find((el) => {
      const cx = el.getAttribute('cx');
      const cy = el.getAttribute('cy');
      return cx === '110' && cy === '85';
    });
    expect(shineEllipse).toBeInTheDocument();
  });

  it('should have proper fill colors for plate elements', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    expect(ellipses[0]).toHaveAttribute('fill', '#e8e0d8');
    expect(ellipses[1]).toHaveAttribute('fill', '#f5ede3');
  });

  it('should have proper fill colors for filling layers', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    
    expect(rects[0]).toHaveAttribute('fill', '#27ae60');
    expect(rects[1]).toHaveAttribute('fill', '#f1c40f');
    expect(rects[2]).toHaveAttribute('fill', '#e8c589');
  });

  it('should have opacity applied to filling rectangles', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    
    rects.forEach((rect) => {
      expect(rect).toHaveAttribute('opacity', '0.8');
    });
  });

  it('should have rounded corners on filling rectangles', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    
    rects.forEach((rect) => {
      expect(rect).toHaveAttribute('rx', '4');
    });
  });

  it('should render multiple path elements for bread and crust', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(4);
  });

  it('should have stroke attribute on plate ellipse', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses[1]).toHaveAttribute('stroke', '#d5c9bc');
  });

  it('should apply motion animation to SVG', () => {
    const { container } = render(<SandwichBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveStyle('scale: 1');
  });

  it('should have bread shine with low opacity', () => {
    const { container } = render(<SandwichBase />);
    const shineEllipse = container.querySelector('ellipse[cx="110"]');
    expect(shineEllipse).toHaveAttribute('opacity', '0.18');
  });

  it('should have bread shine with correct transform', () => {
    const { container } = render(<SandwichBase />);
    const shineEllipse = container.querySelector('ellipse[cx="110"]');
    expect(shineEllipse?.getAttribute('transform')).toContain('rotate');
  });

  it('should render all SVG elements as children', () => {
    const { container } = render(<SandwichBase />);
    const svg = container.querySelector('svg');
    expect(svg?.children.length).toBeGreaterThan(0);
  });
});