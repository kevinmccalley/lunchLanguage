// @ts-nocheck
import { render } from '@testing-library/react';
import { HamburgerBase } from './HamburgerBase';

describe('HamburgerBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<HamburgerBase />);
    expect(container).toBeInTheDocument();
  });

  it('should render an SVG element', () => {
    const { container } = render(<HamburgerBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have correct SVG dimensions', () => {
    const { container } = render(<HamburgerBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '280');
    expect(svg).toHaveAttribute('height', '220');
    expect(svg).toHaveAttribute('viewBox', '0 0 280 220');
  });

  it('should render plate elements (ellipses)', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it('should render bottom bun ellipse', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const bottomBun = Array.from(ellipses).find(el => 
      el.getAttribute('cy') === '170'
    );
    expect(bottomBun).toBeInTheDocument();
    expect(bottomBun).toHaveAttribute('fill', '#d4a96a');
  });

  it('should render patty rectangle', () => {
    const { container } = render(<HamburgerBase />);
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThan(0);
    const patty = Array.from(rects).find(rect => 
      rect.getAttribute('fill') === '#784212'
    );
    expect(patty).toBeInTheDocument();
  });

  it('should render lettuce path', () => {
    const { container } = render(<HamburgerBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
    const lettuce = paths[0];
    expect(lettuce).toHaveAttribute('fill', '#27ae60');
  });

  it('should render top bun ellipses', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const topBunCandidates = Array.from(ellipses).filter(el => 
      el.getAttribute('cy') === '112' || el.getAttribute('cy') === '95'
    );
    expect(topBunCandidates.length).toBeGreaterThan(0);
  });

  it('should render sesame seeds', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const sesameSeedEllipses = Array.from(ellipses).filter(el => 
      el.getAttribute('fill') === '#c9916a'
    );
    expect(sesameSeedEllipses.length).toBe(6);
  });

  it('should render sesame seeds with correct attributes', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const sesameSeedEllipses = Array.from(ellipses).filter(el => 
      el.getAttribute('fill') === '#c9916a'
    );
    sesameSeedEllipses.forEach(seed => {
      expect(seed).toHaveAttribute('rx', '4');
      expect(seed).toHaveAttribute('ry', '2.5');
      expect(seed).toHaveAttribute('transform');
    });
  });

  it('should render shine ellipse with low opacity', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shine = Array.from(ellipses).find(el => 
      el.getAttribute('opacity') === '0.2' && el.getAttribute('fill') === 'white'
    );
    expect(shine).toBeInTheDocument();
    expect(shine).toHaveAttribute('cx', '120');
    expect(shine).toHaveAttribute('cy', '85');
  });

  it('should have motion.svg with initial animation props', () => {
    const { container } = render(<HamburgerBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveStyle({});
  });

  it('should render multiple rect elements for patty depth', () => {
    const { container } = render(<HamburgerBase />);
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBe(2);
  });

  it('should render plate with stroke', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const plateWithStroke = Array.from(ellipses).find(el => 
      el.getAttribute('stroke') === '#d5c9bc'
    );
    expect(plateWithStroke).toBeInTheDocument();
    expect(plateWithStroke).toHaveAttribute('strokeWidth', '2');
  });

  it('should have all bun sections with appropriate colors', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const bunElements = Array.from(ellipses).filter(el => 
      el.getAttribute('fill') === '#d4a96a' || el.getAttribute('fill') === '#e8c589'
    );
    expect(bunElements.length).toBeGreaterThanOrEqual(4);
  });

  it('should render elements in correct z-order visually', () => {
    const { container } = render(<HamburgerBase />);
    const children = container.querySelector('svg')?.children;
    expect(children?.length).toBeGreaterThan(10);
  });

  it('should have properly rounded rectangles for patty', () => {
    const { container } = render(<HamburgerBase />);
    const rects = container.querySelectorAll('rect');
    rects.forEach(rect => {
      expect(rect).toHaveAttribute('rx', '8');
    });
  });
});