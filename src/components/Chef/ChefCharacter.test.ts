// @ts-nocheck
import { render, screen, waitFor } from '@testing-library/react';
import { ChefCharacter } from '../../../src/components/Chef/ChefCharacter';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, animate, style, ...props }: any) => (
      <div data-testid="motion-div" data-animate={JSON.stringify(animate)} style={style} {...props}>
        {children}
      </div>
    ),
    g: ({ children, animate, style, ...props }: any) => (
      <g data-testid="motion-g" data-animate={JSON.stringify(animate)} style={style} {...props}>
        {children}
      </g>
    ),
  },
  useAnimation: jest.fn(() => ({
    start: jest.fn(),
  })),
}));

describe('ChefCharacter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('rendering', () => {
    it('should render the chef character with default size', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '120');
      expect(svg).toHaveAttribute('height', '168');
    });

    it('should render the chef character with custom size', () => {
      const { container } = render(<ChefCharacter emotion="happy" size={200} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '200');
      expect(svg).toHaveAttribute('height', '280');
    });

    it('should render motion div with correct dimensions', () => {
      const { container } = render(<ChefCharacter emotion="happy" size={150} />);
      const motionDiv = container.querySelector('[data-testid="motion-div"]');
      expect(motionDiv).toHaveStyle({ width: '150px', height: '210px', display: 'inline-block' });
    });

    it('should render chef hat', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const hatElements = container.querySelectorAll('rect');
      expect(hatElements.length).toBeGreaterThan(0);
    });

    it('should render face circle', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const faceCircle = container.querySelector('circle[cx="60"][cy="80"]');
      expect(faceCircle).toBeInTheDocument();
    });

    it('should render cheeks', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const cheeks = container.querySelectorAll('circle[r="7"]');
      expect(cheeks.length).toBeGreaterThanOrEqual(2);
    });

    it('should render moustache', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const paths = container.querySelectorAll('path');
      const moustachePath = Array.from(paths).find(
        (path) => path.getAttribute('d')?.includes('46 86 Q52 90 58 86')
      );
      expect(moustachePath).toBeInTheDocument();
    });

    it('should render body and apron', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const rects = container.querySelectorAll('rect');
      const bodyApron = Array.from(rects).filter(
        (rect) => rect.getAttribute('fill') === '#ff6b35' || rect.getAttribute('fill') === 'white'
      );
      expect(bodyApron.length).toBeGreaterThan(0);
    });

    it('should render arms', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const armGroups = container.querySelectorAll('g');
      expect(armGroups.length).toBeGreaterThan(0);
    });

    it('should render legs and shoes', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('emotion states - excited', () => {
    it('should render excited emotion', () => {
      const { container } = render(<ChefCharacter emotion="excited" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render normal eyes for excited emotion', () => {
      const { container } = render(<ChefCharacter emotion="excited" />);
      const circles = container.querySelectorAll('circle[r="5"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render open mouth for excited emotion', () => {
      const { container } = render(<ChefCharacter emotion="excited" />);
      const paths = container.querySelectorAll('path');
      const mouthPath = Array.from(paths).find(
        (path) => path.getAttribute('d')?.includes('48 90 Q60 100 72 90')
      );
      expect(mouthPath).toBeInTheDocument();
    });

    it('should render normal eyebrows for excited emotion', () => {
      const { container } = render(<ChefCharacter emotion="excited" />);
      const paths = container.querySelectorAll('path');
      const eyebrow = Array.from(paths).find(
        (path) => path.getAttribute('d')?.includes('44 68 Q50 64 56 68')
      );
      expect(eyebrow).toBeInTheDocument();
    });
  });

  describe('emotion states - cheering', () => {
    it('should render cheering emotion', () => {
      const { container } = render(<ChefCharacter emotion="cheering" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render arc eyes for cheering emotion', () => {
      const { container } = render(<ChefCharacter emotion="cheering" />);
      const paths = container.querySelectorAll('path');
      const arcEye = Array.from(paths).find(
        (path) => path.getAttribute('d')?.includes('48 74 Q52 70 56 74')
      );
      expect(arcEye).toBeInTheDocument();
    });

    it('should render wide open mouth for cheering emotion', () => {
      const { container } = render(<ChefCharacter emotion="cheering" />);
      const paths = container.querySelectorAll('path');
      const mouthPath = Array.from(paths).find(
        (path) => path.getAttribute('d')?.includes('48 90 Q60 100 72 90')
      );
      expect(mouthPath).toBeInTheDocument();
    });
  });

  describe('emotion states - thinking', () => {
    it('should render thinking emotion', () => {
      const { container } = render(<ChefCharacter emotion="thinking" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render thoughtful eyebrows for thinking emotion', () => {
      const { container } = render(<ChefCharacter emotion="thinking" />);
      const paths = container.querySelectorAll('path');
      const leftEyebrow = Array.from(paths).find(
        (path) => path.getAttribute('d')?.includes('44 66 Q50 62 56 66')
      );
      expect(leftEyebrow).toBeInTheDocument();
    });

    it('should render puzzled mouth for thinking emotion', () => {
      const { container } = render(<ChefCharacter emotion="thinking" />);
      const paths = container.querySelectorAll('path');
      const mouthPath = Array.from(paths).find(
        (path) => path.getAttribute('d')?.includes('50 93 Q60 90 70 93')
      );
      expect(mouthPath).toBeInTheDocument();
    });
  });

  describe('emotion states - pointing', () => {
    it('should render pointing emotion', () => {
      const { container } = render(<ChefCharacter emotion="pointing" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render normal eyes for pointing emotion', () => {
      const { container } = render(<ChefCharacter emotion="pointing" />);
      const circles = container.querySelectorAll('circle[r="5"]');
      expect(circles.length).toBeGreaterThan(0);
    });
  });

  describe('emotion states - happy', () => {
    it('should render happy emotion', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render normal eyes for happy emotion', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const circles = container.querySelectorAll('circle[r="5"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render normal mouth for happy emotion', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const paths = container.querySelectorAll('path');
      const mouthPath = Array.from(paths).find(
        (path) => path.getAttribute('d')?.includes('48 91 Q60 99 72 91')
      );
      expect(mouthPath).toBeInTheDocument();
    });
  });

  describe('emotion states - default/other', () => {
    it('should render with unknown emotion as default', () => {
      const { container } = render(<ChefCharacter emotion="unknown" as any />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('animations', () => {
    it('should trigger blinking animation on interval', async () => {
      const { useAnimation } = require('framer-motion');
      render(<ChefCharacter emotion="happy" />);

      jest.advanceTimersByTime(3500);

      await waitFor(() => {
        expect(useAnimation).toHaveBeenCalled();
      });
    });

    it('should clear blink interval on unmount', () => {
      const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
      const { unmount } = render(<ChefCharacter emotion="happy" />);

      unmount();

      expect(clearIntervalSpy).toHaveBeenCalled();
      clearIntervalSpy.mockRestore();
    });

    it('should set blink interval every 3500ms', () => {
      const setIntervalSpy = jest.spyOn(global, 'setInterval');
      render(<ChefCharacter emotion="happy" />);

      expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 3500);
      setIntervalSpy.mockRestore();
    });
  });

  describe('prop variations', () => {
    it('should handle size prop as 0', () => {
      const { container } = render(<ChefCharacter emotion="happy" size={0} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '0');
      expect(svg).toHaveAttribute('height', '0');
    });

    it('should handle very large size prop', () => {
      const { container } = render(<ChefCharacter emotion="happy" size={1000} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '1000');
      expect(svg).toHaveAttribute('height', '1400');
    });

    it('should handle fractional size prop', () => {
      const { container } = render(<ChefCharacter emotion="happy" size={50.5} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '50.5');
    });
  });

  describe('SVG structure', () => {
    it('should have correct viewBox', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 120 168');
    });

    it('should render spoon in right arm', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const lines = container.querySelectorAll('line');
      const spoonLine = Array.from(lines).find(
        (line) => line.getAttribute('x1') === '108' && line.getAttribute('y1') === '115'
      );
      expect(spoonLine).toBeInTheDocument();
    });

    it('should render spoon head', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const ellipses = container.querySelectorAll('ellipse');
      const spoonHead = Array.from(ellipses).find(
        (ellipse) => ellipse.getAttribute('cx') === '119' && ellipse.getAttribute('cy') === '87'
      );
      expect(spoonHead).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should render SVG with proper structure', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width');
      expect(svg).toHaveAttribute('height');
      expect(svg).toHaveAttribute('viewBox');
    });

    it('should render motion div with inline-block display', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const motionDiv = container.querySelector('[data-testid="motion-div"]');
      expect(motionDiv).toHaveStyle({ display: 'inline-block' });
    });
  });
});