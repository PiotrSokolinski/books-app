import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DataProvider, ResourceContextProvider } from 'react-admin';

import { BooksList } from './BooksList';
import { AdminContextDecorator } from '../../../utils/AdminContextDecorator';

describe('BooksList', () => {
  it('renders the BooksList component with correct filters and datagrid', async () => {
    await act(async () =>
      render(
        <AdminContextDecorator>
          <ResourceContextProvider value="books">
            <BooksList />
          </ResourceContextProvider>
        </AdminContextDecorator>,
      ),
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Author')).toBeInTheDocument();
      expect(screen.getByText('ISBN number')).toBeInTheDocument();
      expect(screen.getByText('Number of pages')).toBeInTheDocument();
      expect(screen.getByText('Rating')).toBeInTheDocument();
      expect(screen.getByText('Create')).toBeInTheDocument();
      expect(screen.getByText('Add filter')).toBeInTheDocument();
    });
  });

  it('renders the BooksList component and can click create button', async () => {
    await act(async () =>
      render(
        <AdminContextDecorator>
          <ResourceContextProvider value="books">
            <BooksList />
          </ResourceContextProvider>
        </AdminContextDecorator>,
      ),
    );

    await waitFor(() => {
      const createButton = screen.getByText('Create');
      expect(createButton).toBeInTheDocument();
      fireEvent.click(createButton);
    });
  });

  it('renders the BooksList component and can click row', async () => {
    await act(async () =>
      render(
        <AdminContextDecorator>
          <ResourceContextProvider value="books">
            <BooksList />
          </ResourceContextProvider>
        </AdminContextDecorator>,
      ),
    );

    await waitFor(() => {
      const id = screen.getByText('1');
      expect(id).toBeInTheDocument();
      fireEvent.click(id);
    });
  });

  it('renders the ListActions and Empty components correctly', async () => {
    const dataProvider: DataProvider = {
      getList: Promise.resolve({
        total: 0,
        data: [],
      }),
    } as unknown as DataProvider;
    await act(async () =>
      render(
        <AdminContextDecorator dataProvider={dataProvider}>
          <ResourceContextProvider value="books">
            <BooksList />
          </ResourceContextProvider>
        </AdminContextDecorator>,
      ),
    );
    await waitFor(() => {
      expect(screen.getByText('No Books yet.')).toBeInTheDocument();
    });
  });

  it('matches the snapshot', async () => {
    let asFragment: () => DocumentFragment = () =>
      document.createDocumentFragment();
    await act(async () => {
      const result = render(
        <AdminContextDecorator>
          <ResourceContextProvider value="books">
            <BooksList />
          </ResourceContextProvider>
        </AdminContextDecorator>,
      );
      asFragment = result.asFragment;
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
