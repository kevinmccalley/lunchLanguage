// @ts-nocheck
import React from 'react';
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
    expect(svg).toBeTruthy();
  });

  it('should have correct svg dimensions', () => {
    const { container } = render(<BurritoBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '300');
    expect(svg).toHaveAttribute('height', '200');
    expect(svg).toHaveAttribute('viewBox', '0 0 300 200');
  });

  it('should have framer-motion animation attributes', () => {
    const { container } = render(<BurritoBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('style');
  });

  it('should render plate ellipses', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it('should render plate with correct fill color', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const plateEllipse = Array.from(ellipses).find(el => 
      el.getAttribute('cx') === '150' && el.getAttribute('cy') === '185'
    );
    expect(plateEllipse).toHaveAttribute('fill', '#e8e0d8');
  });

  it('should render tortilla wrap ellipse', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const tortillaEllipse = Array.from(ellipses).find(el => 
      el.getAttribute('cx') === '150' && 
      el.getAttribute('cy') === '110' &&
      el.getAttribute('rx') === '135' &&
      el.getAttribute('ry') === '60'
    );
    expect(tortillaEllipse).toHaveAttribute('fill', '#f5deb3');
  });

  it('should render wrap fold lines', () => {
    const { container } = render(<BurritoBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('should render left end fold', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leftFoldOuter = Array.from(ellipses).find(el => 
      el.getAttribute('cx') === '30' && 
      el.getAttribute('cy') === '110' &&
      el.getAttribute('rx') === '20'
    );
    expect(leftFoldOuter).toHaveAttribute('fill', '#e8c589');
  });

  it('should render right end fold', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const rightFoldOuter = Array.from(ellipses).find(el => 
      el.getAttribute('cx') === '270' && 
      el.getAttribute('cy') === '110' &&
      el.getAttribute('rx') === '20'
    );
    expect(rightFoldOuter).toHaveAttribute('fill', '#e8c589');
  });

  it('should render filling peek with red color', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const redFilling = Array.from(ellipses).find(el => 
      el.getAttribute('cx') === '150' && 
      el.getAttribute('cy') === '108' &&
      el.getAttribute('fill') === '#c0392b'
    );
    expect(redFilling).toHaveAttribute('opacity', '0.7');
  });

  it('should render filling peek with green color', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const greenFilling = Array.from(ellipses).find(el => 
      el.getAttribute('cx') === '150' && 
      el.getAttribute('cy') === '110' &&
      el.getAttribute('fill') === '#27ae60'
    );
    expect(greenFilling).toHaveAttribute('opacity', '0.6');
  });

  it('should render filling peek with yellow color', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const yellowFilling = Array.from(ellipses).find(el => 
      el.getAttribute('cx') === '150' && 
      el.getAttribute('cy') === '112' &&
      el.getAttribute('fill') === '#f1c40f'
    );
    expect(yellowFilling).toHaveAttribute('opacity', '0.6');
  });

  it('should render shine ellipse', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shine = Array.from(ellipses).find(el => 
      el.getAttribute('cx') === '110' && 
      el.getAttribute('cy') === '88' &&
      el.getAttribute('fill') === 'white'
    );
    expect(shine).toHaveAttribute('opacity', '0.2');
  });

  it('should render all required ellipses', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBe(11);
  });

  it('should have correct fill colors for plate elements', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const plateFills = Array.from(ellipses)
      .filter(el => el.getAttribute('cy') === '185' || el.getAttribute('cy') === '180')
      .map(el => el.getAttribute('fill'));
    expect(plateFills).toContain('#e8e0d8');
    expect(plateFills).toContain('#f5ede3');
  });

  it('should have stroke on plate top ellipse', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const plateTop = Array.from(ellipses).find(el => 
      el.getAttribute('cy') === '180' && el.getAttribute('fill') === '#f5ede3'
    );
    expect(plateTop).toHaveAttribute('stroke', '#d5c9bc');
    expect(plateTop).toHaveAttribute('strokeWidth', '2');
  });

  it('should render fold line paths with correct stroke width', () => {
    const { container } = render(<BurritoBase />);
    const paths = container.querySelectorAll('path');
    Array.from(paths).forEach(path => {
      expect(path).toHaveAttribute('strokeWidth', '3');
    });
  });

  it('should render shine with rotation transform', () => {
    const { container } = render(<BurritoBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shine = Array.from(ellipses).find(el => 
      el.getAttribute('cx') === '110' && el.getAttribute('cy') === '88'
    );
    expect(shine).toHaveAttribute('transform', 'rotate(-8 110 88)');
  });

  it('should return a react element', () => {
    const component = <BurritoBase />;
    expect(component).toBeTruthy();
    expect(component.type).toBeDefined();
  });
});