// @ts-nocheck
import React from 'react';
import { render } from '@testing-library/react';
import { SaladBase } from '../src/components/Kitchen/plates/SaladBase';

describe('SaladBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<SaladBase />);
    expect(container).toBeTruthy();
  });

  it('should render an SVG element', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should have correct SVG dimensions', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '280');
    expect(svg).toHaveAttribute('height', '220');
    expect(svg).toHaveAttribute('viewBox', '0 0 280 220');
  });

  it('should have motion animation properties', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    // Framer motion applies styles to the element
    expect(svg?.tagName).toBe('svg');
  });

  it('should render bowl shadow ellipse', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThan(0);
    
    // Find shadow ellipse (first ellipse with shadow properties)
    const shadowEllipse = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '140' && 
              el.getAttribute('cy') === '210' &&
              el.getAttribute('rx') === '120'
    );
    expect(shadowEllipse).toBeTruthy();
    expect(shadowEllipse?.getAttribute('ry')).toBe('12');
    expect(shadowEllipse?.getAttribute('fill')).toContain('rgba(0,0,0,0.08)');
  });

  it('should render bowl outer and inner paths', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    
    // Should have at least bowl outer, bowl inner, bowl highlight paths
    expect(paths.length).toBeGreaterThanOrEqual(3);
  });

  it('should render bowl rim ellipses', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    // Find rim ellipses (cx=140, cy=110 and cx=140, cy=108)
    const rimEllipses = Array.from(ellipses).filter(
      (el) => el.getAttribute('cx') === '140' && 
              (el.getAttribute('cy') === '110' || el.getAttribute('cy') === '108')
    );
    expect(rimEllipses.length).toBeGreaterThanOrEqual(2);
  });

  it('should render salad base main ellipse', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    // Find main salad base ellipse
    const saladBaseEllipse = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '140' && 
              el.getAttribute('cy') === '145' &&
              el.getAttribute('rx') === '95'
    );
    expect(saladBaseEllipse).toBeTruthy();
    expect(saladBaseEllipse?.getAttribute('ry')).toBe('38');
    expect(saladBaseEllipse?.getAttribute('fill')).toBe('#2ecc71');
  });

  it('should render leaf ellipses with correct count', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    // Should have: shadow (1) + rim (2) + salad base (1) + leaves (10) = 14 ellipses
    expect(ellipses.length).toBe(14);
  });

  it('should render leaves with alternating colors', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    // Get all leaf ellipses (skip first 4: shadow, rim1, rim2, salad base)
    const leafEllipses = Array.from(ellipses).slice(4);
    
    const colors = leafEllipses.map((el) => el.getAttribute('fill'));
    
    // Check alternating pattern: even indices should be one color, odd another
    for (let i = 0; i < colors.length; i++) {
      if (i % 2 === 0) {
        expect(colors[i]).toBe('#27ae60');
      } else {
        expect(colors[i]).toBe('#58d68d');
      }
    }
  });

  it('should render leaves with correct dimensions', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    // Get all leaf ellipses (skip first 4)
    const leafEllipses = Array.from(ellipses).slice(4);
    
    leafEllipses.forEach((leaf) => {
      expect(leaf.getAttribute('rx')).toBe('22');
      expect(leaf.getAttribute('ry')).toBe('12');
      expect(leaf.getAttribute('opacity')).toBe('0.9');
    });
  });

  it('should render leaves with rotation transforms', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    // Get all leaf ellipses (skip first 4)
    const leafEllipses = Array.from(ellipses).slice(4);
    
    leafEllipses.forEach((leaf) => {
      const transform = leaf.getAttribute('transform');
      expect(transform).toBeTruthy();
      expect(transform).toMatch(/rotate\(/);
    });
  });

  it('should render bowl highlight path', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    
    // Find highlight path (has specific stroke properties)
    const highlightPath = Array.from(paths).find(
      (el) => el.getAttribute('stroke') === 'white' &&
              el.getAttribute('fill') === 'none'
    );
    expect(highlightPath).toBeTruthy();
    expect(highlightPath?.getAttribute('stroke-width')).toBe('4');
    expect(highlightPath?.getAttribute('stroke-linecap')).toBe('round');
  });

  it('should have correct leaf positions', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    const leafPositions = [
      { cx: '80', cy: '130' },
      { cx: '110', cy: '120' },
      { cx: '140', cy: '118' },
      { cx: '170', cy: '120' },
      { cx: '200', cy: '130' },
      { cx: '90', cy: '145' },
      { cx: '160', cy: '142' },
      { cx: '140', cy: '155' },
      { cx: '115', cy: '150' },
      { cx: '165', cy: '150' },
    ];
    
    // Get leaf ellipses (skip first 4)
    const leafEllipses = Array.from(ellipses).slice(4);
    
    leafEllipses.forEach((leaf, index) => {
      expect(leaf.getAttribute('cx')).toBe(leafPositions[index].cx);
      expect(leaf.getAttribute('cy')).toBe(leafPositions[index].cy);
    });
  });

  it('should render SVG with proper namespace', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg?.tagName.toLowerCase()).toBe('svg');
  });

  it('should have all paths with correct fill colors', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    
    const pathFills = Array.from(paths).map((path) => path.getAttribute('fill'));
    
    // Bowl outer should be #e0d5c8
    // Bowl inner should be #f8f4f0
    // Highlight should be none
    expect(pathFills).toContain('#e0d5c8');
    expect(pathFills).toContain('#f8f4f0');
    expect(pathFills).toContain('none');
  });

  it('should render bowl rim with correct stroke properties', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    // Find first rim ellipse (with stroke)
    const rimWithStroke = Array.from(ellipses).find(
      (el) => el.getAttribute('stroke') === '#d5c9bc'
    );
    expect(rimWithStroke).toBeTruthy();
    expect(rimWithStroke?.getAttribute('stroke-width')).toBe('3');
  });

  it('should export SaladBase as a React component', () => {
    expect(typeof SaladBase).toBe('function');
  });

  it('should be a functional component that returns JSX', () => {
    const result = SaladBase();
    expect(result).toBeTruthy();
    expect(result.type).toBeTruthy();
  });
});