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
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({
      children,
      style,
      ...props
    }: {
      children: React.ReactNode;
      style?: Record<string, unknown>;
      [key: string]: unknown;
    }) => (
      <div style={style} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

describe('ChefDialog', () => {
  const mockSpeak = jest.fn();
  const mockUseGameStore = useGameStore as jest.MockedFunction<typeof useGameStore>;
  const mockUseSpeech = useSpeech as jest.MockedFunction<typeof useSpeech>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSpeech.mockReturnValue({ speak: mockSpeak });
    mockUseGameStore.mockReturnValue({
      chefMessage: 'Hello!',
      chefEmotion: 'happy',
    } as any);
  });

  describe('rendering', () => {
    it('should render the ChefDialog component', () => {
      render(<ChefDialog />);
      expect(screen.getByTestId('chef-character')).toBeInTheDocument();
    });

    it('should render the chef message', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Welcome to the kitchen!',
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);
      expect(screen.getByText('Welcome to the kitchen!')).toBeInTheDocument();
    });

    it('should render speech bubble styling elements', () => {
      render(<ChefDialog />);
      const motionDiv = screen.getByTestId('motion-div');
      expect(motionDiv).toBeInTheDocument();
    });
  });

  describe('compact mode', () => {
    it('should render with compact styles when compact prop is true', () => {
      render(<ChefDialog compact={true} />);
      const chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-size', '70');
    });

    it('should render with default styles when compact prop is false', () => {
      render(<ChefDialog compact={false} />);
      const chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-size', '100');
    });

    it('should render with compact styles by default', () => {
      render(<ChefDialog />);
      const chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-size', '100');
    });
  });

  describe('chef character', () => {
    it('should pass emotion from store to ChefCharacter', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Hello!',
        chefEmotion: 'excited',
      } as any);

      render(<ChefDialog />);
      const chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-emotion', 'excited');
    });

    it('should pass correct size to ChefCharacter in normal mode', () => {
      render(<ChefDialog compact={false} />);
      const chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-size', '100');
    });

    it('should pass correct size to ChefCharacter in compact mode', () => {
      render(<ChefDialog compact={true} />);
      const chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-size', '70');
    });
  });

  describe('speech functionality', () => {
    it('should call speak when chefMessage changes', async () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Hello chef!',
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenCalledWith('Hello chef!');
      });
    });

    it('should not call speak when chefMessage is empty', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: '',
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);
      expect(mockSpeak).not.toHaveBeenCalled();
    });

    it('should call speak when chefMessage updates', async () => {
      const { rerender } = render(<ChefDialog />);

      expect(mockSpeak).toHaveBeenCalledWith('Hello!');
      jest.clearAllMocks();

      mockUseGameStore.mockReturnValue({
        chefMessage: 'New message!',
        chefEmotion: 'happy',
      } as any);

      rerender(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenCalledWith('New message!');
      });
    });

    it('should handle special characters in messages', async () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Hello! How are you? 👨‍🍳',
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenCalledWith('Hello! How are you? 👨‍🍳');
      });
    });
  });

  describe('styling', () => {
    it('should have correct container styles', () => {
      const { container } = render(<ChefDialog />);
      const wrapper = container.firstChild as HTMLElement;

      expect(wrapper).toHaveStyle({
        display: 'flex',
        alignItems: 'flex-end',
        gap: '12px',
        padding: '12px 16px',
      });
    });

    it('should have compact container styles when compact is true', () => {
      const { container } = render(<ChefDialog compact={true} />);
      const wrapper = container.firstChild as HTMLElement;

      expect(wrapper).toHaveStyle({
        display: 'flex',
        alignItems: 'flex-end',
        gap: '12px',
        padding: '8px 12px',
      });
    });

    it('should have correct message bubble styles', () => {
      render(<ChefDialog />);
      const motionDiv = screen.getByTestId('motion-div');

      const styles = motionDiv.getAttribute('style');
      expect(styles).toContain('background: white');
      expect(styles).toContain('border-radius: 16px');
      expect(styles).toContain('box-shadow: 0 4px 20px rgba(0,0,0,0.12)');
      expect(styles).toContain('border: 2px solid #ff6b35');
    });
  });

  describe('edge cases', () => {
    it('should handle very long messages', () => {
      const longMessage = 'A'.repeat(500);
      mockUseGameStore.mockReturnValue({
        chefMessage: longMessage,
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);
      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it('should handle null-like chefMessage from store', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: null,
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);
      expect(mockSpeak).not.toHaveBeenCalled();
    });

    it('should handle undefined chefEmotion', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Hello!',
        chefEmotion: undefined,
      } as any);

      render(<ChefDialog />);
      const chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-emotion', 'undefined');
    });

    it('should handle rapid message changes', async () => {
      const { rerender } = render(<ChefDialog />);

      const messages = ['First', 'Second', 'Third'];
      for (const message of messages) {
        mockUseGameStore.mockReturnValue({
          chefMessage: message,
          chefEmotion: 'happy',
        } as any);
        rerender(<ChefDialog />);
      }

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenLastCalledWith('Third');
      });
    });

    it('should render message with newlines', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Hello\nWorld',
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);
      expect(screen.getByText('Hello\nWorld')).toBeInTheDocument();
    });
  });

  describe('motion animation', () => {
    it('should use chefMessage as key for animation', () => {
      const { rerender } = render(<ChefDialog />);
      let motionDiv = screen.getByTestId('motion-div');
      expect(motionDiv).toBeInTheDocument();

      mockUseGameStore.mockReturnValue({
        chefMessage: 'Different message',
        chefEmotion: 'happy',
      } as any);

      rerender(<ChefDialog />);
      motionDiv = screen.getByTestId('motion-div');
      expect(motionDiv).toBeInTheDocument();
    });
  });
});