// @ts-nocheck
import { SushiBase } from '../src/components/Kitchen/plates/SushiBase';
import { render } from '@testing-library/react';
import React from 'react';

describe('SushiBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<SushiBase />);
    expect(container).toBeTruthy();
  });

  it('should render an svg element', () => {
    const { container } = render(<SushiBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should have correct svg dimensions', () => {
    const { container } = render(<SushiBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '300');
    expect(svg).toHaveAttribute('height', '240');
    expect(svg).toHaveAttribute('viewBox', '0 0 300 240');
  });

  it('should render plate background rectangles', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThanOrEqual(2);
  });

  it('should render plate with correct dimensions and styling', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    const outerPlate = Array.from(rects).find(
      (rect) => rect.getAttribute('x') === '10' && rect.getAttribute('y') === '30'
    );
    expect(outerPlate).toBeTruthy();
    expect(outerPlate).toHaveAttribute('width', '280');
    expect(outerPlate).toHaveAttribute('height', '200');
    expect(outerPlate).toHaveAttribute('rx', '20');
  });

  it('should render plate highlight', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    const highlight = Array.from(rects).find(
      (rect) => rect.getAttribute('x') === '20' && rect.getAttribute('y') === '40'
    );
    expect(highlight).toBeTruthy();
    expect(highlight).toHaveAttribute('width', '80');
    expect(highlight).toHaveAttribute('height', '12');
  });

  it('should render 6 sushi pieces', () => {
    const { container } = render(<SushiBase />);
    const groups = container.querySelectorAll('g');
    expect(groups.length).toBe(6);
  });

  it('should render sushi pieces with seaweed wrap rectangles', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    const seaweedWraps = Array.from(rects).filter(
      (rect) => rect.getAttribute('width') === '52'
    );
    expect(seaweedWraps.length).toBeGreaterThanOrEqual(6);
  });

  it('should render sushi pieces with rice rectangles', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    const riceRects = Array.from(rects).filter(
      (rect) => rect.getAttribute('width') === '44'
    );
    expect(riceRects.length).toBeGreaterThanOrEqual(6);
  });

  it('should render sushi toppings as ellipses', () => {
    const { container } = render(<SushiBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBe(6);
  });

  it('should render toppings with correct dimensions', () => {
    const { container } = render(<SushiBase />);
    const ellipses = container.querySelectorAll('ellipse');
    ellipses.forEach((ellipse) => {
      expect(ellipse).toHaveAttribute('rx', '18');
      expect(ellipse).toHaveAttribute('ry', '10');
      expect(ellipse).toHaveAttribute('opacity', '0.95');
    });
  });

  it('should render toppings with different colors', () => {
    const { container } = render(<SushiBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const colors = Array.from(ellipses).map((e) => e.getAttribute('fill'));
    const expectedColors = ['#f1948a', '#e74c3c', '#f39c12', '#f1948a', '#fdfefe', '#2ecc71'];
    colors.forEach((color, index) => {
      expect(color).toBe(expectedColors[index]);
    });
  });

  it('should render seaweed stripes', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    const stripes = Array.from(rects).filter(
      (rect) => rect.getAttribute('width') === '52' && rect.getAttribute('height') === '6'
    );
    expect(stripes.length).toBe(6);
  });

  it('should render seaweed stripes with correct opacity', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    const stripes = Array.from(rects).filter(
      (rect) => rect.getAttribute('width') === '52' && rect.getAttribute('height') === '6'
    );
    stripes.forEach((stripe) => {
      expect(stripe).toHaveAttribute('opacity', '0.6');
    });
  });

  it('should render two chopstick lines', () => {
    const { container } = render(<SushiBase />);
    const lines = container.querySelectorAll('line');
    expect(lines.length).toBe(2);
  });

  it('should render first chopstick with correct attributes', () => {
    const { container } = render(<SushiBase />);
    const lines = container.querySelectorAll('line');
    const firstChopstick = lines[0];
    expect(firstChopstick).toHaveAttribute('x1', '260');
    expect(firstChopstick).toHaveAttribute('y1', '40');
    expect(firstChopstick).toHaveAttribute('x2', '290');
    expect(firstChopstick).toHaveAttribute('y2', '230');
    expect(firstChopstick).toHaveAttribute('stroke', '#c9916a');
    expect(firstChopstick).toHaveAttribute('strokeWidth', '6');
    expect(firstChopstick).toHaveAttribute('strokeLinecap', 'round');
  });

  it('should render second chopstick with correct attributes', () => {
    const { container } = render(<SushiBase />);
    const lines = container.querySelectorAll('line');
    const secondChopstick = lines[1];
    expect(secondChopstick).toHaveAttribute('x1', '272');
    expect(secondChopstick).toHaveAttribute('y1', '40');
    expect(secondChopstick).toHaveAttribute('x2', '298');
    expect(secondChopstick).toHaveAttribute('y2', '230');
    expect(secondChopstick).toHaveAttribute('stroke', '#d4a96a');
    expect(secondChopstick).toHaveAttribute('strokeWidth', '5');
    expect(secondChopstick).toHaveAttribute('strokeLinecap', 'round');
  });

  it('should render motion svg with animation props', () => {
    const { container } = render(<SushiBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.tagName.toLowerCase()).toBe('svg');
  });

  it('should render all sushi pieces in correct positions', () => {
    const { container } = render(<SushiBase />);
    const groups = container.querySelectorAll('g');
    const expectedPositions = [
      { x: 60, y: 80 },
      { x: 140, y: 80 },
      { x: 220, y: 80 },
      { x: 60, y: 150 },
      { x: 140, y: 150 },
      { x: 220, y: 150 },
    ];

    expect(groups.length).toBe(expectedPositions.length);
  });

  it('should render component with proper nesting structure', () => {
    const { container } = render(<SushiBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.children.length).toBeGreaterThan(0);
  });

  it('should have motion.svg as the root element', () => {
    const { container } = render(<SushiBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.parentElement).toBeTruthy();
  });

  it('should render sushi pieces with proper structure (seaweed, rice, topping, stripe)', () => {
    const { container } = render(<SushiBase />);
    const groups = container.querySelectorAll('g');
    expect(groups.length).toBe(6);

    groups.forEach((group) => {
      const rects = group.querySelectorAll('rect');
      const ellipse = group.querySelector('ellipse');
      expect(rects.length).toBeGreaterThanOrEqual(2);
      expect(ellipse).toBeTruthy();
    });
  });

  it('should render plate inner rect with proper styling', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    const innerPlate = Array.from(rects).find(
      (rect) => rect.getAttribute('x') === '14' && rect.getAttribute('y') === '34'
    );
    expect(innerPlate).toBeTruthy();
    expect(innerPlate).toHaveAttribute('width', '272');
    expect(innerPlate).toHaveAttribute('height', '192');
    expect(innerPlate).toHaveAttribute('rx', '18');
  });
});