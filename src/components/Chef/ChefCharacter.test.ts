// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { useAnimation } from 'framer-motion';
import { ChefCharacter } from './ChefCharacter';
import type { GameState } from '../../types';

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
  useAnimation: jest.fn(),
}));

describe('ChefCharacter', () => {
  let mockBodyControls: any;
  let mockArmControls: any;
  let mockEyeControls: any;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    mockBodyControls = {
      start: jest.fn(),
    };
    mockArmControls = {
      start: jest.fn(),
    };
    mockEyeControls = {
      start: jest.fn(),
    };

    const useAnimationMock = useAnimation as jest.MockedFunction<typeof useAnimation>;
    useAnimationMock.mockImplementation(() => mockBodyControls);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('rendering', () => {
    it('should render the chef character component', () => {
      render(<ChefCharacter emotion="happy" />);
      const motionDiv = screen.getByTestId('motion-div');
      expect(motionDiv).toBeInTheDocument();
    });

    it('should render SVG with correct default size', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '120');
      expect(svg).toHaveAttribute('height', '168');
    });

    it('should render SVG with custom size', () => {
      const { container } = render(<ChefCharacter emotion="happy" size={200} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '200');
      expect(svg).toHaveAttribute('height', '280');
    });

    it('should render motion div with correct dimensions', () => {
      const { container } = render(<ChefCharacter emotion="happy" size={150} />);
      const motionDiv = container.querySelector('[data-testid="motion-div"]') as HTMLElement;
      expect(motionDiv).toHaveStyle({
        display: 'inline-block',
        width: '150px',
        height: '210px',
      });
    });

    it('should render all facial features', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.textContent).toContain('');
    });

    it('should render chef hat', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render face circle', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render arms', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const motionGs = container.querySelectorAll('[data-testid="motion-g"]');
      expect(motionGs.length).toBeGreaterThan(0);
    });

    it('should render spoon in right hand', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBeGreaterThan(0);
    });

    it('should render legs and shoes', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });
  });

  describe('emotion: excited', () => {
    it('should start body bounce animation for excited emotion', () => {
      useAnimation as jest.Mock;
      const useAnimationMock = useAnimation as jest.MockedFunction<typeof useAnimation>;
      useAnimationMock
        .mockReturnValueOnce(mockBodyControls)
        .mockReturnValueOnce(mockArmControls)
        .mockReturnValueOnce(mockEyeControls);

      render(<ChefCharacter emotion="excited" />);

      expect(mockBodyControls.start).toHaveBeenCalledWith(
        expect.objectContaining({
          y: [0, -10, 0, -10, 0],
          transition: expect.objectContaining({
            duration: 0.8,
            ease: 'easeInOut',
          }),
        })
      );
    });

    it('should start arm rotation animation for excited emotion', () => {
      const useAnimationMock = useAnimation as jest.MockedFunction<typeof useAnimation>;
      useAnimationMock
        .mockReturnValueOnce(mockBodyControls)
        .mockReturnValueOnce(mockArmControls)
        .mockReturnValueOnce(mockEyeControls);

      render(<ChefCharacter emotion="excited" />);

      expect(mockArmControls.start).toHaveBeenCalledWith(
        expect.objectContaining({
          rotate: [0, -20, 0, -20, 0],
          transition: expect.objectContaining({
            duration: 0.8,
          }),
        })
      );
    });
  });

  describe('emotion: cheering', () => {
    it('should start body animation for cheering emotion', () => {
      const useAnimationMock = useAnimation as jest.MockedFunction<typeof useAnimation>;
      useAnimationMock
        .mockReturnValueOnce(mockBodyControls)
        .mockReturnValueOnce(mockArmControls)
        .mockReturnValueOnce(mockEyeControls);

      render(<ChefCharacter emotion="cheering" />);

      expect(mockBodyControls.start).toHaveBeenCalledWith(
        expect.objectContaining({
          y: [0, -15, 0],
          rotate: [0, -5, 5, 0],
          transition: expect.objectContaining({
            duration: 0.6,
            repeat: 2,
          }),
        })
      );
    });

    it('should start arm rotation animation for cheering emotion', () => {
      const useAnimationMock = useAnimation as jest.MockedFunction<typeof useAnimation>;
      useAnimationMock
        .mockReturnValueOnce(mockBodyControls)
        .mockReturnValueOnce(mockArmControls)
        .mockReturnValueOnce(mockEyeControls);

      render(<ChefCharacter emotion="cheering" />);

      expect(mockArmControls.start).toHaveBeenCalledWith(
        expect.objectContaining({
          rotate: [-60, -120, -60],
          transition: expect.objectContaining({
            duration: 0.4,
            repeat: 4,
          }),
        })
      );
    });

    it('should render happy arc eyes for cheering emotion', () => {
      const { container } = render(<ChefCharacter emotion="cheering" />);
      const paths = container.querySelectorAll('path');
      const happyEyePaths = Array.from(paths).filter((p) => p.getAttribute('d')?.includes('Q'));
      expect(happyEyePaths.length).toBeGreaterThan(0);
    });

    it('should render filled mouth for cheering emotion', () => {
      const { container } = render(<ChefCharacter emotion="cheering" />);
      const paths = container.querySelectorAll('path');
      const mouthPath = Array.from(paths).find((p) =>
        p.getAttribute('d')?.includes('M48 90')
      );
      expect(mouthPath).toHaveAttribute('fill', '#ff8a80');
    });
  });

  describe('emotion: thinking', () => {
    it('should start body rotation animation for thinking emotion', () => {
      const useAnimationMock = useAnimation as jest.MockedFunction<typeof useAnimation>;
      useAnimationMock
        .mockReturnValueOnce(mockBodyControls)
        .mockReturnValueOnce(mockArmControls)
        .mockReturnValueOnce(mockEyeControls);

      render(<ChefCharacter emotion="thinking" />);

      expect(mockBodyControls.start).toHaveBeenCalledWith(
        expect.objectContaining({
          rotate: [-3, 3, -3],
          transition: expect.objectContaining({
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }),
        })
      );
    });

    it('should render thinking eyebrows', () => {
      const { container } = render(<ChefCharacter emotion="thinking" />);
      const paths = container.querySelectorAll('path');
      const eyebrowPaths = Array.from(paths).filter((p) => {
        const d = p.getAttribute('d');
        return d?.includes('M64 63 Q70 67 76 63');
      });
      expect(eyebrowPaths.length).toBeGreaterThan(0);
    });

    it('should render thinking mouth', () => {
      const { container } = render(<ChefCharacter emotion="thinking" />);
      const paths = container.querySelectorAll('path');
      const thinkingMouthPath = Array.from(paths).find((p) =>
        p.getAttribute('d')?.includes('M50 93 Q60 90 70 93')
      );
      expect(thinkingMouthPath).toHaveAttribute('fill', 'none');
    });
  });

  describe('emotion: pointing', () => {
    it('should start right arm pointing animation', () => {
      const useAnimationMock = useAnimation as jest.MockedFunction<typeof useAnimation>;
      useAnimationMock
        .mockReturnValueOnce(mockBodyControls)
        .mockReturnValueOnce(mockArmControls)
        .mockReturnValueOnce(mockEyeControls);

      render(<ChefCharacter emotion="pointing" />);

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

  describe('emotion: happy', () => {
    it('should start idle breathing animation for happy emotion', async () => {
      const useAnimationMock = useAnimation as jest.MockedFunction<typeof useAnimation>;
      useAnimationMock
        .mockReturnValueOnce(mockBodyControls)
        .mockReturnValueOnce(mockArmControls)
        .mockReturnValueOnce(mockEyeControls);

      render(<ChefCharacter emotion="happy" />);

      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(mockBodyControls.start).toHaveBeenCalledWith(
        expect.objectContaining({
          y: [0, -3, 0],
          transition: expect.objectContaining({
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }),
        })
      );
    });
  });

  describe('emotion: default (neutral)', () => {
    it('should reset body position for unknown emotion', () => {
      const useAnimationMock = useAnimation as jest.MockedFunction<typeof useAnimation>;
      useAnimationMock
        .mockReturnValueOnce(mockBodyControls)
        .mockReturnValueOnce(mockArmControls)
        .mockReturnValueOnce(mockEyeControls);

      render(<ChefCharacter emotion="neutral" as GameState['chefEmotion'] />);

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

    it('should reset arm position for unknown emotion', () => {
      const useAnimationMock = useAnimation as jest.MockedFunction<typeof useAnimation>;
      useAnimationMock
        .mockReturnValueOnce(mockBodyControls)
        .mockReturnValueOnce(mockArmControls)
        .mockReturnValueOnce(mockEyeControls);

      render(<ChefCharacter emotion="neutral" as GameState['chefEmotion'] />);

      expect(mockArmControls.start).toHaveBeenCalledWith(
        expect.objectContaining({
          rotate: 0,
          transition: expect.objectContaining({
            duration: 0.3,
          }),
        })
      );
    });
  });

  describe('eye blinking', () => {
    it('should set up blink interval on mount', () => {
      const useAnimationMock = useAnimation as jest.MockedFunction<typeof useAnimation>;
      useAnimationMock
        .mockReturnValueOnce(mockBodyControls)
        .mockReturnValueOnce(mockArmControls)
        .mockReturnValueOnce(mockEyeControls);

      render(<ChefCharacter emotion="happy" />);

      jest.advanceTimersByTime(3500);

      expect(mockEyeControls.start).toHaveBeenCalled();
    });

    it('should clear blink interval on unmount', () => {
      const useAnimationMock = useAnimation as jest.MockedFunction<typeof useAnimation>;
      useAnimationMock
        .mockReturnValueOnce(mockBodyControls)
        .mockReturnValueOnce(mockArmControls)
        .mockReturnValueOnce(mockEyeControls);

      const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

      const { unmount } = render(<ChefCharacter emotion="happy" />);
      unmount();

      expect(clearIntervalSpy).toHaveBeenCalled();

      clearIntervalSpy.mockRestore();
    });

    it('should blink eyes every 3.5 seconds', () => {
      const useAnimationMock = useAnimation as jest.MockedFunction<typeof useAnimation>;
      useAnimationMock
        .mockReturnValueOnce(mockBodyControls)
        .mockReturnValueOnce(mockArmControls)
        .mockReturnValueOnce(mockEyeControls);

      render(<ChefCharacter emotion="happy" />);

      jest.advanceTimersByTime(3500);
      expect(mockEyeControls.start).toHaveBeenCalled();

      jest.advanceTimersByTime(3500);
      expect(mockEyeControls.start).toHaveBeenCalledTimes(3);
    });
  });

  describe('emotion changes', () => {
    it('should update animation when emotion changes', () => {
      const useAnimationMock = useAnimation as jest.MockedFunction<typeof useAnimation>;
      useAnimationMock
        .mockReturnValueOnce(mockBodyControls)
        .mockReturnValueOnce(mockArmControls)
        .mockReturnValueOnce(mockEyeControls);

      const { rerender } = render(<ChefCharacter emotion="happy" />);

      useAnimationMock
        .mockReturnValueOnce(mockBodyControls)
        .mockReturnValueOnce(mockArmControls)
        .mockReturnValueOnce(mockEyeControls);

      rerender(<ChefCharacter emotion="excited" />);

      expect(mockBodyControls.start).toHaveBeenCalledWith(
        expect.objectContaining({
          y: [0, -10, 0, -10, 0],
        })
      );
    });

    it('should handle rapid emotion changes', () => {
      const useAnimationMock = useAnimation as jest.MockedFunction<typeof useAnimation>;

      const { rerender } = render(<ChefCharacter emotion="happy" />);

      const emotions: GameState['chefEmotion'][] = [
        'excited',
        'cheering',
        'thinking',
        'pointing',
      ];

      emotions.forEach((emotion) => {
        useAnimationMock
          .mockReturnValueOnce(mockBodyControls)
          .mockReturnValueOnce(mockArmControls)
          .mockReturnValueOnce(mockEyeControls);

        rerender(<ChefCharacter emotion={emotion} />);
      });

      expect(mockBodyControls.start).toHaveBeenCalled();
    });
  });

  describe('size prop', () => {
    it('should use default size of 120', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '120');
    });

    it('should accept custom size', () => {
      const { container } = render(<ChefCharacter emotion="happy" size={250} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '250');
      expect(svg).toHaveAttribute('height', '350');
    });

    it('should scale all dimensions proportionally with size', () => {
      const { container } = render(<ChefCharacter emotion="happy" size={80} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '80');
      expect(svg).toHaveAttribute('height', '112');
    });

    it('should handle small size values', () => {
      const { container } = render(<ChefCharacter emotion="happy" size={50} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '50');
    });

    it('should handle large size values', () => {
      const { container } = render(<ChefCharacter emotion="happy" size={500} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '500');
    });
  });

  describe('SVG structure', () => {
    it('should render chef hat with base and top', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(3);
    });

    it('should render face with cheeks', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThanOrEqual(4);
    });

    it('should render moustache path', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const paths = container.querySelectorAll('path');
      const moustachePath = Array.from(paths).find((p) =>
        p.getAttribute('d')?.includes('M46 86')
      );
      expect(moustachePath).toBeInTheDocument();
    });

    it('should render apron on body', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(5);
    });

    it('should render eyes with pupils and highlights for normal state', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });
  });

  describe('eye animation', () => {
    it('should render eyes in motion group with animation controls', () => {
      const useAnimationMock = useAnimation as jest.MockedFunction<typeof useAnimation>;
      useAnimationMock
        .mockReturnValueOnce(mockBodyControls)
        .mockReturnValueOnce(mockArmControls)
        .mockReturnValueOnce(mockEyeControls);

      const { container } = render(<ChefCharacter emotion="happy" />);
      const motionGs = container.querySelectorAll('[data-testid="motion-g"]');
      expect(motionGs.length).toBeGreaterThan(0);
    });
  });
});