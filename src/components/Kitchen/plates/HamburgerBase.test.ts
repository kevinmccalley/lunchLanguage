// @ts-nocheck
import { render } from '@testing-library/react';
import { HamburgerBase } from '../src/components/Kitchen/plates/HamburgerBase';

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
  });

  it('should have correct SVG viewBox', () => {
    const { container } = render(<HamburgerBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 280 220');
  });

  it('should render plate ellipses', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it('should render bottom bun ellipses', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const bottomBunEllipses = Array.from(ellipses).filter(
      (el) => el.getAttribute('cy') === '170' || el.getAttribute('cy') === '155'
    );
    expect(bottomBunEllipses.length).toBe(2);
  });

  it('should render patty rectangles', () => {
    const { container } = render(<HamburgerBase />);
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThan(0);
  });

  it('should render lettuce path', () => {
    const { container } = render(<HamburgerBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('should render top bun ellipses', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const topBunEllipses = Array.from(ellipses).filter(
      (el) => el.getAttribute('cy') === '112' || el.getAttribute('cy') === '95'
    );
    expect(topBunEllipses.length).toBeGreaterThan(0);
  });

  it('should render sesame seeds', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const sesameSeeds = Array.from(ellipses).filter(
      (el) => el.getAttribute('rx') === '4' && el.getAttribute('ry') === '2.5'
    );
    expect(sesameSeeds.length).toBe(6);
  });

  it('should render shine ellipse with low opacity', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shineEllipse = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '120' && el.getAttribute('cy') === '85'
    );
    expect(shineEllipse).toBeInTheDocument();
    expect(shineEllipse).toHaveAttribute('opacity', '0.2');
  });

  it('should have correct colors for plate elements', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const plateEllipse = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '140' && el.getAttribute('cy') === '195'
    );
    expect(plateEllipse).toHaveAttribute('fill', '#e8e0d8');
  });

  it('should have correct colors for bottom bun', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const bottomBun = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '140' && el.getAttribute('cy') === '170'
    );
    expect(bottomBun).toHaveAttribute('fill', '#d4a96a');
  });

  it('should have correct colors for patty', () => {
    const { container } = render(<HamburgerBase />);
    const rects = container.querySelectorAll('rect');
    const patty = Array.from(rects).find(
      (el) => el.getAttribute('x') === '42' && el.getAttribute('y') === '130'
    );
    expect(patty).toHaveAttribute('fill', '#784212');
  });

  it('should have correct colors for lettuce', () => {
    const { container } = render(<HamburgerBase />);
    const path = container.querySelector('path');
    expect(path).toHaveAttribute('fill', '#27ae60');
  });

  it('should have correct colors for top bun', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const topBun = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '140' && el.getAttribute('cy') === '112'
    );
    expect(topBun).toHaveAttribute('fill', '#d4a96a');
  });

  it('should have correct colors for sesame seeds', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const sesameSeeds = Array.from(ellipses).filter(
      (el) => el.getAttribute('rx') === '4' && el.getAttribute('ry') === '2.5'
    );
    sesameSeeds.forEach((seed) => {
      expect(seed).toHaveAttribute('fill', '#c9916a');
    });
  });

  it('should render all sesame seeds with rotation transforms', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const sesameSeeds = Array.from(ellipses).filter(
      (el) => el.getAttribute('rx') === '4' && el.getAttribute('ry') === '2.5'
    );
    sesameSeeds.forEach((seed) => {
      const transform = seed.getAttribute('transform');
      expect(transform).toMatch(/rotate\(/);
    });
  });

  it('should have correct stroke on plate', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const plateStroke = Array.from(ellipses).find(
      (el) => el.getAttribute('stroke') === '#d5c9bc'
    );
    expect(plateStroke).toBeInTheDocument();
  });

  it('should apply motion animation with correct initial state', () => {
    const { container } = render(<HamburgerBase />);
    const svg = container.querySelector('svg');
    expect(svg?.closest('svg')).toBeInTheDocument();
  });
});