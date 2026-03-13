// @ts-nocheck
import React from 'react';
import { render } from '@testing-library/react';
import { SandwichBase } from '../src/components/Kitchen/plates/SandwichBase';

// Mock framer-motion to avoid animation complexities in tests
jest.mock('framer-motion', () => ({
  motion: {
    svg: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <svg ref={ref} {...props}>
        {children}
      </svg>
    )),
  },
}));

describe('SandwichBase', () => {
  it('should render without crashing', () => {
    const { container } = render(<SandwichBase />);
    expect(container).toBeInTheDocument();
  });

  it('should render an SVG element', () => {
    const { container } = render(<SandwichBase />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have correct SVG dimensions', () => {
    const { container } = render(<SandwichBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '300');
    expect(svg).toHaveAttribute('height', '200');
  });

  it('should have correct viewBox attribute', () => {
    const { container } = render(<SandwichBase />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 300 200');
  });

  it('should render plate ellipses', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThanOrEqual(2);
  });

  it('should render plate with correct fill color', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const firstEllipse = ellipses[0];
    expect(firstEllipse).toHaveAttribute('fill', '#e8e0d8');
  });

  it('should render bottom bread slice path', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(1);
  });

  it('should render filling layers as rectangles', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThanOrEqual(3);
  });

  it('should render green filling layer', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    const greenRect = Array.from(rects).find(rect => rect.getAttribute('fill') === '#27ae60');
    expect(greenRect).toBeInTheDocument();
  });

  it('should render yellow filling layer', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    const yellowRect = Array.from(rects).find(rect => rect.getAttribute('fill') === '#f1c40f');
    expect(yellowRect).toBeInTheDocument();
  });

  it('should render beige/tan filling layer', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    const beigeRect = Array.from(rects).find(rect => rect.getAttribute('fill') === '#e8c589');
    expect(beigeRect).toBeInTheDocument();
  });

  it('should render filling layers with opacity', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    rects.forEach(rect => {
      expect(rect).toHaveAttribute('opacity', '0.8');
    });
  });

  it('should render top bread slice path', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(2);
  });

  it('should render crust path with correct fill', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    const crustPath = Array.from(paths).find(path => 
      path.getAttribute('fill') === '#c9916a'
    );
    expect(crustPath).toBeInTheDocument();
  });

  it('should render bread shine ellipse', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses.length).toBeGreaterThanOrEqual(3);
  });

  it('should render bread shine with low opacity', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shineEllipse = Array.from(ellipses).find(ellipse => 
      ellipse.getAttribute('opacity') === '0.18'
    );
    expect(shineEllipse).toBeInTheDocument();
  });

  it('should render bread shine ellipse with transform', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const shineEllipse = Array.from(ellipses).find(ellipse => 
      ellipse.getAttribute('transform')
    );
    expect(shineEllipse).toHaveAttribute('transform', 'rotate(-5 110 85)');
  });

  it('should render curved stroke path for top bread', () => {
    const { container } = render(<SandwichBase />);
    const paths = container.querySelectorAll('path');
    const curvedPath = Array.from(paths).find(path => 
      path.getAttribute('stroke') === '#e8c589'
    );
    expect(curvedPath).toBeInTheDocument();
  });

  it('should have correct component structure', () => {
    const { container } = render(<SandwichBase />);
    const svg = container.querySelector('svg');
    expect(svg?.children.length).toBeGreaterThan(0);
  });

  it('should export SandwichBase as a function component', () => {
    expect(typeof SandwichBase).toBe('function');
  });

  it('should return React element', () => {
    const result = SandwichBase();
    expect(React.isValidElement(result)).toBe(true);
  });

  it('should render all plate ellipses with correct positioning', () => {
    const { container } = render(<SandwichBase />);
    const ellipses = container.querySelectorAll('ellipse');
    const platePlateEllipse = ellipses[0];
    expect(platePlateEllipse).toHaveAttribute('cx', '150');
    expect(platePlateEllipse).toHaveAttribute('cy', '188');
  });

  it('should render filling rectangles with rounded corners', () => {
    const { container } = render(<SandwichBase />);
    const rects = container.querySelectorAll('rect');
    rects.forEach(rect => {
      expect(rect).toHaveAttribute('rx', '4');
    });
  });

  it('should render all elements in correct SVG namespace', () => {
    const { container } = render(<SandwichBase />);
    const svg = container.querySelector('svg');
    expect(svg?.namespaceURI).toBe('http://www.w3.org/2000/svg');
  });
});