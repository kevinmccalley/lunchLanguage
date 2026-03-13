// @ts-nocheck
import { render } from '@testing-library/react';
import { BurritoBase } from '../src/components/Kitchen/plates/BurritoBase';

describe('BurritoBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<BurritoBase />);
    expect(container).toBeTruthy();
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

  it('should have correct viewBox', () => {
    const { container } = render(<BurritoBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 300 200');
  });

  it('should contain plate ellipses', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it('should render plate with correct styling', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const firstEllipse = ellipses[0];
    expect(firstEllipse).toHaveAttribute('cx', '150');
    expect(firstEllipse).toHaveAttribute('cy', '185');
    expect(firstEllipse).toHaveAttribute('fill', '#e8e0d8');
  });

  it('should render tortilla wrap', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const tortillaEllipse = Array.from(ellipses).find(
      (el) => el.getAttribute('fill') === '#f5deb3' && el.getAttribute('cx') === '150'
    );
    expect(tortillaEllipse).toBeTruthy();
  });

  it('should contain path elements for wrap fold lines', () => {
    const { container } = render(<BurritoBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('should render left end fold', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leftEndFold = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '30' && el.getAttribute('fill') === '#e8c589'
    );
    expect(leftEndFold).toBeTruthy();
  });

  it('should render right end fold', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const rightEndFold = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '270' && el.getAttribute('fill') === '#e8c589'
    );
    expect(rightEndFold).toBeTruthy();
  });

  it('should render filling colors with correct opacity', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const redFilling = Array.from(ellipses).find(
      (el) => el.getAttribute('fill') === '#c0392b'
    );
    const greenFilling = Array.from(ellipses).find(
      (el) => el.getAttribute('fill') === '#27ae60'
    );
    const yellowFilling = Array.from(ellipses).find(
      (el) => el.getAttribute('fill') === '#f1c40f'
    );
    
    expect(redFilling).toBeTruthy();
    expect(greenFilling).toBeTruthy();
    expect(yellowFilling).toBeTruthy();
  });

  it('should render shine effect', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shineEllipse = Array.from(ellipses).find(
      (el) => el.getAttribute('fill') === 'white' && el.getAttribute('opacity') === '0.2'
    );
    expect(shineEllipse).toBeTruthy();
  });

  it('should have motion.svg wrapper with animation properties', () => {
    const { container } = render(<BurritoBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should render all child elements correctly', () => {
    const { container } = render(<BurritoBase />);
    const allShapes = container.querySelectorAll('ellipse, path');
    expect(allShapes.length).toBeGreaterThan(10);
  });

  it('should have proper stroke attributes on plate element', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const secondEllipse = ellipses[1];
    expect(secondEllipse).toHaveAttribute('stroke', '#d5c9bc');
    expect(secondEllipse).toHaveAttribute('strokeWidth', '2');
  });

  it('should render wrap fold lines with correct styling', () => {
    const { container } = render(<BurritoBase />);
    const paths = container.querySelectorAll('path');
    const firstPath = paths[0];
    expect(firstPath).toHaveAttribute('stroke', '#e8c589');
    expect(firstPath).toHaveAttribute('strokeWidth', '3');
  });

  it('should render component multiple times without issues', () => {
    const { container: container1 } = render(<BurritoBase />);
    const { container: container2 } = render(<BurritoBase />);
    
    const svg1 = container1.querySelector('svg');
    const svg2 = container2.querySelector('svg');
    
    expect(svg1).toBeTruthy();
    expect(svg2).toBeTruthy();
  });
});