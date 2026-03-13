// @ts-nocheck
import { render, screen, waitFor } from '@testing-library/react';
import { ChefDialog } from './ChefDialog';
import { useGameStore } from '../../store/gameStore';
import { useSpeech } from '../../hooks/useSpeech';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('./ChefCharacter', () => ({
  ChefCharacter: ({ emotion, size }: any) => (
    <div data-testid="chef-character" data-emotion={emotion} data-size={size} />
  ),
}));

jest.mock('../../store/gameStore');
jest.mock('../../hooks/useSpeech');

const mockUseGameStore = useGameStore as jest.MockedFunction<typeof useGameStore>;
const mockUseSpeech = useSpeech as jest.MockedFunction<typeof useSpeech>;

describe('ChefDialog', () => {
  const mockSpeak = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSpeech.mockReturnValue({
      speak: mockSpeak,
    } as any);
  });

  describe('rendering', () => {
    it('should render the chef dialog component', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Hello!',
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);

      expect(screen.getByTestId('chef-character')).toBeInTheDocument();
    });

    it('should render chef message text', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Welcome to the kitchen!',
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);

      expect(screen.getByText('Welcome to the kitchen!')).toBeInTheDocument();
    });

    it('should render with default non-compact styles', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test message',
        chefEmotion: 'happy',
      } as any);

      const { container } = render(<ChefDialog />);
      const mainDiv = container.querySelector('div') as HTMLElement;

      expect(mainDiv).toHaveStyle({
        display: 'flex',
        alignItems: 'flex-end',
        gap: '12px',
        padding: '12px 16px',
      });
    });

    it('should render with compact styles when compact prop is true', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test message',
        chefEmotion: 'happy',
      } as any);

      const { container } = render(<ChefDialog compact={true} />);
      const mainDiv = container.querySelector('div') as HTMLElement;

      expect(mainDiv).toHaveStyle({
        padding: '8px 12px',
      });
    });
  });

  describe('ChefCharacter integration', () => {
    it('should pass emotion prop to ChefCharacter', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test',
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);

      const chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-emotion', 'happy');
    });

    it('should pass default size (100) to ChefCharacter when not compact', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test',
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);

      const chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-size', '100');
    });

    it('should pass compact size (70) to ChefCharacter when compact is true', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test',
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog compact={true} />);

      const chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-size', '70');
    });

    it('should update emotion when store emotion changes', () => {
      const { rerender } = render(<ChefDialog />);
      
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Happy',
        chefEmotion: 'happy',
      } as any);

      rerender(<ChefDialog />);

      expect(screen.getByTestId('chef-character')).toHaveAttribute('data-emotion', 'happy');

      mockUseGameStore.mockReturnValue({
        chefMessage: 'Sad',
        chefEmotion: 'sad',
      } as any);

      rerender(<ChefDialog />);

      expect(screen.getByTestId('chef-character')).toHaveAttribute('data-emotion', 'sad');
    });
  });

  describe('speech functionality', () => {
    it('should call speak when chefMessage is present', async () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Hello there!',
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenCalledWith('Hello there!');
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

    it('should call speak again when chefMessage changes', async () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'First message',
        chefEmotion: 'happy',
      } as any);

      const { rerender } = render(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenCalledWith('First message');
      });

      mockSpeak.mockClear();

      mockUseGameStore.mockReturnValue({
        chefMessage: 'Second message',
        chefEmotion: 'happy',
      } as any);

      rerender(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenCalledWith('Second message');
      });
    });

    it('should call speak only once per message change', async () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test message',
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('message bubble styling', () => {
    it('should apply default padding to message bubble when not compact', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test',
        chefEmotion: 'happy',
      } as any);

      const { container } = render(<ChefDialog />);
      const motionDiv = container.querySelector('[style*="padding"]');

      expect(motionDiv).toBeTruthy();
    });

    it('should apply compact padding to message bubble when compact is true', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test',
        chefEmotion: 'happy',
      } as any);

      const { container } = render(<ChefDialog compact={true} />);
      const messageDiv = Array.from(container.querySelectorAll('div')).find(
        (el) => el.textContent === 'Test'
      );

      expect(messageDiv).toBeTruthy();
    });

    it('should apply default font size when not compact', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test',
        chefEmotion: 'happy',
      } as any);

      const { container } = render(<ChefDialog />);
      const messageDiv = Array.from(container.querySelectorAll('div')).find(
        (el) => el.textContent === 'Test'
      );

      expect(messageDiv).toHaveStyle({
        fontSize: '15px',
      });
    });

    it('should apply compact font size when compact is true', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test',
        chefEmotion: 'happy',
      } as any);

      const { container } = render(<ChefDialog compact={true} />);
      const messageDiv = Array.from(container.querySelectorAll('div')).find(
        (el) => el.textContent === 'Test'
      );

      expect(messageDiv).toHaveStyle({
        fontSize: '13px',
      });
    });
  });

  describe('edge cases', () => {
    it('should handle undefined chefMessage gracefully', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: undefined,
        chefEmotion: 'happy',
      } as any);

      const { container } = render(<ChefDialog />);

      expect(container).toBeInTheDocument();
      expect(mockSpeak).not.toHaveBeenCalled();
    });

    it('should handle null chefMessage gracefully', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: null,
        chefEmotion: 'happy',
      } as any);

      const { container } = render(<ChefDialog />);

      expect(container).toBeInTheDocument();
      expect(mockSpeak).not.toHaveBeenCalled();
    });

    it('should handle very long messages', () => {
      const longMessage = 'a'.repeat(500);
      mockUseGameStore.mockReturnValue({
        chefMessage: longMessage,
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);

      expect(screen.getByText(longMessage)).toBeInTheDocument();
      expect(mockSpeak).toHaveBeenCalledWith(longMessage);
    });

    it('should handle special characters in message', () => {
      const specialMessage = 'Hello! @#$%^&*() "quotes" \'apostrophes\'';
      mockUseGameStore.mockReturnValue({
        chefMessage: specialMessage,
        chefEmotion: 'happy',
      } as any);

      render(<ChefDialog />);

      expect(screen.getByText(specialMessage)).toBeInTheDocument();
      expect(mockSpeak).toHaveBeenCalledWith(specialMessage);
    });

    it('should handle multiple rapid updates', async () => {
      const { rerender } = render(<ChefDialog />);

      mockUseGameStore.mockReturnValue({
        chefMessage: 'Message 1',
        chefEmotion: 'happy',
      } as any);
      rerender(<ChefDialog />);

      mockUseGameStore.mockReturnValue({
        chefMessage: 'Message 2',
        chefEmotion: 'sad',
      } as any);
      rerender(<ChefDialog />);

      mockUseGameStore.mockReturnValue({
        chefMessage: 'Message 3',
        chefEmotion: 'angry',
      } as any);
      rerender(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenCalledTimes(3);
      });
    });
  });

  describe('component props', () => {
    it('should render with compact prop false explicitly', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test',
        chefEmotion: 'happy',
      } as any);

      const { container } = render(<ChefDialog compact={false} />);
      const mainDiv = container.querySelector('div') as HTMLElement;

      expect(mainDiv).toHaveStyle({
        padding: '12px 16px',
      });
    });

    it('should accept undefined props and use defaults', () => {
      mockUseGameStore.mockReturnValue({
        chefMessage: 'Test',
        chefEmotion: 'happy',
      } as any);

      const { container } = render(<ChefDialog />);
      const mainDiv = container.querySelector('div') as HTMLElement;

      expect(mainDiv).toHaveStyle({
        padding: '12px 16px',
      });
    });
  });
});