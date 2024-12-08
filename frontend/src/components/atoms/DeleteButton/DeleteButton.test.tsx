import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { DeleteButton } from './DeleteButton';
import { AdminContextDecorator } from '../../../utils/AdminContextDecorator';

describe('DeleteButton', () => {
  it('renders with the correct label from the translate function', () => {
    const onClickMock = vi.fn();

    render(
      <AdminContextDecorator>
        <DeleteButton onClick={onClickMock} />
      </AdminContextDecorator>,
    );

    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls the onClick callback when clicked', () => {
    const onClickMock = vi.fn();

    render(
      <AdminContextDecorator>
        <DeleteButton onClick={onClickMock} />
      </AdminContextDecorator>,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
