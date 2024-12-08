import { ResourceContextProvider } from 'react-admin';
import { fireEvent } from '@testing-library/react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

import { BooksShow } from './BooksShow';
import { AdminContextDecorator } from '../../../utils/AdminContextDecorator';

vi.mock(import('react-admin'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useResourceContext: vi.fn().mockReturnValue('books'),
    useShowController: vi.fn().mockReturnValue({
      record: {
        id: '1',
        title: 'Test Book',
        author: 'Test Author',
        isbnNumber: '1234567890',
        numberOfPages: 200,
        rating: 5,
      },
      loading: false,
      error: null,
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

describe('BooksShow', () => {
  it('renders the BooksShow component and click edit', async () => {
    render(
      <AdminContextDecorator>
        <ResourceContextProvider value="books">
          <BooksShow />
        </ResourceContextProvider>
      </AdminContextDecorator>,
    );

    await waitFor(() => {
      const showButton = screen.getByText(/edit/i);
      expect(showButton).toBeInTheDocument();
      fireEvent.click(showButton);
    });
  });

  it('renders the BooksShow component and go back to list', async () => {
    render(
      <AdminContextDecorator>
        <ResourceContextProvider value="books">
          <BooksShow />
        </ResourceContextProvider>
      </AdminContextDecorator>,
    );

    await waitFor(() => {
      const backButton = screen.getByText('Back to list');
      expect(backButton).toBeInTheDocument();
      fireEvent.click(backButton);
    });
  });

  it('matches the snapshot', async () => {
    const { asFragment } = render(
      <AdminContextDecorator>
        <ResourceContextProvider value="books">
          <BooksShow />
        </ResourceContextProvider>
      </AdminContextDecorator>,
    );
    await waitFor(() => {
      const showButton = screen.getByText(/edit/i);
      expect(showButton).toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
