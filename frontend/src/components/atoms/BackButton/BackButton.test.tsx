import { render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';

import { BackButton } from './BackButton';
import { AdminContextDecorator } from '../../../utils/AdminContextDecorator';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(() => mockNavigate),
}));

// TODO: F1 - More unit test across the application
describe('BackButton', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders with a translated label when labelId is provided', () => {
    render(
      <AdminContextDecorator>
        <BackButton path="/home" labelId="bookActions.label" />
      </AdminContextDecorator>,
    );

    expect(screen.getByText('Back to list')).toBeInTheDocument();
  });

  it('renders with a label when label is provided', () => {
    render(
      <AdminContextDecorator>
        <BackButton path="/home" label="Back to list" />
      </AdminContextDecorator>,
    );

    expect(screen.getByText('Back to list')).toBeInTheDocument();
  });

  it('navigates to the correct path when clicked', () => {
    render(
      <AdminContextDecorator>
        <BackButton path="/list" label="Back to list" />
      </AdminContextDecorator>,
    );

    const button = screen.getByText('Back to list');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/list');
  });
});
