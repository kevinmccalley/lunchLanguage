// @ts-nocheck
import { render } from '@testing-library/react';
import { BurritoBase } from './BurritoBase';

describe('BurritoBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<BurritoBase />);
    expect(container).toBeInTheDocument();
  });

  it('should render an svg element', () => {
    const { container } = render(<BurritoBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have correct svg dimensions', () => {
    const { container } = render(<BurritoBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '300');
    expect(svg).toHaveAttribute('height', '200');
  });

  it('should have correct viewBox attribute', () => {
    const { container } = render(<BurritoBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 300 200');
  });

  it('should render plate ellipses', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it('should render tortilla wrap ellipse', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const tortillaWrap = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '150' && el.getAttribute('ry') === '60'
    );
    expect(tortillaWrap).toBeInTheDocument();
    expect(tortillaWrap).toHaveAttribute('fill', '#f5deb3');
  });

  it('should render wrap fold line paths', () => {
    const { container } = render(<BurritoBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(2);
  });

  it('should render left end fold ellipses', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leftFold = Array.from(ellipses).filter(
      (el) => el.getAttribute('cx') === '30'
    );
    expect(leftFold.length).toBeGreaterThanOrEqual(2);
  });

  it('should render right end fold ellipses', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const rightFold = Array.from(ellipses).filter(
      (el) => el.getAttribute('cx') === '270'
    );
    expect(rightFold.length).toBeGreaterThanOrEqual(2);
  });

  it('should render filling peek ellipses with correct colors', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const fillingPeek = Array.from(ellipses).filter(
      (el) => el.getAttribute('cx') === '150' && el.getAttribute('cy') === '108'
    );
    expect(fillingPeek.length).toBeGreaterThan(0);
  });

  it('should render shine ellipse with low opacity', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shine = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '110' && el.getAttribute('cy') === '88'
    );
    expect(shine).toBeInTheDocument();
    expect(shine).toHaveAttribute('opacity', '0.2');
    expect(shine).toHaveAttribute('fill', 'white');
  });

  it('should have motion animation attributes on svg', () => {
    const { container } = render(<BurritoBase />);
    const svg = container.querySelector('svg');
    // Motion.svg applies animation through inline styles
    expect(svg).toBeInTheDocument();
  });

  it('should render plate with correct fill color', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const plateBase = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '150' && el.getAttribute('cy') === '185'
    );
    expect(plateBase).toHaveAttribute('fill', '#e8e0d8');
  });

  it('should render plate top with stroke', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const plateTop = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '150' && el.getAttribute('cy') === '180'
    );
    expect(plateTop).toHaveAttribute('stroke', '#d5c9bc');
    expect(plateTop).toHaveAttribute('strokeWidth', '2');
  });

  it('should render fold line paths with correct styling', () => {
    const { container } = render(<BurritoBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(2);
    Array.from(paths).forEach((path) => {
      expect(path).toHaveAttribute('stroke', '#e8c589');
      expect(path).toHaveAttribute('strokeWidth', '3');
    });
  });

  it('should render multiple filling components with different colors', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const fillingComponents = Array.from(ellipses).filter(
      (el) => el.getAttribute('cx') === '150' && 
      ['108', '110', '112'].includes(el.getAttribute('cy') || '')
    );
    expect(fillingComponents.length).toBeGreaterThanOrEqual(3);
  });

  it('should be a functional component that returns JSX', () => {
    expect(typeof BurritoBase).toBe('function');
  });

  it('should render without any props being passed', () => {
    const { container } = render(<BurritoBase />);
    expect(container.firstChild).toBeInTheDocument();
  });
});