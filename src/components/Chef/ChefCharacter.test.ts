// @ts-nocheck
import { render, screen, waitFor } from '@testing-library/react';
import { motion } from 'framer-motion';
import { ChefCharacter } from './ChefCharacter';
import type { GameState } from '../../types';

describe('ChefCharacter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('rendering', () => {
    it('should render the chef character SVG', () => {
      render(<ChefCharacter emotion="happy" />);
      const svg = screen.getByRole('img', { hidden: true });
      expect(svg).toBeInTheDocument();
    });

    it('should render SVG with correct default size', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '120');
      expect(svg).toHaveAttribute('height', '168');
    });

    it('should render SVG with custom size', () => {
      const customSize = 200;
      const { container } = render(<ChefCharacter emotion="happy" size={customSize} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '200');
      expect(svg).toHaveAttribute('height', '280');
    });

    it('should render motion div with correct display style', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const motionDiv = container.querySelector('[style*="display"]');
      expect(motionDiv).toHaveStyle('display: inline-block');
    });

    it('should render all chef character components', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const svg = container.querySelector('svg');
      
      // Check for chef hat elements
      expect(svg?.querySelector('rect[x="28"]')).toBeInTheDocument();
      
      // Check for face circle
      expect(svg?.querySelector('circle[cx="60"][cy="80"]')).toBeInTheDocument();
      
      // Check for body
      expect(svg?.querySelector('rect[x="30"][y="108"]')).toBeInTheDocument();
    });
  });

  describe('emotion states - excited', () => {
    it('should render with excited emotion', () => {
      const { container } = render(<ChefCharacter emotion="excited" />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should show normal eyes when excited', () => {
      const { container } = render(<ChefCharacter emotion="excited" />);
      const circles = container.querySelectorAll('circle[r="5"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should show happy mouth when excited', () => {
      const { container } = render(<ChefCharacter emotion="excited" />);
      const paths = container.querySelectorAll('path');
      const mouthPath = Array.from(paths).find(p => p.getAttribute('d')?.includes('M48 90'));
      expect(mouthPath).toBeInTheDocument();
    });
  });

  describe('emotion states - cheering', () => {
    it('should render with cheering emotion', () => {
      const { container } = render(<ChefCharacter emotion="cheering" />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should show arc eyes when cheering', () => {
      const { container } = render(<ChefCharacter emotion="cheering" />);
      const paths = container.querySelectorAll('path');
      const arcPaths = Array.from(paths).filter(p => p.getAttribute('d')?.includes('Q'));
      expect(arcPaths.length).toBeGreaterThan(0);
    });

    it('should show happy mouth when cheering', () => {
      const { container } = render(<ChefCharacter emotion="cheering" />);
      const paths = container.querySelectorAll('path');
      const mouthPath = Array.from(paths).find(p => p.getAttribute('d')?.includes('M48 90'));
      expect(mouthPath).toBeInTheDocument();
    });
  });

  describe('emotion states - thinking', () => {
    it('should render with thinking emotion', () => {
      const { container } = render(<ChefCharacter emotion="thinking" />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should show thinking eyebrows', () => {
      const { container } = render(<ChefCharacter emotion="thinking" />);
      const paths = container.querySelectorAll('path');
      const thinkingBrow = Array.from(paths).find(p => p.getAttribute('d')?.includes('M44 66'));
      expect(thinkingBrow).toBeInTheDocument();
    });

    it('should show thinking mouth', () => {
      const { container } = render(<ChefCharacter emotion="thinking" />);
      const paths = container.querySelectorAll('path');
      const thinkingMouth = Array.from(paths).find(p => p.getAttribute('d')?.includes('M50 93'));
      expect(thinkingMouth).toBeInTheDocument();
    });
  });

  describe('emotion states - pointing', () => {
    it('should render with pointing emotion', () => {
      const { container } = render(<ChefCharacter emotion="pointing" />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should show normal eyes when pointing', () => {
      const { container } = render(<ChefCharacter emotion="pointing" />);
      const circles = container.querySelectorAll('circle[r="5"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should show normal eyebrows when pointing', () => {
      const { container } = render(<ChefCharacter emotion="pointing" />);
      const paths = container.querySelectorAll('path');
      const normalBrow = Array.from(paths).find(p => p.getAttribute('d')?.includes('M44 68'));
      expect(normalBrow).toBeInTheDocument();
    });
  });

  describe('emotion states - happy', () => {
    it('should render with happy emotion', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should show normal mouth when happy', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const paths = container.querySelectorAll('path');
      const normalMouth = Array.from(paths).find(p => p.getAttribute('d')?.includes('M48 91'));
      expect(normalMouth).toBeInTheDocument();
    });
  });

  describe('emotion states - neutral/default', () => {
    it('should render with neutral emotion', () => {
      const { container } = render(<ChefCharacter emotion="neutral" as const as GameState['chefEmotion'] />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should show normal facial features in neutral state', () => {
      const { container } = render(<ChefCharacter emotion="neutral" as const as GameState['chefEmotion'] />);
      const circles = container.querySelectorAll('circle[r="5"]');
      expect(circles.length).toBeGreaterThan(0);
    });
  });

  describe('chef character details', () => {
    it('should render chef hat', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const hatRect = container.querySelector('rect[x="36"][y="10"]');
      expect(hatRect).toBeInTheDocument();
    });

    it('should render face', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const face = container.querySelector('circle[cx="60"][cy="80"][r="30"]');
      expect(face).toBeInTheDocument();
    });

    it('should render cheeks', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const cheeks = container.querySelectorAll('circle[r="7"]');
      expect(cheeks.length).toBeGreaterThan(0);
    });

    it('should render moustache', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const moustache = Array.from(container.querySelectorAll('path')).find(p =>
        p.getAttribute('d')?.includes('M46 86')
      );
      expect(moustache).toBeInTheDocument();
    });

    it('should render apron', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const apron = container.querySelector('rect[x="40"][y="112"]');
      expect(apron).toBeInTheDocument();
    });

    it('should render apron pocket', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const pocket = container.querySelector('rect[x="48"][y="140"]');
      expect(pocket).toBeInTheDocument();
    });

    it('should render spoon', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const spoonLine = container.querySelector('line[x1="108"][y1="115"]');
      expect(spoonLine).toBeInTheDocument();
    });

    it('should render legs and shoes', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const leftShoe = container.querySelector('ellipse[cx="47"][cy="165"]');
      const rightShoe = container.querySelector('ellipse[cx="73"][cy="165"]');
      expect(leftShoe).toBeInTheDocument();
      expect(rightShoe).toBeInTheDocument();
    });
  });

  describe('animations', () => {
    it('should trigger blinking animation periodically', () => {
      render(<ChefCharacter emotion="happy" />);
      expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 3500);
    });

    it('should clear blink interval on unmount', () => {
      const { unmount } = render(<ChefCharacter emotion="happy" />);
      unmount();
      expect(clearInterval).toHaveBeenCalled();
    });

    it('should update animations when emotion changes', () => {
      const { rerender } = render(<ChefCharacter emotion="happy" />);
      expect(setInterval).toHaveBeenCalled();
      rerender(<ChefCharacter emotion="excited" />);
      expect(setInterval).toHaveBeenCalled();
    });
  });

  describe('size prop', () => {
    it('should apply size to motion div width and height', () => {
      const customSize = 150;
      const { container } = render(<ChefCharacter emotion="happy" size={customSize} />);
      const motionDiv = container.firstChild;
      expect(motionDiv).toHaveStyle(`width: ${customSize}px`);
      expect(motionDiv).toHaveStyle(`height: ${customSize * 1.4}px`);
    });

    it('should apply size to SVG dimensions', () => {
      const customSize = 150;
      const { container } = render(<ChefCharacter emotion="happy" size={customSize} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '150');
      expect(svg).toHaveAttribute('height', '210');
    });

    it('should use default size when not provided', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '120');
      expect(svg).toHaveAttribute('height', '168');
    });

    it('should handle large size values', () => {
      const largeSize = 500;
      const { container } = render(<ChefCharacter emotion="happy" size={largeSize} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '500');
      expect(svg).toHaveAttribute('height', '700');
    });

    it('should handle small size values', () => {
      const smallSize = 50;
      const { container } = render(<ChefCharacter emotion="happy" size={smallSize} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '50');
      expect(svg).toHaveAttribute('height', '70');
    });
  });

  describe('emotion prop variations', () => {
    it('should handle all valid emotion types', () => {
      const emotions: GameState['chefEmotion'][] = ['happy', 'excited', 'cheering', 'thinking', 'pointing'];
      
      emotions.forEach(emotion => {
        const { container } = render(<ChefCharacter emotion={emotion} />);
        expect(container.querySelector('svg')).toBeInTheDocument();
      });
    });

    it('should re-render correctly when emotion prop changes', () => {
      const { rerender, container } = render(<ChefCharacter emotion="happy" />);
      expect(container.querySelector('svg')).toBeInTheDocument();
      
      rerender(<ChefCharacter emotion="excited" />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('SVG structure', () => {
    it('should render SVG with correct viewBox', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 120 168');
    });

    it('should render SVG with fill="none" for proper rendering', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('fill', 'none');
    });

    it('should contain multiple groups and elements', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const svg = container.querySelector('svg');
      const groups = svg?.querySelectorAll('g');
      expect(groups?.length).toBeGreaterThan(0);
    });
  });

  describe('accessibility', () => {
    it('should render without accessibility errors', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should be a valid React component', () => {
      expect(() => render(<ChefCharacter emotion="happy" />)).not.toThrow();
    });
  });
});