// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { ChefDialog } from './ChefDialog';
import { useGameStore } from '../../store/gameStore';
import { useSpeech } from '../../hooks/useSpeech';

jest.mock('../../store/gameStore');
jest.mock('../../hooks/useSpeech');
jest.mock('./ChefCharacter', () => ({
  ChefCharacter: ({ emotion, size }: { emotion: string; size: number }) => (
    <div data-testid="chef-character" data-emotion={emotion} data-size={size} />
  ),
}));

describe('ChefDialog', () => {
  const mockSpeak = jest.fn();
  const mockUseGameStore = useGameStore as jest.MockedFunction<typeof useGameStore>;
  const mockUseSpeech = useSpeech as jest.MockedFunction<typeof useSpeech>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSpeech.mockReturnValue({ speak: mockSpeak } as any);
    mockUseGameStore.mockReturnValue({
      chefMessage: 'Hello, chef!',
      chefEmotion: 'happy',
    } as any);
  });

  describe('rendering', () => {
    it('should render chef dialog with default compact prop as false', () => {
      const { container } = render(<ChefDialog />);
      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toHaveStyle({
        display: 'flex',
        alignItems: 'flex-end',
        gap: '12px',
        padding: '12px 16px',
      });
    });

    it('should render chef dialog with compact padding when compact is true', () => {
      const { container } = render(<ChefDialog compact={true} />);
      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toHaveStyle({
        padding: '8px 12px',
      });
    });

    it('should render chef dialog with normal padding when compact is false', () => {
      const { container } = render(<ChefDialog compact={false} />);
      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toHaveStyle({
        padding: '12px 16px',
      });
    });

    it('should render ChefCharacter component', () => {
      render(<ChefDialog />);
      const chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toBeInTheDocument();
    });

    it('should pass compact size to ChefCharacter when compact is false', () => {
      render(<ChefDialog compact={false} />);
      const chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-size', '100');
    });

    it('should pass compact size to ChefCharacter when compact is true', () => {
      render(<ChefDialog compact={true} />);
      const chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-size', '70');
    });

    it('should pass emotion from store to ChefCharacter', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test message',
        chefEmotion: 'sad',
      } as any);
      render(<ChefDialog />);
      const chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-emotion', 'sad');
    });

    it('should render chef message in a motion div', () => {
      render(<ChefDialog />);
      expect(screen.getByText('Hello, chef!')).toBeInTheDocument();
    });

    it('should render message bubble with correct styling', () => {
      const { container } = render(<ChefDialog />);
      const messageDiv = container.querySelector('[style*="background: white"]');
      expect(messageDiv).toBeInTheDocument();
      expect(messageDiv).toHaveStyle({
        background: 'white',
        borderRadius: '16px',
        padding: '14px 18px',
        maxWidth: '320px',
        border: '2px solid #ff6b35',
        position: 'relative',
        fontSize: '15px',
        lineHeight: '1.5',
        color: '#2c2c2c',
        fontWeight: '500',
      });
    });

    it('should render compact message bubble with correct styling', () => {
      const { container } = render(<ChefDialog compact={true} />);
      const messageDiv = container.querySelector('[style*="background: white"]');
      expect(messageDiv).toHaveStyle({
        fontSize: '13px',
        padding: '10px 14px',
      });
    });

    it('should render speech bubble tail elements', () => {
      const { container } = render(<ChefDialog />);
      const borderDivs = container.querySelectorAll('div[style*="border"]');
      expect(borderDivs.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('speech bubble tail styling', () => {
    it('should render outer tail with correct border styles', () => {
      const { container } = render(<ChefDialog />);
      const tails = Array.from(container.querySelectorAll('div')).filter(
        (div) =>
          div.style.position === 'absolute' &&
          div.style.left === '-12px'
      );
      expect(tails.length).toBeGreaterThan(0);
    });

    it('should render inner tail with correct border styles', () => {
      const { container } = render(<ChefDialog />);
      const tails = Array.from(container.querySelectorAll('div')).filter(
        (div) =>
          div.style.position === 'absolute' &&
          div.style.left === '-9px'
      );
      expect(tails.length).toBeGreaterThan(0);
    });
  });

  describe('speech synthesis', () => {
    it('should call speak when chefMessage changes', () => {
      render(<ChefDialog />);
      expect(mockSpeak).toHaveBeenCalledWith('Hello, chef!');
    });

    it('should call speak with updated message when chefMessage prop changes', () => {
      const { rerender } = render(<ChefDialog />);
      expect(mockSpeak).toHaveBeenCalledWith('Hello, chef!');

      mockUseGameStore.mockReturnValue({
        chefMessage: 'New message',
        chefEmotion: 'happy',
      } as any);

      rerender(<ChefDialog />);
      expect(mockSpeak).toHaveBeenCalledWith('New message');
      expect(mockSpeak).toHaveBeenCalledTimes(2);
    });

    it('should not call speak when chefMessage is empty string', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: '',
        chefEmotion: 'neutral',
      } as any);
      mockSpeak.mockClear();

      render(<ChefDialog />);
      expect(mockSpeak).not.toHaveBeenCalled();
    });

    it('should not call speak when chefMessage is undefined', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: undefined,
        chefEmotion: 'neutral',
      } as any);
      mockSpeak.mockClear();

      render(<ChefDialog />);
      expect(mockSpeak).not.toHaveBeenCalled();
    });

    it('should handle special characters in message', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Hello! How are you? 🍳',
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);
      expect(mockSpeak).toHaveBeenCalledWith('Hello! How are you? 🍳');
    });
  });

  describe('emotion changes', () => {
    it('should update emotion in ChefCharacter when emotion changes', () => {
      const { rerender } = render(<ChefDialog />);
      let chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-emotion', 'happy');

      mockUseGameStore.mockReturnValue({
        chefMessage: 'Hello, chef!',
        chefEmotion: 'angry',
      } as any);

      rerender(<ChefDialog />);
      chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-emotion', 'angry');
    });
  });

  describe('message display edge cases', () => {
    it('should handle very long messages', () => {
      const longMessage = 'A'.repeat(500);
      mockUseGameStore.mockReturnValue({
        chefMessage: longMessage,
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);
      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it('should handle messages with line breaks', () => {
      const multilineMessage = 'Line 1\nLine 2\nLine 3';
      mockUseGameStore.mockReturnValue({
        chefMessage: multilineMessage,
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);
      expect(screen.getByText(multilineMessage)).toBeInTheDocument();
    });

    it('should handle null values gracefully', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: null,
        chefEmotion: null,
      } as any);

      const { container } = render(<ChefDialog />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('layout structure', () => {
    it('should have flex layout with flex-end alignment', () => {
      const { container } = render(<ChefDialog />);
      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toHaveStyle({
        display: 'flex',
        alignItems: 'flex-end',
      });
    });

    it('should have correct gap between elements', () => {
      const { container } = render(<ChefDialog />);
      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toHaveStyle({ gap: '12px' });
    });
  });

  describe('useSpeech integration', () => {
    it('should get speak function from useSpeech hook', () => {
      render(<ChefDialog />);
      expect(mockUseSpeech).toHaveBeenCalled();
    });

    it('should only depend on chefMessage in useEffect', () => {
      const { rerender } = render(<ChefDialog />);
      mockSpeak.mockClear();

      mockUseGameStore.mockReturnValue({
        chefMessage: 'Hello, chef!',
        chefEmotion: 'surprised',
      } as any);

      rerender(<ChefDialog />);
      expect(mockSpeak).not.toHaveBeenCalled();
    });
  });
});