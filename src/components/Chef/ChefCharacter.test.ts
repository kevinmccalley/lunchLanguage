// @ts-nocheck
import { render } from '@testing-library/react';
import { ChefCharacter } from './ChefCharacter';
import type { GameState } from '../../types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, animate, style }: any) => (
      <div data-testid="motion-div" data-animate={JSON.stringify(animate)} style={style}>
        {children}
      </div>
    ),
    g: ({ children, animate, style }: any) => (
      <g data-testid="motion-g" data-animate={JSON.stringify(animate)} style={style}>
        {children}
      </g>
    ),
  },
  useAnimation: () => ({
    start: jest.fn(),
  }),
}));

describe('ChefCharacter', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      expect(container).toBeTruthy();
    });

    it('should render SVG element', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('should use default size of 120 when not provided', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '120');
      expect(svg).toHaveAttribute('height', '168');
    });

    it('should use custom size when provided', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" size={200} />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '200');
      expect(svg).toHaveAttribute('height', '280');
    });

    it('should render motion div with correct dimensions', () => {
      const { getByTestId } = render(
        <ChefCharacter emotion="happy" size={150} />
      );
      const motionDiv = getByTestId('motion-div');
      expect(motionDiv).toHaveStyle({ width: '150px', height: '210px' });
    });
  });

  describe('emotion variations', () => {
    const emotions: GameState['chefEmotion'][] = [
      'happy',
      'excited',
      'cheering',
      'thinking',
      'pointing',
      'confused',
    ];

    emotions.forEach((emotion) => {
      it(`should render correctly with emotion: ${emotion}`, () => {
        const { container } = render(
          <ChefCharacter emotion={emotion} />
        );
        expect(container.querySelector('svg')).toBeTruthy();
      });
    });

    it('should render happy eyes for non-cheering emotions', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const circles = container.querySelectorAll('circle');
      const eyeCircles = Array.from(circles).filter(
        (circle) => circle.getAttribute('cx') === '50' || circle.getAttribute('cx') === '70'
      );
      expect(eyeCircles.length).toBeGreaterThan(0);
    });

    it('should render arc eyes for cheering emotion', () => {
      const { container } = render(
        <ChefCharacter emotion="cheering" />
      );
      const paths = container.querySelectorAll('path');
      const arcEyes = Array.from(paths).filter((path) => {
        const d = path.getAttribute('d');
        return d && d.includes('Q');
      });
      expect(arcEyes.length).toBeGreaterThan(0);
    });

    it('should render thinking eyebrows for thinking emotion', () => {
      const { container } = render(
        <ChefCharacter emotion="thinking" />
      );
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render excited mouth for excited emotion', () => {
      const { container } = render(
        <ChefCharacter emotion="excited" />
      );
      const paths = container.querySelectorAll('path');
      const mouthPath = Array.from(paths).find((path) => {
        const d = path.getAttribute('d');
        return d && d.includes('Q60 100');
      });
      expect(mouthPath).toBeTruthy();
    });

    it('should render cheering mouth for cheering emotion', () => {
      const { container } = render(
        <ChefCharacter emotion="cheering" />
      );
      const paths = container.querySelectorAll('path');
      const mouthPath = Array.from(paths).find((path) => {
        const d = path.getAttribute('d');
        return d && d.includes('Q60 100');
      });
      expect(mouthPath).toBeTruthy();
    });

    it('should render thinking mouth for thinking emotion', () => {
      const { container } = render(
        <ChefCharacter emotion="thinking" />
      );
      const paths = container.querySelectorAll('path');
      const mouthPath = Array.from(paths).find((path) => {
        const d = path.getAttribute('d');
        return d && d.includes('Q60 90');
      });
      expect(mouthPath).toBeTruthy();
    });

    it('should render neutral mouth for default emotions', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const paths = container.querySelectorAll('path');
      const mouthPath = Array.from(paths).find((path) => {
        const d = path.getAttribute('d');
        return d && d.includes('Q60 99');
      });
      expect(mouthPath).toBeTruthy();
    });
  });

  describe('visual elements', () => {
    it('should render chef hat', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render face circle', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const circles = container.querySelectorAll('circle');
      const faceCircle = Array.from(circles).find(
        (circle) => circle.getAttribute('cx') === '60' && circle.getAttribute('cy') === '80'
      );
      expect(faceCircle).toBeTruthy();
    });

    it('should render cheeks', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const circles = container.querySelectorAll('circle');
      const cheeks = Array.from(circles).filter((circle) => {
        const cx = circle.getAttribute('cx');
        return cx === '40' || cx === '80';
      });
      expect(cheeks.length).toBeGreaterThanOrEqual(2);
    });

    it('should render moustache', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const paths = container.querySelectorAll('path');
      const moustache = Array.from(paths).find((path) => {
        const d = path.getAttribute('d');
        return d && d.includes('Q52 90');
      });
      expect(moustache).toBeTruthy();
    });

    it('should render body and apron', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const rects = container.querySelectorAll('rect');
      const apronRects = Array.from(rects).filter((rect) => {
        const x = rect.getAttribute('x');
        return x === '40' || x === '48';
      });
      expect(apronRects.length).toBeGreaterThan(0);
    });

    it('should render arms', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const rects = container.querySelectorAll('rect');
      const armRects = Array.from(rects).filter((rect) => {
        const x = rect.getAttribute('x');
        return x === '10' || x === '88';
      });
      expect(armRects.length).toBeGreaterThan(0);
    });

    it('should render legs and shoes', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const rects = container.querySelectorAll('rect');
      const legRects = Array.from(rects).filter((rect) => {
        const y = rect.getAttribute('y');
        return y === '154';
      });
      expect(legRects.length).toBeGreaterThan(0);
    });

    it('should render spoon in right hand', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const lines = container.querySelectorAll('line');
      const spoonLine = Array.from(lines).find(
        (line) => line.getAttribute('x1') === '108' && line.getAttribute('x2') === '118'
      );
      expect(spoonLine).toBeTruthy();
    });
  });

  describe('animations', () => {
    it('should not crash when emotion changes', () => {
      const { rerender } = render(
        <ChefCharacter emotion="happy" />
      );
      expect(() => {
        rerender(<ChefCharacter emotion="excited" />);
      }).not.toThrow();
    });

    it('should handle excited emotion transition', () => {
      const { rerender } = render(
        <ChefCharacter emotion="happy" />
      );
      expect(() => {
        rerender(<ChefCharacter emotion="excited" />);
      }).not.toThrow();
    });

    it('should handle cheering emotion transition', () => {
      const { rerender } = render(
        <ChefCharacter emotion="happy" />
      );
      expect(() => {
        rerender(<ChefCharacter emotion="cheering" />);
      }).not.toThrow();
    });

    it('should handle thinking emotion transition', () => {
      const { rerender } = render(
        <ChefCharacter emotion="happy" />
      );
      expect(() => {
        rerender(<ChefCharacter emotion="thinking" />);
      }).not.toThrow();
    });

    it('should handle pointing emotion transition', () => {
      const { rerender } = render(
        <ChefCharacter emotion="happy" />
      );
      expect(() => {
        rerender(<ChefCharacter emotion="pointing" />);
      }).not.toThrow();
    });
  });

  describe('size variations', () => {
    const sizes = [50, 80, 100, 120, 150, 200, 300];

    sizes.forEach((size) => {
      it(`should render correctly with size ${size}`, () => {
        const { container } = render(
          <ChefCharacter emotion="happy" size={size} />
        );
        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('width', size.toString());
        expect(svg).toHaveAttribute('height', (size * 1.4).toString());
      });
    });

    it('should maintain aspect ratio for custom sizes', () => {
      const testSize = 240;
      const { container } = render(
        <ChefCharacter emotion="happy" size={testSize} />
      );
      const svg = container.querySelector('svg');
      const width = parseInt(svg?.getAttribute('width') || '0');
      const height = parseInt(svg?.getAttribute('height') || '0');
      expect(height / width).toBeCloseTo(1.4, 1);
    });
  });

  describe('edge cases', () => {
    it('should handle zero size gracefully', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" size={0} />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '0');
      expect(svg).toHaveAttribute('height', '0');
    });

    it('should handle very large size', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" size={1000} />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '1000');
      expect(svg).toHaveAttribute('height', '1400');
    });

    it('should handle null emotion as default case', () => {
      const { container } = render(
        <ChefCharacter emotion={null as any} />
      );
      expect(container.querySelector('svg')).toBeTruthy();
    });

    it('should handle undefined emotion as default case', () => {
      const { container } = render(
        <ChefCharacter emotion={undefined as any} />
      );
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('should render SVG with viewBox for scalability', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 120 168');
    });

    it('should have inline-block display style', () => {
      const { getByTestId } = render(
        <ChefCharacter emotion="happy" />
      );
      const motionDiv = getByTestId('motion-div');
      expect(motionDiv).toHaveStyle({ display: 'inline-block' });
    });
  });
});