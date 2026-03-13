// @ts-nocheck
import { render, screen, waitFor } from '@testing-library/react';
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
    mockUseSpeech.mockReturnValue({ speak: mockSpeak });
  });

  describe('rendering', () => {
    it('should render the ChefDialog component', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Hello!',
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);

      expect(screen.getByText('Hello!')).toBeInTheDocument();
    });

    it('should render with default compact prop as false', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test message',
        chefEmotion: 'neutral',
      } as any);

      render(<ChefDialog />);
      const chefCharacter = screen.getByTestId('chef-character');

      expect(chefCharacter).toHaveAttribute('data-size', '100');
    });

    it('should render with compact prop as true', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test message',
        chefEmotion: 'neutral',
      } as any);

      render(<ChefDialog compact={true} />);
      const chefCharacter = screen.getByTestId('chef-character');

      expect(chefCharacter).toHaveAttribute('data-size', '70');
    });

    it('should render ChefCharacter with correct emotion', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Hello!',
        chefEmotion: 'excited',
      } as any);

      render(<ChefDialog />);
      const chefCharacter = screen.getByTestId('chef-character');

      expect(chefCharacter).toHaveAttribute('data-emotion', 'excited');
    });

    it('should render the speech bubble with correct styling for non-compact mode', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Welcome to the kitchen!',
        chefEmotion: 'happy',
      } as any);

      const { container } = render(<ChefDialog compact={false} />);
      const speechBubble = container.querySelector(
        'div[style*="background: white"]'
      );

      expect(speechBubble).toHaveStyle({
        background: 'white',
        borderRadius: '16px',
        padding: '14px 18px',
        maxWidth: '320px',
        border: '2px solid #ff6b35',
        fontSize: '15px',
        lineHeight: '1.5',
        color: '#2c2c2c',
        fontWeight: '500',
      });
    });

    it('should render the speech bubble with correct styling for compact mode', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Compact message',
        chefEmotion: 'happy',
      } as any);

      const { container } = render(<ChefDialog compact={true} />);
      const speechBubbles = container.querySelectorAll(
        'div[style*="background: white"]'
      );

      const compactBubble = Array.from(speechBubbles).find((bubble) =>
        bubble.textContent?.includes('Compact message')
      );

      expect(compactBubble).toHaveStyle('padding: 10px 14px');
      expect(compactBubble).toHaveStyle('fontSize: 13px');
    });

    it('should render speech bubble tail elements', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test',
        chefEmotion: 'happy',
      } as any);

      const { container } = render(<ChefDialog />);
      const divs = container.querySelectorAll('div');

      let tailCount = 0;
      divs.forEach((div) => {
        const style = window.getComputedStyle(div);
        if (
          style.borderRight === '14px solid rgb(255, 107, 53)' ||
          style.borderRight === '13px solid white'
        ) {
          tailCount++;
        }
      });

      expect(tailCount).toBeGreaterThan(0);
    });
  });

  describe('speech functionality', () => {
    it('should call speak when chefMessage is present', async () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Hello Chef!',
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenCalledWith('Hello Chef!');
      });
    });

    it('should not call speak when chefMessage is empty', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: '',
        chefEmotion: 'neutral',
      } as any);

      render(<ChefDialog />);

      expect(mockSpeak).not.toHaveBeenCalled();
    });

    it('should call speak when chefMessage changes', async () => {
      const { rerender } = render(<ChefDialog />);

      mockUseGameStore.mockReturnValue({
        chefMessage: 'First message',
        chefEmotion: 'happy',
      } as any);

      rerender(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenCalledWith('First message');
      });

      mockUseGameStore.mockReturnValue({
        chefMessage: 'Second message',
        chefEmotion: 'excited',
      } as any);

      rerender(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenLastCalledWith('Second message');
      });
    });

    it('should speak multiple times for different messages', async () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Message 1',
        chefEmotion: 'happy',
      } as any);

      const { rerender } = render(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenCalledWith('Message 1');
      });

      mockUseGameStore.mockReturnValue({
        chefMessage: 'Message 2',
        chefEmotion: 'excited',
      } as any);

      rerender(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('emotion handling', () => {
    it('should pass different emotions to ChefCharacter', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Happy!',
        chefEmotion: 'happy',
      } as any);

      const { rerender } = render(<ChefDialog />);
      let chefCharacter = screen.getByTestId('chef-character');

      expect(chefCharacter).toHaveAttribute('data-emotion', 'happy');

      mockUseGameStore.mockReturnValue({
        chefMessage: 'Sad!',
        chefEmotion: 'sad',
      } as any);

      rerender(<ChefDialog />);
      chefCharacter = screen.getByTestId('chef-character');

      expect(chefCharacter).toHaveAttribute('data-emotion', 'sad');
    });

    it('should handle various emotion types', () => {
      const emotions = ['happy', 'sad', 'excited', 'neutral', 'confused'];

      emotions.forEach((emotion) => {
        mockUseGameStore.mockReturnValue({
          chefMessage: `${emotion} message`,
          chefEmotion: emotion,
        } as any);

        const { unmount } = render(<ChefDialog />);
        const chefCharacter = screen.getByTestId('chef-character');

        expect(chefCharacter).toHaveAttribute('data-emotion', emotion);

        unmount();
      });
    });
  });

  describe('message display', () => {
    it('should display the chef message content', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Welcome to the kitchen!',
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);

      expect(screen.getByText('Welcome to the kitchen!')).toBeInTheDocument();
    });

    it('should display empty string when message is empty', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: '',
        chefEmotion: 'neutral',
      } as any);

      render(<ChefDialog />);

      const container = screen.getByTestId('chef-character').parentElement;
      expect(container).toBeInTheDocument();
    });

    it('should handle long messages', () => {
      const longMessage =
        'This is a very long message that should be displayed in the speech bubble. It contains multiple words and should wrap appropriately within the maxWidth constraint.';

      mockUseGameStore.mockReturnValue({
        chefMessage: longMessage,
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);

      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it('should handle special characters in messages', () => {
      const specialMessage = "Let's cook! 🍳 Delicious & tasty!";

      mockUseGameStore.mockReturnValue({
        chefMessage: specialMessage,
        chefEmotion: 'excited',
      } as any);

      render(<ChefDialog />);

      expect(screen.getByText(specialMessage)).toBeInTheDocument();
    });
  });

  describe('layout and styling', () => {
    it('should apply correct padding for non-compact mode', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test',
        chefEmotion: 'happy',
      } as any);

      const { container } = render(<ChefDialog compact={false} />);
      const wrapper = container.firstChild as HTMLElement;

      expect(wrapper).toHaveStyle('padding: 12px 16px');
    });

    it('should apply correct padding for compact mode', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test',
        chefEmotion: 'happy',
      } as any);

      const { container } = render(<ChefDialog compact={true} />);
      const wrapper = container.firstChild as HTMLElement;

      expect(wrapper).toHaveStyle('padding: 8px 12px');
    });

    it('should have flex layout with correct properties', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test',
        chefEmotion: 'happy',
      } as any);

      const { container } = render(<ChefDialog />);
      const wrapper = container.firstChild as HTMLElement;

      expect(wrapper).toHaveStyle('display: flex');
      expect(wrapper).toHaveStyle('alignItems: flex-end');
      expect(wrapper).toHaveStyle('gap: 12px');
    });
  });

  describe('edge cases', () => {
    it('should handle undefined chefMessage gracefully', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: undefined,
        chefEmotion: 'neutral',
      } as any);

      render(<ChefDialog />);

      expect(screen.getByTestId('chef-character')).toBeInTheDocument();
    });

    it('should handle null chefMessage gracefully', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: null,
        chefEmotion: 'neutral',
      } as any);

      render(<ChefDialog />);

      expect(screen.getByTestId('chef-character')).toBeInTheDocument();
    });

    it('should handle rapidly changing messages', async () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Message 1',
        chefEmotion: 'happy',
      } as any);

      const { rerender } = render(<ChefDialog />);

      for (let i = 2; i <= 5; i++) {
        mockUseGameStore.mockReturnValue({
          chefMessage: `Message ${i}`,
          chefEmotion: 'happy',
        } as any);

        rerender(<ChefDialog />);
      }

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenCalledWith('Message 5');
      });
    });

    it('should maintain component stability with both compact modes', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test',
        chefEmotion: 'happy',
      } as any);

      const { rerender } = render(<ChefDialog compact={false} />);
      expect(screen.getByText('Test')).toBeInTheDocument();

      rerender(<ChefDialog compact={true} />);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });
});