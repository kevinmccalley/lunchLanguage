// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { ChefCharacter } from './ChefCharacter';
import type { GameState } from '../../types';

describe('ChefCharacter', () => {
  describe('rendering', () => {
    it('should render the component with default size', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '120');
      expect(svg).toHaveAttribute('height', '168');
    });

    it('should render with custom size', () => {
      const customSize = 200;
      const { container } = render(
        <ChefCharacter emotion="happy" size={customSize} />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '200');
      expect(svg).toHaveAttribute('height', '280');
    });

    it('should render motion div with correct style', () => {
      const { container } = render(<ChefCharacter emotion="happy" size={150} />);
      const motionDiv = container.querySelector('[style*="display: inline-block"]');
      expect(motionDiv).toHaveStyle({
        display: 'inline-block',
        width: '150px',
        height: '210px',
      });
    });

    it('should render all chef character elements', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.querySelectorAll('rect').length).toBeGreaterThan(0);
      expect(svg?.querySelectorAll('circle').length).toBeGreaterThan(0);
      expect(svg?.querySelectorAll('path').length).toBeGreaterThan(0);
    });
  });

  describe('emotion expressions', () => {
    it('should render normal eyes for non-cheering emotions', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const circles = container.querySelectorAll('circle');
      const eyeCircles = Array.from(circles).filter(
        (c) => c.getAttribute('cx') === '50' || c.getAttribute('cx') === '70'
      );
      expect(eyeCircles.length).toBeGreaterThan(0);
    });

    it('should render arc eyes for cheering emotion', () => {
      const { container } = render(<ChefCharacter emotion="cheering" />);
      const paths = container.querySelectorAll('path');
      const happyEyePaths = Array.from(paths).filter(
        (p) => p.getAttribute('d')?.includes('Q52 70 56') ||
               p.getAttribute('d')?.includes('Q68 70 72')
      );
      expect(happyEyePaths.length).toBeGreaterThan(0);
    });

    it('should render thinking eyebrows for thinking emotion', () => {
      const { container } = render(<ChefCharacter emotion="thinking" />);
      const paths = container.querySelectorAll('path');
      const thinkingEyebrows = Array.from(paths).filter(
        (p) => p.getAttribute('d')?.includes('Q50 62 56') ||
               p.getAttribute('d')?.includes('Q70 67 76')
      );
      expect(thinkingEyebrows.length).toBeGreaterThan(0);
    });

    it('should render normal eyebrows for non-thinking emotions', () => {
      const { container } = render(<ChefCharacter emotion="excited" />);
      const paths = container.querySelectorAll('path');
      const normalEyebrows = Array.from(paths).filter(
        (p) => p.getAttribute('d')?.includes('Q50 64 56') ||
               p.getAttribute('d')?.includes('Q70 64 76')
      );
      expect(normalEyebrows.length).toBeGreaterThan(0);
    });

    it('should render happy mouth for excited emotion', () => {
      const { container } = render(<ChefCharacter emotion="excited" />);
      const paths = container.querySelectorAll('path');
      const excitedMouth = Array.from(paths).find(
        (p) => p.getAttribute('d') === 'M48 90 Q60 100 72 90'
      );
      expect(excitedMouth).toBeInTheDocument();
    });

    it('should render happy mouth for cheering emotion', () => {
      const { container } = render(<ChefCharacter emotion="cheering" />);
      const paths = container.querySelectorAll('path');
      const cheeringMouth = Array.from(paths).find(
        (p) => p.getAttribute('d') === 'M48 90 Q60 100 72 90'
      );
      expect(cheeringMouth).toBeInTheDocument();
    });

    it('should render thinking mouth for thinking emotion', () => {
      const { container } = render(<ChefCharacter emotion="thinking" />);
      const paths = container.querySelectorAll('path');
      const thinkingMouth = Array.from(paths).find(
        (p) => p.getAttribute('d') === 'M50 93 Q60 90 70 93'
      );
      expect(thinkingMouth).toBeInTheDocument();
    });

    it('should render neutral mouth for happy emotion', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const paths = container.querySelectorAll('path');
      const neutralMouth = Array.from(paths).find(
        (p) => p.getAttribute('d') === 'M48 91 Q60 99 72 91'
      );
      expect(neutralMouth).toBeInTheDocument();
    });

    it('should render neutral mouth for pointing emotion', () => {
      const { container } = render(<ChefCharacter emotion="pointing" />);
      const paths = container.querySelectorAll('path');
      const neutralMouth = Array.from(paths).find(
        (p) => p.getAttribute('d') === 'M48 91 Q60 99 72 91'
      );
      expect(neutralMouth).toBeInTheDocument();
    });
  });

  describe('facial features', () => {
    it('should render face circle', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const faceCircle = container.querySelector('circle[cx="60"][cy="80"]');
      expect(faceCircle).toBeInTheDocument();
      expect(faceCircle).toHaveAttribute('r', '30');
      expect(faceCircle).toHaveAttribute('fill', '#fcd5a8');
    });

    it('should render cheeks', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const cheeks = container.querySelectorAll('circle[r="7"]');
      expect(cheeks.length).toBe(2);
    });

    it('should render moustache', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const paths = container.querySelectorAll('path');
      const moustache = Array.from(paths).find(
        (p) => p.getAttribute('d')?.includes('M46 86')
      );
      expect(moustache).toBeInTheDocument();
    });

    it('should render chef hat elements', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const hatBand = container.querySelector('rect[x="28"][y="48"]');
      const hatTop = container.querySelector('rect[x="36"][y="10"]');
      expect(hatBand).toBeInTheDocument();
      expect(hatTop).toBeInTheDocument();
    });
  });

  describe('body and clothing', () => {
    it('should render apron', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const apron = container.querySelector('rect[x="40"][y="112"]');
      expect(apron).toBeInTheDocument();
      expect(apron).toHaveAttribute('fill', 'white');
    });

    it('should render apron pocket', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const pocket = container.querySelector('rect[x="48"][y="140"]');
      expect(pocket).toBeInTheDocument();
    });

    it('should render legs', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const legs = container.querySelectorAll('rect[y="154"]');
      expect(legs.length).toBe(2);
    });

    it('should render shoes', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const shoes = container.querySelectorAll('ellipse');
      const shoeElements = Array.from(shoes).filter(
        (s) => s.getAttribute('cy') === '165'
      );
      expect(shoeElements.length).toBe(2);
    });
  });

  describe('arms and accessories', () => {
    it('should render both arms', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const armRects = container.querySelectorAll('rect[x*="10"][height="14"]');
      expect(armRects.length).toBeGreaterThanOrEqual(2);
    });

    it('should render hands', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const hands = container.querySelectorAll('circle[r="8"]');
      expect(hands.length).toBeGreaterThanOrEqual(2);
    });

    it('should render spoon on right arm', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const spoonLine = container.querySelector('line[x1="108"]');
      const spoonBowl = container.querySelector('ellipse[cx="119"]');
      expect(spoonLine).toBeInTheDocument();
      expect(spoonBowl).toBeInTheDocument();
    });
  });

  describe('emotion prop variations', () => {
    const emotions: GameState['chefEmotion'][] = [
      'happy',
      'excited',
      'cheering',
      'thinking',
      'pointing',
    ];

    emotions.forEach((emotion) => {
      it(`should render without errors for ${emotion} emotion`, () => {
        const { container } = render(<ChefCharacter emotion={emotion} />);
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
      });
    });
  });

  describe('size prop edge cases', () => {
    it('should handle very small size', () => {
      const { container } = render(<ChefCharacter emotion="happy" size={50} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '50');
      expect(svg).toHaveAttribute('height', '70');
    });

    it('should handle very large size', () => {
      const { container } = render(<ChefCharacter emotion="happy" size={500} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '500');
      expect(svg).toHaveAttribute('height', '700');
    });

    it('should handle fractional size', () => {
      const { container } = render(<ChefCharacter emotion="happy" size={123.5} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '123.5');
      expect(svg).toHaveAttribute('height', '172.9');
    });
  });

  describe('default prop values', () => {
    it('should use default size of 120 when not provided', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '120');
      expect(svg).toHaveAttribute('height', '168');
    });
  });

  describe('viewBox and SVG structure', () => {
    it('should have correct viewBox', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 120 168');
    });

    it('should have fill="none" on svg', () => {
      const { container } = render(<ChefCharacter emotion="happy" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('fill', 'none');
    });
  });
});