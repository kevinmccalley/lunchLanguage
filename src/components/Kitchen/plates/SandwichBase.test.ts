// @ts-nocheck
import { render } from '@testing-library/react';
import { SandwichBase } from './SandwichBase';

describe('SandwichBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<SandwichBase />);
    expect(container).toBeTruthy();
  });

  it('should render an svg element', () => {
    const { container } = render(<SandwichBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should have correct svg dimensions', () => {
    const { container } = render(<SandwichBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '300');
    expect(svg).toHaveAttribute('height', '200');
    expect(svg).toHaveAttribute('viewBox', '0 0 300 200');
  });

  it('should render plate elements', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThanOrEqual(2);
  });

  it('should render bread slices as path elements', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('should render filling layers as rect elements', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThanOrEqual(3);
  });

  it('should have correct number of structural elements', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const paths = container.querySelectorAll('path');
    const rects = container.querySelectorAll('rect');
    
    expect(ellipses.length).toBe(2);
    expect(paths.length).toBeGreaterThanOrEqual(4);
    expect(rects.length).toBe(3);
  });

  it('should render plate with correct colors', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    expect(ellipses[0]).toHaveAttribute('fill', '#e8e0d8');
    expect(ellipses[1]).toHaveAttribute('fill', '#f5ede3');
  });

  it('should render filling layers with correct colors and opacity', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    
    expect(rects[0]).toHaveAttribute('fill', '#27ae60');
    expect(rects[0]).toHaveAttribute('opacity', '0.8');
    
    expect(rects[1]).toHaveAttribute('fill', '#f1c40f');
    expect(rects[1]).toHaveAttribute('opacity', '0.8');
    
    expect(rects[2]).toHaveAttribute('fill', '#e8c589');
    expect(rects[2]).toHaveAttribute('opacity', '0.8');
  });

  it('should render bread shine element', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const lastEllipse = ellipses[ellipses.length - 1];
    
    expect(lastEllipse).toHaveAttribute('fill', 'white');
    expect(lastEllipse).toHaveAttribute('opacity', '0.18');
  });

  it('should apply motion.svg wrapper', () => {
    const { container } = render(<SandwichBase />);
    const svg = container.querySelector('svg');
    
    expect(svg).toBeTruthy();
  });

  it('should render filling layers with border radius', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    
    rects.forEach((rect) => {
      expect(rect).toHaveAttribute('rx', '4');
    });
  });

  it('should render bottom bread with correct structure', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    
    expect(paths[0]).toHaveAttribute('fill', '#d4a96a');
    expect(paths[1]).toHaveAttribute('fill', '#e8c589');
  });

  it('should render top bread with correct colors', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    
    expect(paths[2]).toHaveAttribute('fill', '#d4a96a');
  });

  it('should render crust element with correct fill', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    
    const crustPath = paths[paths.length - 2];
    expect(crustPath).toHaveAttribute('fill', '#c9916a');
  });

  it('should have correct plate positioning', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    expect(ellipses[0]).toHaveAttribute('cx', '150');
    expect(ellipses[0]).toHaveAttribute('cy', '188');
  });

  it('should render all filling layer dimensions correctly', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    
    expect(rects[0]).toHaveAttribute('width', '204');
    expect(rects[0]).toHaveAttribute('height', '14');
    
    expect(rects[1]).toHaveAttribute('width', '200');
    expect(rects[1]).toHaveAttribute('height', '14');
    
    expect(rects[2]).toHaveAttribute('width', '204');
    expect(rects[2]).toHaveAttribute('height', '14');
  });
});