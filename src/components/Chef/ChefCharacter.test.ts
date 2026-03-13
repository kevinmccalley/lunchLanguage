// @ts-nocheck
import { render, screen, waitFor } from '@testing-library/react';
import { motion } from 'framer-motion';
import { ChefCharacter } from './ChefCharacter';
import type { GameState } from '../../types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  useAnimation: jest.fn(),
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    g: ({ children, ...props }: any) => <g {...props}>{children}</g>,
  },
}));

describe('ChefCharacter', () => {
  let mockBodyControls: any;
  let mockArmControls: any;
  let mockEyeControls: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockBodyControls = {
      start: jest.fn().mockResolvedValue(undefined),
    };
    mockArmControls = {
      start: jest.fn().mockResolvedValue(undefined),
    };
    mockEyeControls = {
      start: jest.fn().mockResolvedValue(undefined),
    };

    const { useAnimation } = require('framer-motion');
    useAnimation.mockImplementation(() => {
      const callCount = useAnimation.mock.results.length;
      if (callCount % 3 === 0) return mockBodyControls;
      if (callCount % 3 === 1) return mockArmControls;
      return mockEyeControls;
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('rendering', () => {
    it('should render the chef character component', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render SVG with correct default size', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '120');
      expect(svg?.getAttribute('height')).toBe('168');
    });

    it('should render SVG with custom size', () => {
      const customSize = 200;
      const { container } = render(
        <ChefCharacter emotion="happy" size={customSize} />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', customSize.toString());
      expect(svg?.getAttribute('height')).toBe((customSize * 1.4).toString());
    });

    it('should render chef hat', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render face with correct circle', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render both cheeks', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const circles = container.querySelectorAll('circle');
      const cheekCircles = Array.from(circles).filter(
        (c) => c.getAttribute('cx') === '40' || c.getAttribute('cx') === '80'
      );
      expect(cheekCircles.length).toBe(2);
    });

    it('should render moustache', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const paths = container.querySelectorAll('path');
      const moustachePath = Array.from(paths).find(
        (p) => p.getAttribute('d')?.includes('Q52 90') && p.getAttribute('stroke') === '#8B4513'
      );
      expect(moustachePath).toBeInTheDocument();
    });

    it('should render legs and shoes', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const rects = container.querySelectorAll('rect');
      const legRects = Array.from(rects).filter(
        (r) => r.getAttribute('y') === '154'
      );
      expect(legRects.length).toBe(2);
    });
  });

  describe('emotion: excited', () => {
    it('should start body animation with excited params', async () => {
      render(<ChefCharacter emotion="excited" />);

      await waitFor(() => {
        expect(mockBodyControls.start).toHaveBeenCalledWith(
          expect.objectContaining({
            y: expect.arrayContaining([0, -10, 0, -10, 0]),
            transition: expect.objectContaining({
              duration: 0.8,
              ease: 'easeInOut',
            }),
          })
        );
      });
    });

    it('should start arm animation with excited params', async () => {
      render(<ChefCharacter emotion="excited" />);

      await waitFor(() => {
        expect(mockArmControls.start).toHaveBeenCalledWith(
          expect.objectContaining({
            rotate: expect.arrayContaining([0, -20, 0, -20, 0]),
            transition: expect.objectContaining({
              duration: 0.8,
            }),
          })
        );
      });
    });

    it('should render regular eyes for excited emotion', () => {
      const { container } = render(
        <ChefCharacter emotion="excited" />
      );
      const circles = container.querySelectorAll('circle');
      const eyeCircles = Array.from(circles).filter(
        (c) => (c.getAttribute('cx') === '50' || c.getAttribute('cx') === '70') &&
               c.getAttribute('cy') === '76'
      );
      expect(eyeCircles.length).toBe(2);
    });

    it('should render big smile for excited emotion', () => {
      const { container } = render(
        <ChefCharacter emotion="excited" />
      );
      const paths = container.querySelectorAll('path');
      const mouthPath = Array.from(paths).find(
        (p) => p.getAttribute('d') === 'M48 90 Q60 100 72 90' &&
               p.getAttribute('fill') === '#ff8a80'
      );
      expect(mouthPath).toBeInTheDocument();
    });
  });

  describe('emotion: cheering', () => {
    it('should start body animation with cheering params', async () => {
      render(<ChefCharacter emotion="cheering" />);

      await waitFor(() => {
        expect(mockBodyControls.start).toHaveBeenCalledWith(
          expect.objectContaining({
            y: expect.arrayContaining([0, -15, 0]),
            rotate: expect.arrayContaining([0, -5, 5, 0]),
            transition: expect.objectContaining({
              duration: 0.6,
              repeat: 2,
            }),
          })
        );
      });
    });

    it('should start arm animation with cheering params', async () => {
      render(<ChefCharacter emotion="cheering" />);

      await waitFor(() => {
        expect(mockArmControls.start).toHaveBeenCalledWith(
          expect.objectContaining({
            rotate: expect.arrayContaining([-60, -120, -60]),
            transition: expect.objectContaining({
              duration: 0.4,
              repeat: 4,
            }),
          })
        );
      });
    });

    it('should render arc eyes for cheering emotion', () => {
      const { container } = render(
        <ChefCharacter emotion="cheering" />
      );
      const paths = container.querySelectorAll('path');
      const arcEyes = Array.from(paths).filter(
        (p) => p.getAttribute('d')?.includes('Q') &&
               (p.getAttribute('d')?.includes('M48 74') || p.getAttribute('d')?.includes('M64 74'))
      );
      expect(arcEyes.length).toBe(2);
    });

    it('should render big smile with fill for cheering emotion', () => {
      const { container } = render(
        <ChefCharacter emotion="cheering" />
      );
      const paths = container.querySelectorAll('path');
      const mouthPath = Array.from(paths).find(
        (p) => p.getAttribute('d') === 'M48 90 Q60 100 72 90' &&
               p.getAttribute('fill') === '#ff8a80'
      );
      expect(mouthPath).toBeInTheDocument();
    });
  });

  describe('emotion: thinking', () => {
    it('should start body animation with thinking params', async () => {
      render(<ChefCharacter emotion="thinking" />);

      await waitFor(() => {
        expect(mockBodyControls.start).toHaveBeenCalledWith(
          expect.objectContaining({
            rotate: expect.arrayContaining([-3, 3, -3]),
            transition: expect.objectContaining({
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }),
          })
        );
      });
    });

    it('should render thinking eyebrows', () => {
      const { container } = render(
        <ChefCharacter emotion="thinking" />
      );
      const paths = container.querySelectorAll('path');
      const thinkingEyebrows = Array.from(paths).filter(
        (p) => (p.getAttribute('d')?.includes('M44 66') ||
                p.getAttribute('d')?.includes('M64 63'))
      );
      expect(thinkingEyebrows.length).toBe(2);
    });

    it('should render thinking mouth', () => {
      const { container } = render(
        <ChefCharacter emotion="thinking" />
      );
      const paths = container.querySelectorAll('path');
      const thinkingMouth = Array.from(paths).find(
        (p) => p.getAttribute('d') === 'M50 93 Q60 90 70 93' &&
               p.getAttribute('fill') === 'none'
      );
      expect(thinkingMouth).toBeInTheDocument();
    });
  });

  describe('emotion: pointing', () => {
    it('should start arm animation with pointing params', async () => {
      render(<ChefCharacter emotion="pointing" />);

      await waitFor(() => {
        expect(mockArmControls.start).toHaveBeenCalledWith(
          expect.objectContaining({
            rotate: -45,
            transition: expect.objectContaining({
              duration: 0.3,
            }),
          })
        );
      });
    });

    it('should render default body state for pointing', async () => {
      render(<ChefCharacter emotion="pointing" />);

      await waitFor(() => {
        expect(mockBodyControls.start).toHaveBeenCalledWith(
          expect.objectContaining({
            y: 0,
            rotate: 0,
            transition: expect.objectContaining({
              duration: 0.3,
            }),
          })
        );
      });
    });

    it('should render spoon on right arm', () => {
      const { container } = render(
        <ChefCharacter emotion="pointing" />
      );
      const lines = container.querySelectorAll('line');
      const spoonLine = Array.from(lines).find(
        (l) => l.getAttribute('x1') === '108' && l.getAttribute('y1') === '115'
      );
      expect(spoonLine).toBeInTheDocument();
    });
  });

  describe('emotion: happy', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should start breathing animation for happy emotion', async () => {
      render(<ChefCharacter emotion="happy" />);

      await waitFor(() => {
        expect(mockBodyControls.start).toHaveBeenCalledWith(
          expect.objectContaining({
            y: expect.arrayContaining([0, -3, 0]),
            transition: expect.objectContaining({
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }),
          })
        );
      });
    });

    it('should render default eyebrows for happy emotion', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const paths = container.querySelectorAll('path');
      const normalEyebrows = Array.from(paths).filter(
        (p) => (p.getAttribute('d')?.includes('M44 68 Q50 64 56 68') ||
                p.getAttribute('d')?.includes('M64 68 Q70 64 76 68'))
      );
      expect(normalEyebrows.length).toBe(2);
    });

    it('should render default mouth for happy emotion', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const paths = container.querySelectorAll('path');
      const defaultMouth = Array.from(paths).find(
        (p) => p.getAttribute('d') === 'M48 91 Q60 99 72 91' &&
               p.getAttribute('fill') === 'none'
      );
      expect(defaultMouth).toBeInTheDocument();
    });
  });

  describe('emotion: unknown/default', () => {
    it('should reset animations for unknown emotion', async () => {
      render(<ChefCharacter emotion={'unknown' as GameState['chefEmotion']} />);

      await waitFor(() => {
        expect(mockBodyControls.start).toHaveBeenCalledWith({
          y: 0,
          rotate: 0,
          transition: { duration: 0.3 },
        });
        expect(mockArmControls.start).toHaveBeenCalledWith({
          rotate: 0,
          transition: { duration: 0.3 },
        });
      });
    });
  });

  describe('blinking animation', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should setup blink interval on mount', () => {
      const setIntervalSpy = jest.spyOn(global, 'setInterval');
      render(<ChefCharacter emotion="happy" />);
      expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 3500);
      setIntervalSpy.mockRestore();
    });

    it('should clear blink interval on unmount', () => {
      const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
      const { unmount } = render(<ChefCharacter emotion="happy" />);
      unmount();
      expect(clearIntervalSpy).toHaveBeenCalled();
      clearIntervalSpy.mockRestore();
    });

    it('should trigger blink animation at correct intervals', async () => {
      jest.useFakeTimers();
      render(<ChefCharacter emotion="happy" />);

      jest.advanceTimersByTime(3500);

      await waitFor(() => {
        expect(mockEyeControls.start).toHaveBeenCalled();
      });
    });
  });

  describe('animation dependencies', () => {
    it('should update animations when emotion prop changes', async () => {
      const { rerender } = render(<ChefCharacter emotion="happy" />);
      const initialCallCount = mockBodyControls.start.mock.calls.length;

      rerender(<ChefCharacter emotion="excited" />);

      await waitFor(() => {
        expect(mockBodyControls.start.mock.calls.length).toBeGreaterThan(
          initialCallCount
        );
      });
    });

    it('should handle rapid emotion changes', async () => {
      const { rerender } = render(<ChefCharacter emotion="happy" />);

      rerender(<ChefCharacter emotion="excited" />);
      rerender(<ChefCharacter emotion="cheering" />);
      rerender(<ChefCharacter emotion="thinking" />);

      await waitFor(() => {
        expect(mockBodyControls.start).toHaveBeenCalled();
      });
    });
  });

  describe('size prop variations', () => {
    it('should handle very small size', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" size={50} />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '50');
      expect(svg?.getAttribute('height')).toBe('70');
    });

    it('should handle very large size', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" size={500} />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '500');
      expect(svg?.getAttribute('height')).toBe('700');
    });

    it('should maintain aspect ratio with different sizes', () => {
      const size1 = 120;
      const size2 = 240;
      const { container: container1 } = render(
        <ChefCharacter emotion="happy" size={size1} />
      );
      const { container: container2 } = render(
        <ChefCharacter emotion="happy" size={size2} />
      );

      const svg1 = container1.querySelector('svg');
      const svg2 = container2.querySelector('svg');

      const ratio1 = parseInt(svg1?.getAttribute('height') || '0') / parseInt(svg1?.getAttribute('width') || '1');
      const ratio2 = parseInt(svg2?.getAttribute('height') || '0') / parseInt(svg2?.getAttribute('width') || '1');

      expect(ratio1).toBeCloseTo(ratio2, 5);
    });
  });

  describe('SVG structure', () => {
    it('should have motion div wrapper with correct styles', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" size={120} />
      );
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle({
        display: 'inline-block',
      });
    });

    it('should contain all major SVG elements', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.querySelectorAll('circle').length).toBeGreaterThan(0);
      expect(svg?.querySelectorAll('path').length).toBeGreaterThan(0);
      expect(svg?.querySelectorAll('rect').length).toBeGreaterThan(0);
    });

    it('should have correct viewBox', () => {
      const { container } = render(
        <ChefCharacter emotion="happy" />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 120 168');
    });
  });
});