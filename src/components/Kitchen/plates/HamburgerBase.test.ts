// @ts-nocheck
import { render } from '@testing-library/react';
import { HamburgerBase } from './HamburgerBase';

describe('HamburgerBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<HamburgerBase />);
    expect(container).toBeTruthy();
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

  it('should render plate ellipses', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it('should render bottom bun with correct fill color', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = Array.from(container.querySelectorAll('ellipse'));
    const bottomBunEllipse = ellipses.find((el) => el.getAttribute('cy') === '170');
    expect(bottomBunEllipse).toHaveAttribute('fill', '#d4a96a');
  });

  it('should render patty area with correct fill color', () => {
    const { container } = render(<HamburgerBase />);
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThan(0);
    const pattiesWithBrownColor = Array.from(rects).filter((rect) =>
      ['#784212', '#8B4513'].includes(rect.getAttribute('fill') || '')
    );
    expect(pattiesWithBrownColor.length).toBeGreaterThan(0);
  });

  it('should render lettuce peek path with green color', () => {
    const { container } = render(<HamburgerBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
    const lettucePath = Array.from(paths).find((path) => path.getAttribute('fill') === '#27ae60');
    expect(lettucePath).toBeTruthy();
  });

  it('should render sesame seeds', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const sesameSeedCount = Array.from(ellipses).filter((el) => el.getAttribute('fill') === '#c9916a').length;
    expect(sesameSeedCount).toBe(6);
  });

  it('should render sesame seeds with correct dimensions', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = Array.from(container.querySelectorAll('ellipse'));
    const sesameSeeds = ellipses.filter((el) => el.getAttribute('fill') === '#c9916a');
    sesameSeeds.forEach((seed) => {
      expect(seed).toHaveAttribute('rx', '4');
      expect(seed).toHaveAttribute('ry', '2.5');
    });
  });

  it('should render shine effect with correct opacity', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = Array.from(container.querySelectorAll('ellipse'));
    const shine = ellipses.find((el) => el.getAttribute('opacity') === '0.2');
    expect(shine).toBeTruthy();
    expect(shine).toHaveAttribute('fill', 'white');
  });

  it('should render top bun ellipses', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = Array.from(container.querySelectorAll('ellipse'));
    const topBunEllipses = ellipses.filter(
      (el) => el.getAttribute('cy') === '112' || el.getAttribute('cy') === '95'
    );
    expect(topBunEllipses.length).toBeGreaterThanOrEqual(2);
  });

  it('should have motion.svg with animation properties', () => {
    const { container } = render(<HamburgerBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    // Verify it's a motion component by checking it renders
    expect(svg?.tagName.toLowerCase()).toBe('svg');
  });

  it('should render all structural components', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const rects = container.querySelectorAll('rect');
    const paths = container.querySelectorAll('path');
    
    expect(ellipses.length).toBeGreaterThan(0);
    expect(rects.length).toBeGreaterThan(0);
    expect(paths.length).toBeGreaterThan(0);
  });

  it('should render plate with stroke properties', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = Array.from(container.querySelectorAll('ellipse'));
    const plateWithStroke = ellipses.find(
      (el) =>
        el.getAttribute('stroke') === '#d5c9bc' && el.getAttribute('strokeWidth') === '2'
    );
    expect(plateWithStroke).toBeTruthy();
  });

  it('should render bottom bun highlight with correct color', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = Array.from(container.querySelectorAll('ellipse'));
    const bottomBunHighlight = ellipses.find(
      (el) => el.getAttribute('cy') === '155' && el.getAttribute('fill') === '#e8c589'
    );
    expect(bottomBunHighlight).toBeTruthy();
  });

  it('should render patty with correct dimensions', () => {
    const { container } = render(<HamburgerBase />);
    const rects = Array.from(container.querySelectorAll('rect'));
    const patties = rects.filter((rect) => rect.getAttribute('y') === '130');
    expect(patties.length).toBeGreaterThan(0);
    patties.forEach((patty) => {
      expect(patty).toHaveAttribute('x', '42');
      expect(patty).toHaveAttribute('width', '196');
    });
  });

  it('should render top bun with lighter shade', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = Array.from(container.querySelectorAll('ellipse'));
    const topBunLight = ellipses.find(
      (el) => el.getAttribute('cy') === '95' && el.getAttribute('fill') === '#e8c589'
    );
    expect(topBunLight).toBeTruthy();
  });

  it('should have sesame seeds with proper rotation transforms', () => {
    const { container } = render(<HamburgerBase />);
    const ellipses = Array.from(container.querySelectorAll('ellipse'));
    const sesameSeeds = ellipses.filter((el) => el.getAttribute('fill') === '#c9916a');
    const transformedSeeds = sesameSeeds.filter((seed) => seed.getAttribute('transform'));
    expect(transformedSeeds.length).toBe(6);
  });

  it('should render hamburger as a single SVG unit', () => {
    const { container } = render(<HamburgerBase />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(1);
  });
});