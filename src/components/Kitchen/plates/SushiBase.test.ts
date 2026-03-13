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
    // At least 3 rects for plate: outer, inner, and highlight
    expect(rects.length).toBeGreaterThanOrEqual(3);
  });

  it('should render 6 sushi pieces', () => {
    const { container } = render(<SushiBase />);
    const motionGroups = container.querySelectorAll('motion.g');
    expect(motionGroups.length).toBe(6);
  });

  it('should render sushi pieces with correct structure', () => {
    const { container } = render(<SushiBase />);
    const motionGroups = container.querySelectorAll('motion.g');
    
    motionGroups.forEach((group) => {
      const rects = group.querySelectorAll('rect');
      const ellipses = group.querySelectorAll('ellipse');
      
      // Each sushi piece should have 3 rectangles (seaweed wrap, rice, seaweed stripe)
      expect(rects.length).toBe(3);
      // Each sushi piece should have 1 ellipse (topping)
      expect(ellipses.length).toBe(1);
    });
  });

  it('should render chopsticks', () => {
    const { container } = render(<SushiBase />);
    const lines = container.querySelectorAll('line');
    // Should have 2 lines for chopsticks
    expect(lines.length).toBe(2);
  });

  it('should have correct chopstick properties', () => {
    const { container } = render(<SushiBase />);
    const lines = container.querySelectorAll('line');
    
    const line1 = lines[0];
    const line2 = lines[1];
    
    expect(line1).toHaveAttribute('x1', '260');
    expect(line1).toHaveAttribute('y1', '40');
    expect(line1).toHaveAttribute('x2', '290');
    expect(line1).toHaveAttribute('y2', '230');
    expect(line1).toHaveAttribute('stroke', '#c9916a');
    expect(line1).toHaveAttribute('strokeWidth', '6');
    expect(line1).toHaveAttribute('strokeLinecap', 'round');
    
    expect(line2).toHaveAttribute('x1', '272');
    expect(line2).toHaveAttribute('y1', '40');
    expect(line2).toHaveAttribute('x2', '298');
    expect(line2).toHaveAttribute('y2', '230');
    expect(line2).toHaveAttribute('stroke', '#d4a96a');
    expect(line2).toHaveAttribute('strokeWidth', '5');
    expect(line2).toHaveAttribute('strokeLinecap', 'round');
  });

  it('should render toppings with different colors', () => {
    const { container } = render(<SushiBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const expectedColors = ['#f1948a', '#e74c3c', '#f39c12', '#f1948a', '#fdfefe', '#2ecc71'];
    
    ellipses.forEach((ellipse, index) => {
      expect(ellipse).toHaveAttribute('fill', expectedColors[index]);
      expect(ellipse).toHaveAttribute('opacity', '0.95');
    });
  });

  it('should render sushi pieces at correct positions', () => {
    const { container } = render(<SushiBase />);
    const expectedPositions = [
      { x: 60, y: 80 }, 
      { x: 140, y: 80 }, 
      { x: 220, y: 80 },
      { x: 60, y: 150 }, 
      { x: 140, y: 150 }, 
      { x: 220, y: 150 },
    ];
    
    const motionGroups = container.querySelectorAll('motion.g');
    
    motionGroups.forEach((group, index) => {
      const ellipse = group.querySelector('ellipse');
      const cx = parseFloat(ellipse?.getAttribute('cx') || '0');
      const cy = parseFloat(ellipse?.getAttribute('cy') || '0');
      
      expect(cx).toBe(expectedPositions[index].x);
      expect(cy).toBe(expectedPositions[index].y - 10); // -10 offset in the component
    });
  });

  it('should render plate with correct styling', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    
    // First rect is outer plate
    const outerPlate = rects[0];
    expect(outerPlate).toHaveAttribute('fill', '#1a252f');
    expect(outerPlate).toHaveAttribute('rx', '20');
    
    // Second rect is inner plate
    const innerPlate = rects[1];
    expect(innerPlate).toHaveAttribute('fill', '#212f3d');
    expect(innerPlate).toHaveAttribute('rx', '18');
  });

  it('should render plate highlight', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    
    const highlight = rects[2];
    expect(highlight).toHaveAttribute('x', '20');
    expect(highlight).toHaveAttribute('y', '40');
    expect(highlight).toHaveAttribute('width', '80');
    expect(highlight).toHaveAttribute('height', '12');
    expect(highlight).toHaveAttribute('rx', '6');
  });

  it('should render seaweed wraps with correct properties', () => {
    const { container } = render(<SushiBase />);
    const motionGroups = container.querySelectorAll('motion.g');
    
    motionGroups.forEach((group) => {
      const rects = group.querySelectorAll('rect');
      const seaweedWrap = rects[0];
      
      expect(seaweedWrap).toHaveAttribute('fill', '#1a5276');
      expect(seaweedWrap).toHaveAttribute('rx', '6');
      expect(seaweedWrap).toHaveAttribute('width', '52');
      expect(seaweedWrap).toHaveAttribute('height', '38');
    });
  });

  it('should render rice with correct properties', () => {
    const { container } = render(<SushiBase />);
    const motionGroups = container.querySelectorAll('motion.g');
    
    motionGroups.forEach((group) => {
      const rects = group.querySelectorAll('rect');
      const rice = rects[1];
      
      expect(rice).toHaveAttribute('fill', '#fdfefe');
      expect(rice).toHaveAttribute('rx', '4');
      expect(rice).toHaveAttribute('width', '44');
      expect(rice).toHaveAttribute('height', '32');
    });
  });

  it('should render seaweed stripes with correct properties', () => {
    const { container } = render(<SushiBase />);
    const motionGroups = container.querySelectorAll('motion.g');
    
    motionGroups.forEach((group) => {
      const rects = group.querySelectorAll('rect');
      const stripe = rects[2];
      
      expect(stripe).toHaveAttribute('fill', '#1a5276');
      expect(stripe).toHaveAttribute('opacity', '0.6');
      expect(stripe).toHaveAttribute('rx', '2');
      expect(stripe).toHaveAttribute('width', '52');
      expect(stripe).toHaveAttribute('height', '6');
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

  it('should have motion.svg as root element', () => {
    const { container } = render(<SushiBase />);
    const svg = container.querySelector('motion\\.svg') || container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.tagName.toLowerCase()).toBe('svg');
  });
});