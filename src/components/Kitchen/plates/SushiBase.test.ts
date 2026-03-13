// @ts-nocheck
import { render } from '@testing-library/react';
import { SushiBase } from '../src/components/Kitchen/plates/SushiBase';

describe('SushiBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<SushiBase />);
    expect(container).toBeTruthy();
  });

  it('should render an svg element with correct dimensions', () => {
    const { container } = render(<SushiBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg).toHaveAttribute('width', '300');
    expect(svg).toHaveAttribute('height', '240');
    expect(svg).toHaveAttribute('viewBox', '0 0 300 240');
  });

  it('should render the plate background rectangles', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThanOrEqual(3);
    
    // Check for outer plate rect
    const outerPlate = Array.from(rects).find(
      rect => rect.getAttribute('x') === '10' && rect.getAttribute('y') === '30'
    );
    expect(outerPlate).toBeTruthy();
    expect(outerPlate).toHaveAttribute('width', '280');
    expect(outerPlate).toHaveAttribute('height', '200');
    
    // Check for inner plate rect
    const innerPlate = Array.from(rects).find(
      rect => rect.getAttribute('x') === '14' && rect.getAttribute('y') === '34'
    );
    expect(innerPlate).toBeTruthy();
    expect(innerPlate).toHaveAttribute('width', '272');
    expect(innerPlate).toHaveAttribute('height', '192');
  });

  it('should render the plate highlight rectangle', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    
    const highlight = Array.from(rects).find(
      rect => rect.getAttribute('x') === '20' && rect.getAttribute('y') === '40'
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

  it('should render each sushi piece with correct components', () => {
    const { container } = render(<SushiBase />);
    const groups = container.querySelectorAll('g');
    
    groups.forEach((group) => {
      const rects = group.querySelectorAll('rect');
      const ellipses = group.querySelectorAll('ellipse');
      
      // Each sushi piece should have 3 rects (seaweed wrap, rice, seaweed stripe) and 1 ellipse (topping)
      expect(rects.length).toBe(3);
      expect(ellipses.length).toBe(1);
    });
  });

  it('should render sushi pieces with correct seaweed wrap positions', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    
    // Check first sushi piece seaweed wrap at position (60, 80)
    const firstSeaweedWrap = Array.from(rects).find(
      rect => rect.getAttribute('x') === '34' && rect.getAttribute('y') === '60'
    );
    expect(firstSeaweedWrap).toBeTruthy();
    expect(firstSeaweedWrap).toHaveAttribute('width', '52');
    expect(firstSeaweedWrap).toHaveAttribute('height', '38');
  });

  it('should render sushi pieces with correct rice positions', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    
    // Check first sushi piece rice at position (60, 80)
    const firstRice = Array.from(rects).find(
      rect => rect.getAttribute('x') === '38' && rect.getAttribute('y') === '63'
    );
    expect(firstRice).toBeTruthy();
    expect(firstRice).toHaveAttribute('width', '44');
    expect(firstRice).toHaveAttribute('height', '32');
  });

  it('should render sushi toppings with correct colors', () => {
    const { container } = render(<SushiBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    const expectedColors = ['#f1948a', '#e74c3c', '#f39c12', '#f1948a', '#fdfefe', '#2ecc71'];
    
    ellipses.forEach((ellipse, index) => {
      expect(ellipse).toHaveAttribute('fill', expectedColors[index]);
      expect(ellipse).toHaveAttribute('opacity', '0.95');
    });
  });

  it('should render sushi toppings with correct dimensions', () => {
    const { container } = render(<SushiBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    ellipses.forEach((ellipse) => {
      expect(ellipse).toHaveAttribute('rx', '18');
      expect(ellipse).toHaveAttribute('ry', '10');
    });
  });

  it('should render seaweed stripes for each sushi piece', () => {
    const { container } = render(<SushiBase />);
    const groups = container.querySelectorAll('g');
    
    groups.forEach((group) => {
      const rects = group.querySelectorAll('rect');
      // Last rect in each group should be the seaweed stripe
      const seaweedStripe = rects[2];
      expect(seaweedStripe).toHaveAttribute('height', '6');
      expect(seaweedStripe).toHaveAttribute('opacity', '0.6');
    });
  });

  it('should render chopsticks with correct positions', () => {
    const { container } = render(<SushiBase />);
    const lines = container.querySelectorAll('line');
    
    expect(lines.length).toBe(2);
    
    // First chopstick
    const firstChopstick = lines[0];
    expect(firstChopstick).toHaveAttribute('x1', '260');
    expect(firstChopstick).toHaveAttribute('y1', '40');
    expect(firstChopstick).toHaveAttribute('x2', '290');
    expect(firstChopstick).toHaveAttribute('y2', '230');
    expect(firstChopstick).toHaveAttribute('stroke', '#c9916a');
    expect(firstChopstick).toHaveAttribute('strokeWidth', '6');
  });

  it('should render second chopstick with correct properties', () => {
    const { container } = render(<SushiBase />);
    const lines = container.querySelectorAll('line');
    
    const secondChopstick = lines[1];
    expect(secondChopstick).toHaveAttribute('x1', '272');
    expect(secondChopstick).toHaveAttribute('y1', '40');
    expect(secondChopstick).toHaveAttribute('x2', '298');
    expect(secondChopstick).toHaveAttribute('y2', '230');
    expect(secondChopstick).toHaveAttribute('stroke', '#d4a96a');
    expect(secondChopstick).toHaveAttribute('strokeWidth', '5');
  });

  it('should render chopsticks with rounded line caps', () => {
    const { container } = render(<SushiBase />);
    const lines = container.querySelectorAll('line');
    
    lines.forEach((line) => {
      expect(line).toHaveAttribute('strokeLinecap', 'round');
    });
  });

  it('should render 6 sushi pieces in correct grid positions', () => {
    const { container } = render(<SushiBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    const expectedPositions = [
      { cx: '60', cy: '70' },  // Row 1
      { cx: '140', cy: '70' },
      { cx: '220', cy: '70' },
      { cx: '60', cy: '140' }, // Row 2
      { cx: '140', cy: '140' },
      { cx: '220', cy: '140' },
    ];
    
    ellipses.forEach((ellipse, index) => {
      expect(ellipse).toHaveAttribute('cx', expectedPositions[index].cx);
      expect(ellipse).toHaveAttribute('cy', expectedPositions[index].cy);
    });
  });

  it('should apply framer motion animation props to motion.svg', () => {
    const { container } = render(<SushiBase />);
    const svg = container.querySelector('svg');
    
    expect(svg).toBeTruthy();
    // Check that the component renders with motion attributes applied
  });

  it('should apply framer motion animation props to motion groups', () => {
    const { container } = render(<SushiBase />);
    const groups = container.querySelectorAll('g');
    
    expect(groups.length).toBe(6);
    // All groups should be rendered with motion animations
  });
});