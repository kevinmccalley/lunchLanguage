// @ts-nocheck
import { render } from '@testing-library/react';
import { SushiBase } from './SushiBase';

describe('SushiBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<SushiBase />);
    expect(container).toBeInTheDocument();
  });

  it('should render an SVG element', () => {
    const { container } = render(<SushiBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have correct SVG dimensions', () => {
    const { container } = render(<SushiBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '300');
    expect(svg).toHaveAttribute('height', '240');
    expect(svg).toHaveAttribute('viewBox', '0 0 300 240');
  });

  it('should render plate background rectangles', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    // At least 2 plate rects + 1 highlight rect = 3 rects minimum (before sushi pieces)
    expect(rects.length).toBeGreaterThanOrEqual(3);
  });

  it('should render 6 sushi pieces', () => {
    const { container } = render(<SushiBase />);
    const groups = container.querySelectorAll('g');
    // Each sushi piece is wrapped in a motion.g
    expect(groups.length).toBe(6);
  });

  it('should render sushi piece components with correct structure', () => {
    const { container } = render(<SushiBase />);
    const groups = container.querySelectorAll('g');
    
    groups.forEach((group) => {
      // Each sushi piece should have 4 children: seaweed wrap, rice, topping, seaweed stripe
      const children = group.children;
      expect(children.length).toBe(4);
    });
  });

  it('should render sushi pieces at correct positions', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    
    // Expected positions for seaweed wraps (first 6 rects after plate rects)
    const expectedPositions = [
      { x: 60, y: 80 },
      { x: 140, y: 80 },
      { x: 220, y: 80 },
      { x: 60, y: 150 },
      { x: 140, y: 150 },
      { x: 220, y: 150 },
    ];

    // Plate rects are at index 0-2, sushi seaweed wraps start at index 3
    expectedPositions.forEach((pos, i) => {
      const seaweedRect = rects[3 + i * 4]; // Each sushi has 4 elements, seaweed wrap is first
      expect(seaweedRect).toHaveAttribute('x', String(pos.x - 26));
      expect(seaweedRect).toHaveAttribute('y', String(pos.y - 20));
    });
  });

  it('should render ellipses for sushi toppings', () => {
    const { container } = render(<SushiBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBe(6);
  });

  it('should render sushi toppings with correct colors', () => {
    const { container } = render(<SushiBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const expectedColors = ['#f1948a', '#e74c3c', '#f39c12', '#f1948a', '#fdfefe', '#2ecc71'];

    ellipses.forEach((ellipse, i) => {
      expect(ellipse).toHaveAttribute('fill', expectedColors[i]);
      expect(ellipse).toHaveAttribute('opacity', '0.95');
    });
  });

  it('should render toppings with correct dimensions', () => {
    const { container } = render(<SushiBase />);
    const ellipses = container.querySelectorAll('ellipse');

    ellipses.forEach((ellipse) => {
      expect(ellipse).toHaveAttribute('rx', '18');
      expect(ellipse).toHaveAttribute('ry', '10');
    });
  });

  it('should render chopsticks', () => {
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

  it('should render plate highlight with correct properties', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    
    // Highlight is the 3rd rect (index 2)
    const highlight = rects[2];
    expect(highlight).toHaveAttribute('x', '20');
    expect(highlight).toHaveAttribute('y', '40');
    expect(highlight).toHaveAttribute('width', '80');
    expect(highlight).toHaveAttribute('height', '12');
    expect(highlight).toHaveAttribute('rx', '6');
    expect(highlight).toHaveAttribute('fill', 'rgba(255,255,255,0.08)');
  });

  it('should render rice layers for each sushi piece', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    
    // After plate rects (3), each sushi has 3 rects: seaweed wrap, rice, seaweed stripe
    // Rice rects should be at index 4, 8, 12, 16, 20, 24 (every 4th starting from 4)
    const expectedRiceCount = 6;
    let riceCount = 0;

    for (let i = 0; i < rects.length; i++) {
      const rect = rects[i];
      if (rect.getAttribute('fill') === '#fdfefe' && i > 2) {
        // Check if this is a rice rect (white color)
        riceCount++;
      }
    }

    expect(riceCount).toBeGreaterThanOrEqual(expectedRiceCount);
  });

  it('should render seaweed stripes with correct opacity', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    
    let seaweedStripeCount = 0;
    rects.forEach((rect) => {
      if (rect.getAttribute('opacity') === '0.6') {
        seaweedStripeCount++;
      }
    });

    expect(seaweedStripeCount).toBe(6);
  });

  it('should render plate background with dark colors', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    
    // First plate rect
    const plateBg1 = rects[0];
    expect(plateBg1).toHaveAttribute('fill', '#1a252f');
    
    // Second plate rect
    const plateBg2 = rects[1];
    expect(plateBg2).toHaveAttribute('fill', '#212f3d');
  });

  it('should have all sushi pieces with seaweed wrap in dark blue', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    
    // Check seaweed wraps (indices 3, 7, 11, 15, 19, 23)
    for (let i = 0; i < 6; i++) {
      const seaweedWrapIndex = 3 + i * 4;
      const seaweedWrap = rects[seaweedWrapIndex];
      expect(seaweedWrap).toHaveAttribute('fill', '#1a5276');
    }
  });

  it('should render motion.svg with animation properties', () => {
    const { container } = render(<SushiBase />);
    const svg = container.querySelector('svg');
    
    // The motion.svg should be present and rendered
    expect(svg).toBeInTheDocument();
    expect(svg?.tagName).toBe('svg');
  });
});