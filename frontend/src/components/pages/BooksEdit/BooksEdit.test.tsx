import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { fireEvent } from '@testing-library/react';
import { ResourceContextProvider } from 'react-admin';

import { BooksEdit } from './BooksEdit';
import { AdminContextDecorator } from '../../../utils/AdminContextDecorator';

vi.mock(import('react-admin'), async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useRedirect: vi.fn(() => vi.fn()),
    useEditController: vi.fn().mockReturnValue({
      record: {
        id: '1',
        title: 'Test Book',
        author: 'Test Author',
        isbnNumber: '1234567890',
        numberOfPages: 200,
        rating: 5,
      },
    }),
  };
});

vi.mock(import('react-router-dom'), async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useParams: vi.fn().mockReturnValue({ id: '1' }),
  };
});

vi.mock('react-hook-form', async () => {
  const actual = await import('react-hook-form');

  return {
    ...actual,
    useFormContext: vi.fn().mockReturnValue({
      reset: vi.fn(),
    }),
  };
});

describe('BooksEdit', () => {
  it('renders the BooksEdit component and submits a record', async () => {
    render(
      <AdminContextDecorator>
        <ResourceContextProvider value="books">
          <BooksEdit />
        </ResourceContextProvider>
      </AdminContextDecorator>,
    );

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/title/i), {
        target: { value: 'Edited Book Title' },
      });
    });

    const saveButton = screen.getByText(/save/i);
    expect(saveButton).toBeInTheDocument();
    fireEvent.click(saveButton);
  });

  it('renders the BooksEdit component and deletes a record', async () => {
    render(
      <AdminContextDecorator>
        <ResourceContextProvider value="books">
          <BooksEdit />
        </ResourceContextProvider>
      </AdminContextDecorator>,
    );

    await waitFor(() => {
      const deleteButton = screen.getByText(/delete/i);
      expect(deleteButton).toBeInTheDocument();
      fireEvent.click(deleteButton);
    });

    const confirmButton = screen.getByText(/confirm/i);
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);
  });

  it('matches the snapshot', async () => {
    const { asFragment } = render(
      <AdminContextDecorator>
        <ResourceContextProvider value="books">
          <BooksEdit />
        </ResourceContextProvider>
      </AdminContextDecorator>,
    );

    await waitFor(() => {
      const confirmButton = screen.getByText(/delete/i);
      expect(confirmButton).toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
