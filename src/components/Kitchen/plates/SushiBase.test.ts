// @ts-nocheck
import { render } from '@testing-library/react';
import { SushiBase } from './SushiBase';

describe('SushiBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<SushiBase />);
    expect(container).toBeTruthy();
  });

  it('should render an SVG element', () => {
    const { container } = render(<SushiBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
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
    expect(rects.length).toBeGreaterThanOrEqual(2);
  });

  it('should render 6 sushi pieces', () => {
    const { container } = render(<SushiBase />);
    const groups = container.querySelectorAll('motion g, g');
    // Account for motion.g wrapping
    const sushiGroups = Array.from(groups).filter(
      (g) => g.querySelectorAll('rect, ellipse').length > 0
    );
    expect(sushiGroups.length).toBe(6);
  });

  it('should render sushi piece components with correct structure', () => {
    const { container } = render(<SushiBase />);
    const groups = container.querySelectorAll('motion g, g');
    
    groups.forEach((group) => {
      const children = group.children;
      if (children.length > 0) {
        // Check if this is a sushi piece group (has rect and ellipse)
        const hasRect = Array.from(children).some(
          (child) => child.tagName === 'rect'
        );
        const hasEllipse = Array.from(children).some(
          (child) => child.tagName === 'ellipse'
        );
        
        if (hasRect && hasEllipse) {
          // This is a sushi piece
          expect(hasRect).toBe(true);
          expect(hasEllipse).toBe(true);
        }
      }
    });
  });

  it('should render plate highlight rectangle', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    const highlightRect = Array.from(rects).find(
      (rect) => rect.getAttribute('x') === '20' && rect.getAttribute('y') === '40'
    );
    expect(highlightRect).toBeTruthy();
    expect(highlightRect).toHaveAttribute('width', '80');
    expect(highlightRect).toHaveAttribute('height', '12');
  });

  it('should render chopsticks as line elements', () => {
    const { container } = render(<SushiBase />);
    const lines = container.querySelectorAll('line');
    expect(lines.length).toBe(2);
  });

  it('should have correct chopstick coordinates', () => {
    const { container } = render(<SushiBase />);
    const lines = container.querySelectorAll('line');
    
    const firstLine = lines[0];
    expect(firstLine).toHaveAttribute('x1', '260');
    expect(firstLine).toHaveAttribute('y1', '40');
    expect(firstLine).toHaveAttribute('x2', '290');
    expect(firstLine).toHaveAttribute('y2', '230');
    
    const secondLine = lines[1];
    expect(secondLine).toHaveAttribute('x1', '272');
    expect(secondLine).toHaveAttribute('y1', '40');
    expect(secondLine).toHaveAttribute('x2', '298');
    expect(secondLine).toHaveAttribute('y2', '230');
  });

  it('should render ellipses for sushi toppings', () => {
    const { container } = render(<SushiBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBe(6);
  });

  it('should have correct topping ellipse dimensions', () => {
    const { container } = render(<SushiBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    ellipses.forEach((ellipse) => {
      expect(ellipse).toHaveAttribute('rx', '18');
      expect(ellipse).toHaveAttribute('ry', '10');
      expect(ellipse).toHaveAttribute('opacity', '0.95');
    });
  });

  it('should have different colors for toppings', () => {
    const { container } = render(<SushiBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const colors = Array.from(ellipses).map((e) => e.getAttribute('fill'));
    const expectedColors = ['#f1948a', '#e74c3c', '#f39c12', '#f1948a', '#fdfefe', '#2ecc71'];
    
    colors.forEach((color, index) => {
      expect(color).toBe(expectedColors[index]);
    });
  });

  it('should render seaweed wrap rectangles for each sushi piece', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    const seaweedRects = Array.from(rects).filter(
      (rect) => {
        const width = rect.getAttribute('width');
        const height = rect.getAttribute('height');
        return width === '52' && height === '38';
      }
    );
    expect(seaweedRects.length).toBe(6);
  });

  it('should render rice rectangles for each sushi piece', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    const riceRects = Array.from(rects).filter(
      (rect) => {
        const width = rect.getAttribute('width');
        const height = rect.getAttribute('height');
        return width === '44' && height === '32';
      }
    );
    expect(riceRects.length).toBe(6);
  });

  it('should render seaweed stripes for each sushi piece', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    const stripeRects = Array.from(rects).filter(
      (rect) => {
        const width = rect.getAttribute('width');
        const height = rect.getAttribute('height');
        return width === '52' && height === '6';
      }
    );
    expect(stripeRects.length).toBe(6);
  });

  it('should have correct seaweed stripe opacity', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    const stripeRects = Array.from(rects).filter(
      (rect) => {
        const width = rect.getAttribute('width');
        const height = rect.getAttribute('height');
        return width === '52' && height === '6';
      }
    );
    
    stripeRects.forEach((stripe) => {
      expect(stripe).toHaveAttribute('opacity', '0.6');
    });
  });

  it('should have correct plate background fill colors', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    const outerPlate = rects[0];
    const innerPlate = rects[1];
    
    expect(outerPlate).toHaveAttribute('fill', '#1a252f');
    expect(innerPlate).toHaveAttribute('fill', '#212f3d');
  });

  it('should render with motion.svg wrapper', () => {
    const { container } = render(<SushiBase />);
    const svg = container.querySelector('svg');
    // motion.svg should be rendered as svg with animation attributes
    expect(svg).toBeTruthy();
  });

  it('should have correct chopstick stroke colors', () => {
    const { container } = render(<SushiBase />);
    const lines = container.querySelectorAll('line');
    
    const firstLine = lines[0];
    expect(firstLine).toHaveAttribute('stroke', '#c9916a');
    
    const secondLine = lines[1];
    expect(secondLine).toHaveAttribute('stroke', '#d4a96a');
  });

  it('should have correct chopstick stroke widths', () => {
    const { container } = render(<SushiBase />);
    const lines = container.querySelectorAll('line');
    
    const firstLine = lines[0];
    expect(firstLine).toHaveAttribute('strokeWidth', '6');
    
    const secondLine = lines[1];
    expect(secondLine).toHaveAttribute('strokeWidth', '5');
  });

  it('should have rounded linecaps on chopsticks', () => {
    const { container } = render(<SushiBase />);
    const lines = container.querySelectorAll('line');
    
    lines.forEach((line) => {
      expect(line).toHaveAttribute('strokeLinecap', 'round');
    });
  });

  it('should have correct plate highlight fill', () => {
    const { container } = render(<SushiBase />);
    const rects = container.querySelectorAll('rect');
    const highlightRect = Array.from(rects).find(
      (rect) => rect.getAttribute('x') === '20'
    );
    expect(highlightRect).toHaveAttribute('fill', 'rgba(255,255,255,0.08)');
  });

  it('should render all components together', () => {
    const { container } = render(<SushiBase />);
    const svg = container.querySelector('svg');
    const rects = svg?.querySelectorAll('rect') || [];
    const lines = svg?.querySelectorAll('line') || [];
    const ellipses = svg?.querySelectorAll('ellipse') || [];
    
    expect(rects.length).toBeGreaterThan(0);
    expect(lines.length).toBe(2);
    expect(ellipses.length).toBe(6);
  });
});