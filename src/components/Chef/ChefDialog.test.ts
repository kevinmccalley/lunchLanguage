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
    mockUseSpeech.mockReturnValue({ speak: mockSpeak } as any);
    mockUseGameStore.mockReturnValue({
      chefMessage: 'Hello!',
      chefEmotion: 'happy',
    } as any);
  });

  describe('rendering', () => {
    it('should render the ChefDialog component', () => {
      render(<ChefDialog />);
      expect(screen.getByText('Hello!')).toBeInTheDocument();
    });

    it('should render ChefCharacter with default size when not compact', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test message',
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog compact={false} />);
      const chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-size', '100');
    });

    it('should render ChefCharacter with compact size when compact is true', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test message',
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog compact={true} />);
      const chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-size', '70');
    });

    it('should pass chefEmotion to ChefCharacter', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test message',
        chefEmotion: 'sad',
      } as any);

      render(<ChefDialog />);
      const chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-emotion', 'sad');
    });

    it('should render message in speech bubble', () => {
      const testMessage = 'Welcome to the kitchen!';
      mockUseGameStore.mockReturnValue({
        chefMessage: testMessage,
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);
      expect(screen.getByText(testMessage)).toBeInTheDocument();
    });

    it('should apply default padding when not compact', () => {
      const { container } = render(<ChefDialog compact={false} />);
      const mainDiv = container.querySelector('div[style*="padding"]');
      expect(mainDiv).toHaveStyle('padding: 12px 16px');
    });

    it('should apply compact padding when compact is true', () => {
      const { container } = render(<ChefDialog compact={true} />);
      const mainDiv = container.querySelector('div[style*="padding"]');
      expect(mainDiv).toHaveStyle('padding: 8px 12px');
    });
  });

  describe('speech functionality', () => {
    it('should call speak when chefMessage is present', async () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Hello!',
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenCalledWith('Hello!');
      });
    });

    it('should not call speak when chefMessage is empty string', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: '',
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);
      expect(mockSpeak).not.toHaveBeenCalled();
    });

    it('should call speak when chefMessage changes', async () => {
      const { rerender } = render(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenCalledWith('Hello!');
      });

      mockSpeak.mockClear();

      mockUseGameStore.mockReturnValue({
        chefMessage: 'New message',
        chefEmotion: 'happy',
      } as any);

      rerender(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenCalledWith('New message');
      });
    });

    it('should handle multiple message changes', async () => {
      const { rerender } = render(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenCalledWith('Hello!');
      });

      const messages = ['First message', 'Second message', 'Third message'];

      for (const message of messages) {
        mockSpeak.mockClear();
        mockUseGameStore.mockReturnValue({
          chefMessage: message,
          chefEmotion: 'happy',
        } as any);
        rerender(<ChefDialog />);

        await waitFor(() => {
          expect(mockSpeak).toHaveBeenCalledWith(message);
        });
      }
    });
  });

  describe('emotion handling', () => {
    it('should render with different emotions', () => {
      const emotions = ['happy', 'sad', 'angry', 'surprised'];

      emotions.forEach((emotion) => {
        const { unmount } = render(<ChefDialog />);
        mockUseGameStore.mockReturnValue({
          chefMessage: 'Test',
          chefEmotion: emotion,
        } as any);
        const chefCharacter = screen.getByTestId('chef-character');
        expect(chefCharacter).toHaveAttribute('data-emotion', emotion);
        unmount();
      });
    });
  });

  describe('compact mode', () => {
    it('should render with compact=true by default as false', () => {
      const { container } = render(<ChefDialog />);
      const mainDiv = container.querySelector('div[style*="padding"]');
      expect(mainDiv).toHaveStyle('padding: 12px 16px');
    });

    it('should apply all compact styles consistently', () => {
      const { container } = render(<ChefDialog compact={true} />);
      const mainDiv = container.querySelector('div[style*="padding"]');
      expect(mainDiv).toHaveStyle('padding: 8px 12px');

      const chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-size', '70');
    });
  });

  describe('speech bubble styling', () => {
    it('should render speech bubble with correct styles', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test message',
        chefEmotion: 'happy',
      } as any);

      const { container } = render(<ChefDialog />);
      const speechBubble = container.querySelector(
        'div[style*="background: white"]'
      );
      expect(speechBubble).toBeInTheDocument();
    });

    it('should render speech bubble tail elements', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test message',
        chefEmotion: 'happy',
      } as any);

      const { container } = render(<ChefDialog />);
      const divs = container.querySelectorAll('div[style*="position: absolute"]');
      expect(divs.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('edge cases', () => {
    it('should handle null chefMessage', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: null,
        chefEmotion: 'happy',
      } as any);

      const { container } = render(<ChefDialog />);
      expect(container).toBeTruthy();
    });

    it('should handle undefined chefMessage', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: undefined,
        chefEmotion: 'happy',
      } as any);

      const { container } = render(<ChefDialog />);
      expect(container).toBeTruthy();
    });

    it('should handle very long message', () => {
      const longMessage =
        'This is a very long message that should still render correctly in the speech bubble without breaking the layout or causing any issues with the component rendering.';
      mockUseGameStore.mockReturnValue({
        chefMessage: longMessage,
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);
      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it('should handle special characters in message', () => {
      const specialMessage = 'Hello! <Chef> says: "Welcome!" 🍳';
      mockUseGameStore.mockReturnValue({
        chefMessage: specialMessage,
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);
      expect(screen.getByText(specialMessage)).toBeInTheDocument();
    });
  });
});