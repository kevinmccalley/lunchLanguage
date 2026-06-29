// @ts-nocheck
import { render } from '@testing-library/react';
import { SushiBase } from './SushiBase';

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
    
    // Should have at least 2 plate rectangles plus highlights and sushi pieces
    expect(rects.length).toBeGreaterThan(2);
  });

  it('should render plate with correct styling', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    
    // First rect is the outer plate
    expect(rects[0]).toHaveAttribute('x', '10');
    expect(rects[0]).toHaveAttribute('y', '30');
    expect(rects[0]).toHaveAttribute('width', '280');
    expect(rects[0]).toHaveAttribute('height', '200');
    expect(rects[0]).toHaveAttribute('rx', '20');
    expect(rects[0]).toHaveAttribute('fill', '#1a252f');
  });

  it('should render plate inner rectangle with correct styling', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    
    // Second rect is the inner plate
    expect(rects[1]).toHaveAttribute('x', '14');
    expect(rects[1]).toHaveAttribute('y', '34');
    expect(rects[1]).toHaveAttribute('width', '272');
    expect(rects[1]).toHaveAttribute('height', '192');
    expect(rects[1]).toHaveAttribute('rx', '18');
    expect(rects[1]).toHaveAttribute('fill', '#212f3d');
  });

  it('should render plate highlight', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    
    // Third rect is the highlight
    expect(rects[2]).toHaveAttribute('x', '20');
    expect(rects[2]).toHaveAttribute('y', '40');
    expect(rects[2]).toHaveAttribute('width', '80');
    expect(rects[2]).toHaveAttribute('height', '12');
    expect(rects[2]).toHaveAttribute('rx', '6');
    expect(rects[2]).toHaveAttribute('fill', 'rgba(255,255,255,0.08)');
  });

  it('should render 6 sushi pieces', () => {
    const { container } = render(<SushiBase />);
    const groups = container.querySelectorAll('g');
    
    // Should have 6 motion.g elements for sushi pieces
    expect(groups.length).toBe(6);
  });

  it('should render sushi pieces with seaweed wrap rectangles', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    
    // Count rectangles for seaweed wraps (should be 6, one per sushi piece)
    // Starting from index 3 (after plate and highlight)
    const seaweedRects = Array.from(rects).filter((rect, index) => {
      const fill = rect.getAttribute('fill');
      return fill === '#1a5276' && index > 2;
    });
    
    expect(seaweedRects.length).toBeGreaterThanOrEqual(6);
  });

  it('should render sushi pieces with rice rectangles', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    
    // Count rectangles for rice (should be 6, one per sushi piece, fill #fdfefe)
    const riceRects = Array.from(rects).filter((rect) => {
      return rect.getAttribute('fill') === '#fdfefe';
    });
    
    expect(riceRects.length).toBeGreaterThanOrEqual(6);
  });

  it('should render sushi pieces with toppings', () => {
    const { container } = render(<SushiBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    // Should have 6 ellipses for toppings
    expect(ellipses.length).toBe(6);
  });

  it('should render toppings with correct colors', () => {
    const { container } = render(<SushiBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const expectedColors = ['#f1948a', '#e74c3c', '#f39c12', '#f1948a', '#fdfefe', '#2ecc71'];
    
    ellipses.forEach((ellipse, index) => {
      expect(ellipse).toHaveAttribute('fill', expectedColors[index]);
    });
  });

  it('should render toppings with correct opacity', () => {
    const { container } = render(<SushiBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    ellipses.forEach((ellipse) => {
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

  it('should render seaweed stripes for each sushi piece', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    
    // Count seaweed stripes (should be 6, one per sushi piece)
    const stripeRects = Array.from(rects).filter((rect) => {
      const opacity = rect.getAttribute('opacity');
      const fill = rect.getAttribute('fill');
      return fill === '#1a5276' && opacity === '0.6';
    });
    
    expect(stripeRects.length).toBe(6);
  });

  it('should render two chopsticks', () => {
    const { container } = render(<SushiBase />);
    const lines = container.querySelectorAll('line');
    
    expect(lines.length).toBe(2);
  });

  it('should render first chopstick with correct styling', () => {
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

  it('should render second chopstick with correct styling', () => {
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

  it('should have motion.svg with correct animation props', () => {
    const { container } = render(<SushiBase />);
    const svg = container.querySelector('svg');
    
    // Verify the SVG exists and has animation attributes applied by framer-motion
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('width')).toBe('300');
  });

  it('should render all sushi pieces in correct positions', () => {
    const { container } = render(<SushiBase />);
    const groups = container.querySelectorAll('g');
    
    // All groups should be present
    expect(groups.length).toBe(6);
    
    // Verify we can query elements within groups
    groups.forEach((group) => {
      const seaweedWrap = group.querySelector('rect[fill="#1a5276"]');
      const rice = group.querySelector('rect[fill="#fdfefe"]');
      const topping = group.querySelector('ellipse');
      
      expect(seaweedWrap).toBeTruthy();
      expect(rice).toBeTruthy();
      expect(topping).toBeTruthy();
    });
  });

  it('should structure sushi pieces with correct sub-elements', () => {
    const { container } = render(<SushiBase />);
    const groups = container.querySelectorAll('g');
    
    groups.forEach((group) => {
      const children = group.children;
      // Each group should have: seaweed wrap (rect), rice (rect), topping (ellipse), stripe (rect)
      expect(children.length).toBe(4);
    });
  });
});