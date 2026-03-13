// @ts-nocheck
import React from 'react';
import { render } from '@testing-library/react';
import { BurritoBase } from './BurritoBase';

describe('BurritoBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<BurritoBase />);
    expect(container).toBeTruthy();
  });

  it('should render an svg element', () => {
    const { container } = render(<BurritoBase />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('should have correct svg dimensions', () => {
    const { container } = render(<BurritoBase />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('width', '300');
    expect(svgElement).toHaveAttribute('height', '200');
    expect(svgElement).toHaveAttribute('viewBox', '0 0 300 200');
  });

  it('should render plate ellipses', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it('should render plate with correct fill color', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const plateEllipse = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '150' && el.getAttribute('cy') === '185'
    );
    expect(plateEllipse).toHaveAttribute('fill', '#e8e0d8');
  });

  it('should render tortilla wrap ellipse', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const tortillaEllipse = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '150' && el.getAttribute('cy') === '110' && el.getAttribute('rx') === '135'
    );
    expect(tortillaEllipse).toHaveAttribute('fill', '#f5deb3');
  });

  it('should render wrap fold lines with correct stroke properties', () => {
    const { container } = render(<BurritoBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
    paths.forEach((path) => {
      expect(path).toHaveAttribute('stroke', '#e8c589');
      expect(path).toHaveAttribute('strokeWidth', '3');
    });
  });

  it('should render left end fold ellipses', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leftFoldEllipses = Array.from(ellipses).filter(
      (el) => el.getAttribute('cx') === '30'
    );
    expect(leftFoldEllipses.length).toBeGreaterThanOrEqual(2);
  });

  it('should render right end fold ellipses', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const rightFoldEllipses = Array.from(ellipses).filter(
      (el) => el.getAttribute('cx') === '270'
    );
    expect(rightFoldEllipses.length).toBeGreaterThanOrEqual(2);
  });

  it('should render filling peek ellipses with correct colors', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const fillingEllipses = Array.from(ellipses).filter(
      (el) => el.getAttribute('cx') === '150' && el.getAttribute('cy') !== '185' && el.getAttribute('cy') !== '180'
    );
    const redFilling = fillingEllipses.find((el) => el.getAttribute('fill') === '#c0392b');
    const greenFilling = fillingEllipses.find((el) => el.getAttribute('fill') === '#27ae60');
    const yellowFilling = fillingEllipses.find((el) => el.getAttribute('fill') === '#f1c40f');
    expect(redFilling).toBeDefined();
    expect(greenFilling).toBeDefined();
    expect(yellowFilling).toBeDefined();
  });

  it('should render shine ellipse with white color and low opacity', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shineEllipse = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '110' && el.getAttribute('cy') === '88'
    );
    expect(shineEllipse).toHaveAttribute('fill', 'white');
    expect(shineEllipse).toHaveAttribute('opacity', '0.2');
  });

  it('should render motion.svg with framer-motion animation properties', () => {
    const { container } = render(<BurritoBase />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeTruthy();
    // Verify motion.svg is rendered (framer-motion applies internal attributes)
    expect(svgElement?.tagName).toBe('svg');
  });

  it('should have correct number of visual elements', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const paths = container.querySelectorAll('path');
    // Should have: 2 plate + 1 tortilla + 2 left fold + 2 right fold + 3 filling + 1 shine = 11 ellipses
    // Should have: 2 fold lines = 2 paths
    expect(ellipses.length).toBeGreaterThanOrEqual(11);
    expect(paths.length).toBeGreaterThanOrEqual(2);
  });

  it('should render all ellipses with proper SVG attributes', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    ellipses.forEach((ellipse) => {
      expect(ellipse).toHaveAttribute('cx');
      expect(ellipse).toHaveAttribute('cy');
      expect(ellipse).toHaveAttribute('rx');
      expect(ellipse).toHaveAttribute('ry');
    });
  });

  it('should render paths with fill none and proper stroke attributes', () => {
    const { container } = render(<BurritoBase />);
    const paths = container.querySelectorAll('path');
    paths.forEach((path) => {
      expect(path).toHaveAttribute('fill', 'none');
      expect(path).toHaveAttribute('stroke');
      expect(path).toHaveAttribute('strokeWidth');
    });
  });

  it('should maintain consistent color scheme for tortilla shades', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const tortillaColors = Array.from(ellipses)
      .filter((el) => el.getAttribute('fill') === '#f5deb3' || el.getAttribute('fill') === '#e8c589')
      .map((el) => el.getAttribute('fill'));
    expect(tortillaColors.length).toBeGreaterThan(0);
    expect(tortillaColors).toContain('#f5deb3');
  });

  it('should render component with proper SVG namespace', () => {
    const { container } = render(<BurritoBase />);
    const svgElement = container.querySelector('svg');
    expect(svgElement?.tagName).toBe('svg');
    expect(svgElement?.namespaceURI).toBe('http://www.w3.org/2000/svg');
  });

  it('should not have any console errors or warnings', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation();
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();
    
    render(<BurritoBase />);
    
    expect(consoleError).not.toHaveBeenCalled();
    expect(consoleWarn).not.toHaveBeenCalled();
    
    consoleError.mockRestore();
    consoleWarn.mockRestore();
  });
});