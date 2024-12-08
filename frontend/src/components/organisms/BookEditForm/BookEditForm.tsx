import { useEditContext, useTranslate } from 'react-admin';

import { Book } from '../../../types/book';
import { BookForm } from '../BookForm/BookForm';
import { Banner } from '../../atoms/Banner/Banner';
import { Loader } from '../../atoms/Loader/Loader';

export const BookEditForm = () => {
  const translate = useTranslate();
  const { isLoading, error, record } = useEditContext<Book>();
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Banner level={'error'}>{error.message}</Banner>;
  }
  if (!record) {
    return <Banner level="error">{translate('booksEdit.error')}</Banner>;
  }

  return (
    <BookForm
      mode="edit"
      title={translate('booksEdit.formTitle', { title: record.title })}
    />
  );
};
