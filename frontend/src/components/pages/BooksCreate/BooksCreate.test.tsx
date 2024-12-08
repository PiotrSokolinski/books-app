import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { fireEvent } from '@testing-library/react';
import { ResourceContextProvider } from 'react-admin';

import { BooksCreate } from './BooksCreate';
import { AdminContextDecorator } from '../../../utils/AdminContextDecorator.tsx';

vi.doMock(import('react-admin'), async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useTranslate: vi.fn().mockReturnValue((key: string) => key),
    useRedirect: vi.fn().mockReturnValue(() => vi.fn()),
  };
});

vi.mock(import('react-hook-form'), async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useFormContext: vi.fn().mockReturnValue({
      reset: vi.fn(),
    }),
  };
});

// TODO: F2 - More integration tests across the application
describe('BooksCreate', () => {
  it('renders the BooksCreate component and submits a record', async () => {
    render(
      <AdminContextDecorator>
        <ResourceContextProvider value="books">
          <BooksCreate />
        </ResourceContextProvider>
      </AdminContextDecorator>,
    );

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'New Book Title' },
    });
    fireEvent.change(screen.getByLabelText(/author/i), {
      target: { value: 'Author Name' },
    });
    fireEvent.change(screen.getByLabelText(/isbn number/i), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByLabelText(/number of pages/i), {
      target: { value: '200' },
    });
    fireEvent.change(screen.getByLabelText(/rating/i), {
      target: { value: '4.5' },
    });

    const saveButton = screen.getByText(/save/i);
    expect(saveButton).toBeInTheDocument();

    fireEvent.click(saveButton);
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(
      <AdminContextDecorator>
        <ResourceContextProvider value="books">
          <BooksCreate />
        </ResourceContextProvider>
      </AdminContextDecorator>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
