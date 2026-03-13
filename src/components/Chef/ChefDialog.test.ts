// @ts-nocheck
import { render, screen, waitFor } from '@testing-library/react';
import { ChefDialog } from './ChefDialog';
import { useGameStore } from '../../store/gameStore';
import { useSpeech } from '../../hooks/useSpeech';

jest.mock('../../store/gameStore');
jest.mock('../../hooks/useSpeech');
jest.mock('./ChefCharacter', () => ({
  ChefCharacter: ({ emotion, size }: { emotion: string; size: number }) => (
    <div data-testid="chef-character" data-emotion={emotion} data-size={size}>
      Chef
    </div>
  ),
}));

describe('ChefDialog', () => {
  const mockSpeak = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSpeech as jest.Mock).mockReturnValue({ speak: mockSpeak });
  });

  describe('rendering', () => {
    it('should render the chef character', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: 'Hello!',
        chefEmotion: 'happy',
      });

      render(<ChefDialog />);

      expect(screen.getByTestId('chef-character')).toBeInTheDocument();
    });

    it('should render the chef message', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: 'Welcome to the kitchen!',
        chefEmotion: 'happy',
      });

      render(<ChefDialog />);

      expect(screen.getByText('Welcome to the kitchen!')).toBeInTheDocument();
    });

    it('should render speech bubble with correct styling', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: 'Test message',
        chefEmotion: 'happy',
      });

      const { container } = render(<ChefDialog />);
      const speechBubble = container.querySelector('div[style*="background"]');

      expect(speechBubble).toHaveStyle({
        background: 'white',
        borderRadius: '16px',
        border: '2px solid #ff6b35',
      });
    });

    it('should render speech bubble tail elements', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: 'Test message',
        chefEmotion: 'happy',
      });

      const { container } = render(<ChefDialog />);
      const divs = container.querySelectorAll('div[style*="position: absolute"]');

      expect(divs.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('compact mode', () => {
    it('should apply compact styles when compact is true', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: 'Hello!',
        chefEmotion: 'happy',
      });

      render(<ChefDialog compact={true} />);

      const chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-size', '70');
    });

    it('should apply normal styles when compact is false', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: 'Hello!',
        chefEmotion: 'happy',
      });

      render(<ChefDialog compact={false} />);

      const chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-size', '100');
    });

    it('should apply default normal styles when compact is not provided', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: 'Hello!',
        chefEmotion: 'happy',
      });

      render(<ChefDialog />);

      const chefCharacter = screen.getByTestId('chef-character');
      expect(chefCharacter).toHaveAttribute('data-size', '100');
    });

    it('should use compact padding when compact is true', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: 'Hello!',
        chefEmotion: 'happy',
      });

      const { container } = render(<ChefDialog compact={true} />);
      const outerDiv = container.firstChild as HTMLElement;

      expect(outerDiv).toHaveStyle('padding: 8px 12px');
    });

    it('should use normal padding when compact is false', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: 'Hello!',
        chefEmotion: 'happy',
      });

      const { container } = render(<ChefDialog compact={false} />);
      const outerDiv = container.firstChild as HTMLElement;

      expect(outerDiv).toHaveStyle('padding: 12px 16px');
    });
  });

  describe('chef emotion', () => {
    it('should pass the correct emotion to ChefCharacter', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: 'Hello!',
        chefEmotion: 'sad',
      });

      render(<ChefDialog />);

      expect(screen.getByTestId('chef-character')).toHaveAttribute(
        'data-emotion',
        'sad'
      );
    });

    it('should update ChefCharacter emotion when chefEmotion changes', () => {
      const { rerender } = render(<ChefDialog />);
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: 'Hello!',
        chefEmotion: 'happy',
      });

      rerender(<ChefDialog />);

      expect(screen.getByTestId('chef-character')).toHaveAttribute(
        'data-emotion',
        'happy'
      );
    });
  });

  describe('speech functionality', () => {
    it('should call speak when chefMessage is provided', async () => {
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: 'Hello there!',
        chefEmotion: 'happy',
      });

      render(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenCalledWith('Hello there!');
      });
    });

    it('should call speak when chefMessage changes', async () => {
      const { rerender } = render(<ChefDialog />);
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: 'First message',
        chefEmotion: 'happy',
      });

      rerender(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenCalledWith('First message');
      });

      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: 'Second message',
        chefEmotion: 'happy',
      });

      rerender(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenCalledWith('Second message');
      });
    });

    it('should not call speak if chefMessage is empty', async () => {
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: '',
        chefEmotion: 'happy',
      });

      render(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).not.toHaveBeenCalled();
      });
    });

    it('should not call speak if chefMessage is undefined', async () => {
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: undefined,
        chefEmotion: 'happy',
      });

      render(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).not.toHaveBeenCalled();
      });
    });

    it('should not call speak if chefMessage is null', async () => {
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: null,
        chefEmotion: 'happy',
      });

      render(<ChefDialog />);

      await waitFor(() => {
        expect(mockSpeak).not.toHaveBeenCalled();
      });
    });
  });

  describe('layout and styling', () => {
    it('should have flexbox layout with correct alignment', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: 'Hello!',
        chefEmotion: 'happy',
      });

      const { container } = render(<ChefDialog />);
      const outerDiv = container.firstChild as HTMLElement;

      expect(outerDiv).toHaveStyle({
        display: 'flex',
        alignItems: 'flex-end',
        gap: '12px',
      });
    });

    it('should display message with correct font styling', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: 'Test message',
        chefEmotion: 'happy',
      });

      const { container } = render(<ChefDialog />);
      const speechBubble = container.querySelector('div[style*="fontSize"]');

      expect(speechBubble).toHaveStyle({
        color: '#2c2c2c',
        fontWeight: '500',
        lineHeight: '1.5',
      });
    });

    it('should have shadow and border on message bubble', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: 'Test message',
        chefEmotion: 'happy',
      });

      const { container } = render(<ChefDialog />);
      const speechBubble = container.querySelector('div[style*="boxShadow"]');

      expect(speechBubble).toHaveStyle({
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
        border: '2px solid #ff6b35',
      });
    });

    it('should set maxWidth on message bubble', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: 'Test message',
        chefEmotion: 'happy',
      });

      const { container } = render(<ChefDialog />);
      const speechBubble = container.querySelector('div[style*="maxWidth"]');

      expect(speechBubble).toHaveStyle('maxWidth: 320px');
    });
  });

  describe('edge cases', () => {
    it('should handle very long messages', () => {
      const longMessage = 'This is a very long message that should still render correctly in the speech bubble.'.repeat(
        3
      );
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: longMessage,
        chefEmotion: 'happy',
      });

      render(<ChefDialog />);

      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it('should handle special characters in message', () => {
      const specialMessage = 'Hello! @#$%^&*() "quoted" \'single\'';
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: specialMessage,
        chefEmotion: 'happy',
      });

      render(<ChefDialog />);

      expect(screen.getByText(specialMessage)).toBeInTheDocument();
    });

    it('should handle emoji in message', () => {
      const emojiMessage = 'Delicious! 🍽️😋👨‍🍳';
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: emojiMessage,
        chefEmotion: 'happy',
      });

      render(<ChefDialog />);

      expect(screen.getByText(emojiMessage)).toBeInTheDocument();
    });

    it('should handle whitespace in message', () => {
      const whitespaceMessage = '   Hello   World   ';
      (useGameStore as jest.Mock).mockReturnValue({
        chefMessage: whitespaceMessage,
        chefEmotion: 'happy',
      });

      render(<ChefDialog />);

      expect(screen.getByText(whitespaceMessage)).toBeInTheDocument();
    });

    it('should handle different emotion values', () => {
      const emotions = ['happy', 'sad', 'angry', 'confused', 'excited'];

      emotions.forEach((emotion) => {
        const { unmount } = render(<ChefDialog />);
        (useGameStore as jest.Mock).mockReturnValue({
          chefMessage: 'Test',
          chefEmotion: emotion,
        });

        render(<ChefDialog />);
        expect(screen.getByTestId('chef-character')).toHaveAttribute(
          'data-emotion',
          emotion
        );

        unmount();
      });
    });
  });
});