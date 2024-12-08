import { Create, ShowButton, useTranslate } from 'react-admin';

import { BookActions } from '../../organisms/BookActions/BookActions';
import { BookForm } from '../../organisms/BookForm/BookForm';
import { Wrapper } from '../../templates/Wrapper/Wrapper';

export const BooksCreate = () => {
  const translate = useTranslate();

  return (
    <Wrapper>
      <Create
        title={translate('booksCreate.barTitle')}
        actions={<BookActions action={<ShowButton />} />}
      >
        <BookForm mode="create" title={translate('booksCreate.formTitle')} />
      </Create>
    </Wrapper>
  );
};
