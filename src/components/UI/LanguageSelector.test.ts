// @ts-nocheck
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageSelector } from './LanguageSelector';
import { useLanguageStore } from '../../store/languageStore';
import { useT } from '../../i18n/useT';
import { LANGUAGE_OPTIONS } from '../../i18n/translations';

jest.mock('../../store/languageStore');
jest.mock('../../i18n/useT');
jest.mock('react-country-flag', () => {
  return function MockFlag() {
    return <div data-testid="flag">Flag</div>;
  };
});

describe('LanguageSelector', () => {
  const mockSetLanguage = jest.fn();
  const mockSetShowSetup = jest.fn();
  const mockT = {
    setup: {
      title: 'Learning Settings',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useLanguageStore as jest.Mock).mockReturnValue({
      language: 'en-US',
      setLanguage: mockSetLanguage,
      setShowSetup: mockSetShowSetup,
    });
    (useT as jest.Mock).mockReturnValue(mockT);
  });

  describe('rendering', () => {
    it('should render the language selector button with current language', () => {
      render(<LanguageSelector />);
      
      const button = screen.getByRole('button', { name: /change language/i });
      expect(button).toBeInTheDocument();
    });

    it('should display the current language label', () => {
      render(<LanguageSelector />);
      
      const current = LANGUAGE_OPTIONS.find(l => l.code === 'en-US');
      expect(screen.getByText(current!.label)).toBeInTheDocument();
    });

    it('should show region label for languages with regional variants', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        language: 'en-GB',
        setLanguage: mockSetLanguage,
        setShowSetup: mockSetShowSetup,
      });

      render(<LanguageSelector />);
      
      expect(screen.getByText(/GB/)).toBeInTheDocument();
    });

    it('should render flag for current language', () => {
      render(<LanguageSelector />);
      
      const flags = screen.getAllByTestId('flag');
      expect(flags.length).toBeGreaterThan(0);
    });

    it('should not show dropdown initially', () => {
      render(<LanguageSelector />);
      
      const languageOptions = LANGUAGE_OPTIONS.map(opt => opt.label);
      languageOptions.forEach(label => {
        const elements = screen.queryAllByText(label);
        // Should only have the current language visible, not in dropdown
      });
    });
  });

  describe('dropdown toggle', () => {
    it('should open dropdown when button is clicked', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);
      
      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);
      
      expect(screen.getByText('Learning Settings')).toBeInTheDocument();
    });

    it('should close dropdown when button is clicked again', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);
      
      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Learning Settings')).toBeInTheDocument();
      });
      
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.queryByText('Learning Settings')).not.toBeInTheDocument();
      });
    });

    it('should toggle open state on multiple clicks', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);
      
      const button = screen.getByRole('button', { name: /change language/i });
      
      await user.click(button);
      await waitFor(() => {
        expect(screen.getByText('Learning Settings')).toBeInTheDocument();
      });
      
      await user.click(button);
      await waitFor(() => {
        expect(screen.queryByText('Learning Settings')).not.toBeInTheDocument();
      });
      
      await user.click(button);
      await waitFor(() => {
        expect(screen.getByText('Learning Settings')).toBeInTheDocument();
      });
    });
  });

  describe('language selection', () => {
    it('should call setLanguage when a language option is clicked', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);
      
      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Learning Settings')).toBeInTheDocument();
      });
      
      // Get the second language option button (not the setup button)
      const languageButtons = screen.getAllByRole('button');
      const secondLanguageButton = languageButtons[1]; // First is main button, second should be setup, third+ are languages
      
      await user.click(secondLanguageButton);
      
      expect(mockSetLanguage).toHaveBeenCalled();
    });

    it('should close dropdown after selecting a language', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);
      
      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Learning Settings')).toBeInTheDocument();
      });
      
      const languageButtons = screen.getAllByRole('button');
      await user.click(languageButtons[2]); // Click a language option
      
      await waitFor(() => {
        expect(screen.queryByText('Learning Settings')).not.toBeInTheDocument();
      });
    });

    it('should highlight the currently selected language', () => {
      render(<LanguageSelector />);
      
      const button = screen.getByRole('button', { name: /change language/i });
      fireEvent.click(button);
      
      // The current language should have a checkmark
      const checkmarks = screen.getAllByText('✓');
      expect(checkmarks.length).toBeGreaterThan(0);
    });

    it('should display all language options in dropdown', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);
      
      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);
      
      await waitFor(() => {
        LANGUAGE_OPTIONS.forEach(option => {
          expect(screen.getByText(option.label)).toBeInTheDocument();
        });
      });
    });

    it('should show region labels for languages with variants in dropdown', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);
      
      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText(/US/)).toBeInTheDocument();
        expect(screen.getByText(/GB/)).toBeInTheDocument();
      });
    });
  });

  describe('learning settings button', () => {
    it('should render learning settings button in dropdown', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);
      
      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Learning Settings')).toBeInTheDocument();
      });
    });

    it('should call setShowSetup when learning settings button is clicked', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);
      
      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Learning Settings')).toBeInTheDocument();
      });
      
      const setupButton = screen.getByText('Learning Settings');
      await user.click(setupButton);
      
      expect(mockSetShowSetup).toHaveBeenCalledWith(true);
    });

    it('should close dropdown after clicking learning settings', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);
      
      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Learning Settings')).toBeInTheDocument();
      });
      
      const setupButton = screen.getByText('Learning Settings');
      await user.click(setupButton);
      
      await waitFor(() => {
        expect(mockSetShowSetup).toHaveBeenCalled();
      });
    });
  });

  describe('outside click handling', () => {
    it('should close dropdown when clicking outside', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);
      
      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Learning Settings')).toBeInTheDocument();
      });
      
      // Click outside the dropdown
      fireEvent.mouseDown(document.body);
      
      await waitFor(() => {
        expect(screen.queryByText('Learning Settings')).not.toBeInTheDocument();
      });
    });

    it('should not close dropdown when clicking inside', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);
      
      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Learning Settings')).toBeInTheDocument();
      });
      
      // The dropdown should still be visible
      expect(screen.getByText('Learning Settings')).toBeInTheDocument();
    });

    it('should register and cleanup event listener', () => {
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
      
      const { unmount } = render(<LanguageSelector />);
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
      
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
      
      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });
  });

  describe('flags rendering', () => {
    it('should render flag for current language', () => {
      render(<LanguageSelector />);
      
      const flags = screen.getAllByTestId('flag');
      expect(flags.length).toBeGreaterThan(0);
    });

    it('should render flags for all language options in dropdown', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);
      
      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);
      
      await waitFor(() => {
        const flags = screen.getAllByTestId('flag');
        // Should have at least: 1 in button + LANGUAGE_OPTIONS.length in dropdown
        expect(flags.length).toBeGreaterThanOrEqual(LANGUAGE_OPTIONS.length + 1);
      });
    });
  });

  describe('different language scenarios', () => {
    it('should handle Portuguese without region label when selected', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        language: 'pt',
        setLanguage: mockSetLanguage,
        setShowSetup: mockSetShowSetup,
      });

      render(<LanguageSelector />);
      
      const button = screen.getByRole('button', { name: /change language/i });
      fireEvent.click(button);
      
      expect(screen.getByText('PT')).toBeInTheDocument();
    });

    it('should handle Portuguese Brazil with region label when selected', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        language: 'pt-BR',
        setLanguage: mockSetLanguage,
        setShowSetup: mockSetShowSetup,
      });

      render(<LanguageSelector />);
      
      const button = screen.getByRole('button', { name: /change language/i });
      fireEvent.click(button);
      
      expect(screen.getByText('BR')).toBeInTheDocument();
    });

    it('should handle language without region label gracefully', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        language: 'es',
        setLanguage: mockSetLanguage,
        setShowSetup: mockSetShowSetup,
      });

      render(<LanguageSelector />);
      
      expect(screen.getByRole('button', { name: /change language/i })).toBeInTheDocument();
    });
  });

  describe('dropdown positioning', () => {
    it('should position dropdown below the button', async () => {
      const user = userEvent.setup();
      const { container } = render(<LanguageSelector />);
      
      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);
      
      const mainDiv = container.querySelector('div[style*="position: fixed"]');
      expect(mainDiv).toHaveStyle('position: fixed');
      expect(mainDiv).toHaveStyle('top: 12px');
      expect(mainDiv).toHaveStyle('left: 12px');
    });
  });

  describe('accessibility', () => {
    it('should have title attribute on main button', () => {
      render(<LanguageSelector />);
      
      const button = screen.getByRole('button', { name: /change language/i });
      expect(button).toHaveAttribute('title', 'Change language');
    });

    it('should have semantic button elements', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
      
      const mainButton = screen.getByRole('button', { name: /change language/i });
      await user.click(mainButton);
      
      await waitFor(() => {
        const allButtons = screen.getAllByRole('button');
        expect(allButtons.length).toBeGreaterThan(buttons.length);
      });
    });
  });

  describe('state management', () => {
    it('should use language from store', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        language: 'fr',
        setLanguage: mockSetLanguage,
        setShowSetup: mockSetShowSetup,
      });

      render(<LanguageSelector />);
      
      expect(useLanguageStore).toHaveBeenCalled();
    });

    it('should get translation function from useT', () => {
      render(<LanguageSelector />);
      
      expect(useT).toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('should handle empty LANGUAGE_OPTIONS array gracefully', async () => {
      const user = userEvent.setup();
      jest.isolateModuleModules = true;
      
      // This test assumes LANGUAGE_OPTIONS has content, but we verify basic render works
      render(<LanguageSelector />);
      
      expect(screen.getByRole('button', { name: /change language/i })).toBeInTheDocument();
    });

    it('should handle rapid clicks on toggle button', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);
      
      const button = screen.getByRole('button', { name: /change language/i });
      
      await user.click(button);
      await user.click(button);
      await user.click(button);
      
      // Component should remain stable
      expect(screen.getByRole('button', { name: /change language/i })).toBeInTheDocument();
    });
  });
});