// @ts-nocheck
import { render } from '@testing-library/react';
import { BurritoBase } from './BurritoBase';

describe('BurritoBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<BurritoBase />);
    expect(container).toBeInTheDocument();
  });

  it('should render an SVG element', () => {
    const { container } = render(<BurritoBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have correct SVG dimensions', () => {
    const { container } = render(<BurritoBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '300');
    expect(svg).toHaveAttribute('height', '200');
    expect(svg).toHaveAttribute('viewBox', '0 0 300 200');
  });

  it('should have motion animation properties', () => {
    const { container } = render(<BurritoBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveStyle('opacity: 1');
  });

  it('should render plate ellipses', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it('should render tortilla wrap ellipse', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const tortillaWrap = Array.from(ellipses).find(el => 
      el.getAttribute('cx') === '150' && 
      el.getAttribute('cy') === '110' &&
      el.getAttribute('rx') === '135' &&
      el.getAttribute('fill') === '#f5deb3'
    );
    expect(tortillaWrap).toBeInTheDocument();
  });

  it('should render wrap fold lines', () => {
    const { container } = render(<BurritoBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('should render left end fold', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leftFold = Array.from(ellipses).find(el => 
      el.getAttribute('cx') === '30' && 
      el.getAttribute('cy') === '110'
    );
    expect(leftFold).toBeInTheDocument();
  });

  it('should render right end fold', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const rightFold = Array.from(ellipses).find(el => 
      el.getAttribute('cx') === '270' && 
      el.getAttribute('cy') === '110'
    );
    expect(rightFold).toBeInTheDocument();
  });

  it('should render filling peek with red color', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const redFilling = Array.from(ellipses).find(el => 
      el.getAttribute('fill') === '#c0392b'
    );
    expect(redFilling).toBeInTheDocument();
  });

  it('should render filling peek with green color', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const greenFilling = Array.from(ellipses).find(el => 
      el.getAttribute('fill') === '#27ae60'
    );
    expect(greenFilling).toBeInTheDocument();
  });

  it('should render filling peek with yellow color', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const yellowFilling = Array.from(ellipses).find(el => 
      el.getAttribute('fill') === '#f1c40f'
    );
    expect(yellowFilling).toBeInTheDocument();
  });

  it('should render shine effect', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shine = Array.from(ellipses).find(el => 
      el.getAttribute('cx') === '110' && 
      el.getAttribute('cy') === '88' &&
      el.getAttribute('fill') === 'white'
    );
    expect(shine).toBeInTheDocument();
  });

  it('should have proper opacity values on filling elements', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const fillingEllipses = Array.from(ellipses).filter(el => 
      el.getAttribute('fill') === '#c0392b' || 
      el.getAttribute('fill') === '#27ae60' ||
      el.getAttribute('fill') === '#f1c40f'
    );
    fillingEllipses.forEach(el => {
      expect(el).toHaveAttribute('opacity');
    });
  });

  it('should render multiple ellipses for burrito structure', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThanOrEqual(10);
  });

  it('should have wrap fold lines with proper stroke width', () => {
    const { container } = render(<BurritoBase />);
    const paths = container.querySelectorAll('path');
    const foldLines = Array.from(paths).filter(path => 
      path.getAttribute('stroke') === '#e8c589'
    );
    foldLines.forEach(line => {
      expect(line).toHaveAttribute('strokeWidth', '3');
    });
  });

  it('should render plate with light brown background', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const plateBg = Array.from(ellipses).find(el => 
      el.getAttribute('fill') === '#e8e0d8'
    );
    expect(plateBg).toBeInTheDocument();
  });

  it('should render plate with stroke border', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const plateBorder = Array.from(ellipses).find(el => 
      el.getAttribute('stroke') === '#d5c9bc'
    );
    expect(plateBorder).toBeInTheDocument();
  });
});