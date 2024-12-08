import en from 'ra-language-english';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { TranslationMessages } from 'ra-core';

const englishMessages: TranslationMessages = {
  ra: { ...en.ra },
  booksList: {
    barTitle: 'Books List',
    id: 'ID',
    title: 'Title',
    author: 'Author',
    isbnNumber: 'ISBN number',
    numberOfPages: 'Number of pages',
    rating: 'Rating',
    search: 'Search',
  },
  booksShow: {
    barTitle: 'Book Details',
    title: 'Title',
    author: 'Author:',
    isbnNumber: 'ISBN number:',
    numberOfPages: 'Number of pages:',
    rating: 'Rating:',
    error: 'Something went wrong.',
  },
  booksEdit: {
    barTitle: 'Books Edit',
    formTitle: 'Edit %{title}',
    title: 'Title',
    author: 'Author',
    isbnNumber: 'ISBN number',
    numberOfPages: 'Number of pages',
    rating: 'Rating',
  },
  booksCreate: {
    barTitle: 'Books Create',
    formTitle: 'Add a new book',
    title: 'Title',
    author: 'Author',
    isbnNumber: 'ISBN number',
    numberOfPages: 'Number of pages',
    rating: 'Rating',
    error: 'Something went wrong.',
  },
  bookActions: {
    label: 'Back to list',
  },
  bookForm: {
    required: 'Field is required.',
    invalidRating: 'Invalid rating. Please enter a number between 1 and 5',
    isbnNotValid: 'Must be a valid number.',
    numberOfPagesNotValid: 'Must be a number greater than 0.',
  },
  deleteWithConfirm: {
    confirmationTitle: `Delete "%{title}"`,
    confirmationContent: 'Are you sure you want to delete this item?',
  },
  deleteButton: {
    label: 'Delete',
  },
  customToolbar: {
    created: 'Book created.',
    updated: 'Book updated.',
    deleted: 'Book deleted.',
  },
};

export const i18nProvider = polyglotI18nProvider(() => englishMessages, 'en');
