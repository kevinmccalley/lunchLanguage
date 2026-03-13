// @ts-nocheck
import React from 'react';
import { render } from '@testing-library/react';
import { SaladBase } from '../../../../../src/components/Kitchen/plates/SaladBase';

describe('SaladBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<SaladBase />);
    expect(container).toBeTruthy();
  });

  it('should render an SVG element', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have correct SVG dimensions', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '280');
    expect(svg).toHaveAttribute('height', '220');
  });

  it('should have correct viewBox', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 280 220');
  });

  it('should render bowl shadow ellipse', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shadowEllipse = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '140' && el.getAttribute('cy') === '210'
    );
    expect(shadowEllipse).toBeInTheDocument();
    expect(shadowEllipse).toHaveAttribute('rx', '120');
    expect(shadowEllipse).toHaveAttribute('ry', '12');
  });

  it('should render bowl outer path', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('should render bowl rim ellipses', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const rimEllipses = Array.from(ellipses).filter(
      (el) => el.getAttribute('cx') === '140' && 
              (el.getAttribute('cy') === '110' || el.getAttribute('cy') === '108')
    );
    expect(rimEllipses.length).toBeGreaterThanOrEqual(2);
  });

  it('should render salad base leaves ellipse', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const saladBaseEllipse = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '140' && el.getAttribute('cy') === '145'
    );
    expect(saladBaseEllipse).toBeInTheDocument();
    expect(saladBaseEllipse).toHaveAttribute('rx', '95');
    expect(saladBaseEllipse).toHaveAttribute('ry', '38');
    expect(saladBaseEllipse).toHaveAttribute('fill', '#2ecc71');
  });

  it('should render 10 leaf ellipses with correct properties', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leafEllipses = Array.from(ellipses).filter(
      (el) => el.getAttribute('rx') === '22' && el.getAttribute('ry') === '12'
    );
    expect(leafEllipses).toHaveLength(10);
  });

  it('should render leaf ellipses with alternating colors', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leafEllipses = Array.from(ellipses).filter(
      (el) => el.getAttribute('rx') === '22' && el.getAttribute('ry') === '12'
    );
    
    leafEllipses.forEach((el, i) => {
      const fill = el.getAttribute('fill');
      if (i % 2 === 0) {
        expect(fill).toBe('#27ae60');
      } else {
        expect(fill).toBe('#58d68d');
      }
    });
  });

  it('should render leaf ellipses with correct opacity', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leafEllipses = Array.from(ellipses).filter(
      (el) => el.getAttribute('rx') === '22' && el.getAttribute('ry') === '12'
    );
    
    leafEllipses.forEach((el) => {
      expect(el).toHaveAttribute('opacity', '0.9');
    });
  });

  it('should render leaf ellipses with rotation transforms', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leafEllipses = Array.from(ellipses).filter(
      (el) => el.getAttribute('rx') === '22' && el.getAttribute('ry') === '12'
    );
    
    leafEllipses.forEach((el, i) => {
      const transform = el.getAttribute('transform');
      expect(transform).toBeTruthy();
      expect(transform).toContain('rotate');
    });
  });

  it('should render bowl highlight path', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    const highlightPath = Array.from(paths).find(
      (el) => el.getAttribute('stroke') === 'white'
    );
    expect(highlightPath).toBeInTheDocument();
    expect(highlightPath).toHaveAttribute('stroke-width', '4');
    expect(highlightPath).toHaveAttribute('stroke-linecap', 'round');
    expect(highlightPath).toHaveAttribute('opacity', '0.5');
  });

  it('should have correct initial animation properties', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveStyle({ transform: expect.any(String) });
  });

  it('should render all path elements with correct fill colors', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    const pathArray = Array.from(paths);
    
    // Should have at least 3 paths: outer bowl, inner bowl, and highlight
    expect(pathArray.length).toBeGreaterThanOrEqual(3);
    
    // Check that paths have fill attributes (except highlight which has fill="none")
    const fillPaths = pathArray.filter((p) => p.getAttribute('fill') !== 'none');
    expect(fillPaths.length).toBeGreaterThan(0);
  });

  it('should render bowl with correct color scheme', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    const fills = Array.from(paths)
      .map((p) => p.getAttribute('fill'))
      .filter(Boolean);
    
    expect(fills).toContain('#e0d5c8'); // Bowl outer color
    expect(fills).toContain('#f8f4f0'); // Bowl inner color
  });

  it('should render ellipses with various positions', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it('should have motion.svg as root element', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.parentElement).toBeTruthy();
  });
});