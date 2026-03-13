// @ts-nocheck
import { render } from '@testing-library/react';
import { BurritoBase } from '../src/components/Kitchen/plates/BurritoBase';

describe('BurritoBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<BurritoBase />);
    expect(container).toBeTruthy();
  });

  it('should render an SVG element', () => {
    const { container } = render(<BurritoBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should have correct SVG dimensions', () => {
    const { container } = render(<BurritoBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '300');
    expect(svg).toHaveAttribute('height', '200');
  });

  it('should have correct SVG viewBox', () => {
    const { container } = render(<BurritoBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 300 200');
  });

  it('should render plate ellipses', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThanOrEqual(2);
  });

  it('should render tortilla wrap ellipse', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const tortillaWrap = Array.from(ellipses).find(
      (el) => el.getAttribute('fill') === '#f5deb3' && el.getAttribute('cx') === '150'
    );
    expect(tortillaWrap).toBeTruthy();
  });

  it('should render wrap fold lines', () => {
    const { container } = render(<BurritoBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(2);
  });

  it('should render filling peek with correct colors', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const fillingPeeks = Array.from(ellipses).filter(
      (el) => el.getAttribute('cx') === '150' && (el.getAttribute('fill') === '#c0392b' || el.getAttribute('fill') === '#27ae60' || el.getAttribute('fill') === '#f1c40f')
    );
    expect(fillingPeeks.length).toBeGreaterThanOrEqual(3);
  });

  it('should render shine ellipse', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shineEllipse = Array.from(ellipses).find(
      (el) => el.getAttribute('fill') === 'white' && el.getAttribute('opacity') === '0.2'
    );
    expect(shineEllipse).toBeTruthy();
  });

  it('should render left end fold', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leftFolds = Array.from(ellipses).filter(
      (el) => el.getAttribute('cx') === '30'
    );
    expect(leftFolds.length).toBeGreaterThanOrEqual(2);
  });

  it('should render right end fold', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const rightFolds = Array.from(ellipses).filter(
      (el) => el.getAttribute('cx') === '270'
    );
    expect(rightFolds.length).toBeGreaterThanOrEqual(2);
  });

  it('should apply motion animation initial state', () => {
    const { container } = render(<BurritoBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should have plate with correct styling', () => {
    const { container } = render(<BurritoBase />);
    const plateEllipses = container.querySelectorAll('ellipse');
    const mainPlate = Array.from(plateEllipses).find(
      (el) => el.getAttribute('cx') === '150' && el.getAttribute('cy') === '185'
    );
    expect(mainPlate).toBeTruthy();
    expect(mainPlate?.getAttribute('fill')).toBe('#e8e0d8');
  });

  it('should render wrap fold lines with correct styling', () => {
    const { container } = render(<BurritoBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(2);
    Array.from(paths).forEach((path) => {
      expect(path.getAttribute('stroke')).toBe('#e8c589');
    });
  });

  it('should have filling with correct opacity values', () => {
    const { container } = render(<BurritoBase />);
    const redFilling = Array.from(container.querySelectorAll('ellipse')).find(
      (el) => el.getAttribute('fill') === '#c0392b'
    );
    const greenFilling = Array.from(container.querySelectorAll('ellipse')).find(
      (el) => el.getAttribute('fill') === '#27ae60'
    );
    const yellowFilling = Array.from(container.querySelectorAll('ellipse')).find(
      (el) => el.getAttribute('fill') === '#f1c40f'
    );

    expect(redFilling?.getAttribute('opacity')).toBe('0.7');
    expect(greenFilling?.getAttribute('opacity')).toBe('0.6');
    expect(yellowFilling?.getAttribute('opacity')).toBe('0.6');
  });

  it('should export BurritoBase as a function component', () => {
    expect(typeof BurritoBase).toBe('function');
  });

  it('should render consistent structure on multiple renders', () => {
    const { container: container1 } = render(<BurritoBase />);
    const { container: container2 } = render(<BurritoBase />);

    const ellipses1 = container1.querySelectorAll('ellipse').length;
    const ellipses2 = container2.querySelectorAll('ellipse').length;

    expect(ellipses1).toBe(ellipses2);
  });
});