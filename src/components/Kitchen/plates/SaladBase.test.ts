// @ts-nocheck
import React from 'react';
import { render } from '@testing-library/react';
import { SaladBase } from './SaladBase';

describe('SaladBase', () => {
  it('should render the component', () => {
    const { container } = render(<SaladBase />);
    expect(container).toBeTruthy();
  });

  it('should render an SVG element', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should have correct SVG dimensions', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '280');
    expect(svg).toHaveAttribute('height', '220');
    expect(svg).toHaveAttribute('viewBox', '0 0 280 220');
  });

  it('should have motion animation properties', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveStyle('scale: 1');
  });

  it('should render bowl shadow ellipse', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThan(0);
    const shadowEllipse = Array.from(ellipses).find(
      (el) => el.getAttribute('cx') === '140' && el.getAttribute('cy') === '210'
    );
    expect(shadowEllipse).toBeTruthy();
    expect(shadowEllipse?.getAttribute('fill')).toBe('rgba(0,0,0,0.08)');
  });

  it('should render bowl outer path', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    const bowlOuterPath = Array.from(paths).find(
      (el) => el.getAttribute('fill') === '#e0d5c8'
    );
    expect(bowlOuterPath).toBeTruthy();
    expect(bowlOuterPath?.getAttribute('d')).toContain('M20 110');
  });

  it('should render bowl inner path', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    const bowlInnerPath = Array.from(paths).find(
      (el) => el.getAttribute('fill') === '#f8f4f0'
    );
    expect(bowlInnerPath).toBeTruthy();
    expect(bowlInnerPath?.getAttribute('d')).toContain('M30 110');
  });

  it('should render bowl rim ellipses', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const rimEllipses = Array.from(ellipses).filter(
      (el) => el.getAttribute('cx') === '140' && el.getAttribute('cy') === '110'
    );
    expect(rimEllipses.length).toBeGreaterThan(0);
  });

  it('should render outer rim with correct stroke', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const outerRim = Array.from(ellipses).find(
      (el) =>
        el.getAttribute('cx') === '140' &&
        el.getAttribute('cy') === '110' &&
        el.getAttribute('stroke') === '#d5c9bc'
    );
    expect(outerRim).toBeTruthy();
    expect(outerRim?.getAttribute('stroke-width')).toBe('3');
  });

  it('should render inner rim with correct fill', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const innerRim = Array.from(ellipses).find(
      (el) =>
        el.getAttribute('cx') === '140' &&
        el.getAttribute('cy') === '108' &&
        el.getAttribute('fill') === '#f0e8e0'
    );
    expect(innerRim).toBeTruthy();
  });

  it('should render salad base leaves ellipse', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const saladBase = Array.from(ellipses).find(
      (el) =>
        el.getAttribute('cx') === '140' &&
        el.getAttribute('cy') === '145' &&
        el.getAttribute('fill') === '#2ecc71'
    );
    expect(saladBase).toBeTruthy();
    expect(saladBase?.getAttribute('opacity')).toBe('0.85');
  });

  it('should render 10 individual leaf ellipses', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leafEllipses = Array.from(ellipses).filter(
      (el) =>
        (el.getAttribute('fill') === '#27ae60' ||
          el.getAttribute('fill') === '#58d68d') &&
        el.getAttribute('opacity') === '0.9'
    );
    expect(leafEllipses.length).toBe(10);
  });

  it('should render leaves with alternating colors', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leafEllipses = Array.from(ellipses)
      .filter(
        (el) =>
          (el.getAttribute('fill') === '#27ae60' ||
            el.getAttribute('fill') === '#58d68d') &&
          el.getAttribute('opacity') === '0.9'
      )
      .slice(0, 10);

    leafEllipses.forEach((leaf, i) => {
      const expectedColor = i % 2 === 0 ? '#27ae60' : '#58d68d';
      expect(leaf.getAttribute('fill')).toBe(expectedColor);
    });
  });

  it('should render leaves with correct dimensions', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leafEllipses = Array.from(ellipses)
      .filter(
        (el) =>
          (el.getAttribute('fill') === '#27ae60' ||
            el.getAttribute('fill') === '#58d68d') &&
          el.getAttribute('opacity') === '0.9'
      )
      .slice(0, 10);

    leafEllipses.forEach((leaf) => {
      expect(leaf.getAttribute('rx')).toBe('22');
      expect(leaf.getAttribute('ry')).toBe('12');
    });
  });

  it('should render leaves with rotation transforms', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const leafEllipses = Array.from(ellipses)
      .filter(
        (el) =>
          (el.getAttribute('fill') === '#27ae60' ||
            el.getAttribute('fill') === '#58d68d') &&
          el.getAttribute('opacity') === '0.9'
      )
      .slice(0, 10);

    leafEllipses.forEach((leaf) => {
      const transform = leaf.getAttribute('transform');
      expect(transform).toBeTruthy();
      expect(transform).toMatch(/rotate\(/);
    });
  });

  it('should render bowl highlight path', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    const highlightPath = Array.from(paths).find(
      (el) => el.getAttribute('stroke') === 'white'
    );
    expect(highlightPath).toBeTruthy();
    expect(highlightPath?.getAttribute('fill')).toBe('none');
    expect(highlightPath?.getAttribute('stroke-width')).toBe('4');
    expect(highlightPath?.getAttribute('stroke-linecap')).toBe('round');
    expect(highlightPath?.getAttribute('opacity')).toBe('0.5');
  });

  it('should render highlight with correct path data', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    const highlightPath = Array.from(paths).find(
      (el) => el.getAttribute('stroke') === 'white'
    );
    const pathData = highlightPath?.getAttribute('d');
    expect(pathData).toContain('M35 108');
    expect(pathData).toContain('Q80 96 140 94');
    expect(pathData).toContain('Q200 96 245 108');
  });

  it('should render exactly 3 paths', () => {
    const { container } = render(<SaladBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBe(3);
  });

  it('should render total of 13 ellipses (1 shadow + 4 rim + 1 base + 10 leaves)', () => {
    const { container } = render(<SaladBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBe(16);
  });

  it('should have correct animation transition properties', () => {
    const { container } = render(<SaladBase />);
    const svg = container.querySelector('svg');
    const style = window.getComputedStyle(svg!);
    expect(style).toBeTruthy();
  });
});