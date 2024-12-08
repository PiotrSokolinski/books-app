import { Show, useTranslate, EditButton } from 'react-admin';
import { useParams } from 'react-router-dom';

import { BookActions } from '../../organisms/BookActions/BookActions';
import { BookCard } from '../../organisms/BookCard/BookCard';
import { Wrapper } from '../../templates/Wrapper/Wrapper';

export const BooksShow = () => {
  const translate = useTranslate();
  const { id } = useParams();

  return (
    <Wrapper>
      <Show
        id={id}
        title={translate('booksShow.barTitle')}
        actions={<BookActions action={<EditButton />} />}
      >
        <BookCard />
      </Show>
    </Wrapper>
  );
};
