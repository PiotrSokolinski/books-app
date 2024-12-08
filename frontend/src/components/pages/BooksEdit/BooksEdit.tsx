import { Edit, ShowButton, useTranslate } from 'react-admin';
import { useParams } from 'react-router-dom';

import { BookActions } from '../../organisms/BookActions/BookActions';
import { BookEditForm } from '../../organisms/BookEditForm/BookEditForm';
import { Wrapper } from '../../templates/Wrapper/Wrapper';

export const BooksEdit = () => {
  const translate = useTranslate();
  const { id } = useParams();

  return (
    <Wrapper>
      <Edit
        id={id}
        title={translate('booksEdit.barTitle')}
        actions={<BookActions action={<ShowButton />} />}
      >
        <BookEditForm />
      </Edit>
    </Wrapper>
  );
};
