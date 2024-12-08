import {
  Datagrid,
  List,
  useResourceContext,
  TextField,
  NumberField,
  useTranslate,
  SearchInput,
  TextInput,
} from 'react-admin';

import { Empty } from '../../molecules/Empty/Empty';
import { Label } from '../../atoms/Label/Label';
import { ListActions } from '../../organisms/ListActions/ListActions';

export const BooksList = () => {
  const resource = useResourceContext();
  const translate = useTranslate();

  const filters = [
    <SearchInput
      name="search"
      source="q"
      alwaysOn
      placeholder={translate('booksList.search')}
    />,
    <TextInput
      name="isbnNumber"
      label={translate('booksList.isbnNumber')}
      source="isbnNumber"
    />,
    <TextInput
      name="rating"
      label={translate('booksList.rating')}
      source="rating"
    />,
  ];
  return (
    <List
      exporter={false}
      resource={resource}
      title={translate('booksList.barTitle')}
      actions={<ListActions />}
      filters={filters}
      filterDefaultValues={{ search: '', isbnNumber: '', rating: '' }}
      sort={{ field: 'isbnNumber', order: 'ASC' }}
      debounce={500}
      empty={false}
    >
      <Datagrid empty={<Empty resource={resource} />}>
        <TextField source="id" label={<Label textId="booksList.id" />} />
        <TextField source="title" label={<Label textId="booksList.title" />} />
        <TextField
          source="author"
          label={<Label textId="booksList.author" />}
        />
        <TextField
          source="isbnNumber"
          label={<Label textId="booksList.isbnNumber" />}
        />
        <NumberField
          source="numberOfPages"
          label={<Label textId="booksList.numberOfPages" />}
        />
        <NumberField
          source="rating"
          label={<Label textId="booksList.rating" />}
        />
      </Datagrid>
    </List>
  );
};
