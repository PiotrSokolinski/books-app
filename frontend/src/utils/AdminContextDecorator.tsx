import React from 'react';
import {
  AdminContext,
  DataProvider,
  GetListResult,
  memoryStore,
  testDataProvider,
} from 'react-admin';

import { theme } from '../theme/theme';
import { i18nProvider } from '../i18n/i18n';
import { Book } from '../types/book.ts';

const defaultDataProvider: DataProvider = testDataProvider({
  getList: async (): Promise<GetListResult<Book>> => {
    const books: Book[] = [
      {
        id: '1',
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        isbnNumber: '1234567890',
        numberOfPages: 300,
        rating: 4,
      },
      {
        id: '2',
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        isbnNumber: '0987654321',
        numberOfPages: 1000,
        rating: 5,
      },
    ];

    return Promise.resolve({
      total: books.length,
      data: books,
    });
  },
  getOne: () => {
    return Promise.resolve({
      data: {
        id: '1',
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        isbnNumber: '0987654321',
        numberOfPages: 1000,
        rating: 5,
      },
    });
  },
  create: () => {
    return Promise.resolve({
      data: {
        id: '3',
        title: 'Test Book Title',
        author: 'J.R.R. Tolkien',
        isbnNumber: '0987654321',
        numberOfPages: 1000,
        rating: 5,
      },
    });
  },
  update: () => {
    return Promise.resolve({
      data: {
        id: '2',
        title: 'Test Book Title',
        author: 'J.R.R. Tolkien',
        isbnNumber: '0987654321',
        numberOfPages: 1000,
        rating: 5,
      },
    });
  },
  delete: () => {
    return Promise.resolve({
      data: {
        id: '3',
        title: 'Test Book Title',
        author: 'J.R.R. Tolkien',
        isbnNumber: '0987654321',
        numberOfPages: 1000,
        rating: 5,
      },
    });
  },
} as unknown as DataProvider); // https://github.com/marmelab/react-admin/issues/5476

// TODO: F7 - Add more documentation and comments to the codebase
/**
 * A decorator component that provides the React-Admin context for testing or storybook environments.
 *
 * This component wraps its children with the necessary React-Admin context providers,
 * including a theme, internationalization provider, and optionally a `dataProvider`.
 * The `authProvider` is set to `undefined`, as this provider is designed for simple use cases.
 *
 * It supports passing a custom `dataProvider` for testing or storybook purposes.
 *
 * @param {Object} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components to render within the React-Admin context.
 * @param {Partial<DataProvider>} [props.dataProvider] - An optional custom `dataProvider` to be used in place of the default one.
 *
 * @returns {JSX.Element} The wrapped children within the React-Admin context, with context providers like theme and internationalization applied.
 *
 * @example
 * <AdminContextDecorator>
 *   <MyComponent />
 * </AdminContextDecorator>
 */
export const AdminContextDecorator: React.FC<{
  children: React.ReactNode;
  dataProvider?: Partial<DataProvider>;
}> = ({
  children,
  dataProvider,
}: {
  children: React.ReactNode;
  dataProvider?: Partial<DataProvider>;
}): React.JSX.Element => (
  <AdminContext
    dataProvider={
      dataProvider ? testDataProvider(dataProvider) : defaultDataProvider
    }
    authProvider={undefined}
    theme={theme}
    store={memoryStore()}
    i18nProvider={i18nProvider}
  >
    {children}
  </AdminContext>
);
