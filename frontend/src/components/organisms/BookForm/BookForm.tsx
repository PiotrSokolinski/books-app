import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import {
  SimpleForm,
  TextInput,
  NumberInput,
  useTranslate,
  required,
  minValue,
  maxValue,
  number,
} from 'react-admin';

import { FormToolbar } from '../FormToolbar/FormToolbar';

const StyledTitle = styled(Typography)(({ theme }) => ({
  alignSelf: 'center',
  marginBottom: theme.spacing(3),
}));

type BookFormProps = {
  title: React.ReactNode;
  mode: 'create' | 'edit';
};

export const BookForm = ({ title, mode }: BookFormProps) => {
  const translate = useTranslate();

  return (
    <SimpleForm toolbar={<FormToolbar mode={mode} />}>
      <StyledTitle variant="h5">{title}</StyledTitle>
      <TextInput
        name="title"
        source="title"
        label={translate('booksEdit.title')}
        validate={required(translate('bookForm.required'))}
      />
      <TextInput
        name="author"
        source="author"
        label={translate('booksEdit.author')}
        validate={required(translate('bookForm.required'))}
      />
      <TextInput
        name="isbnNumber"
        source="isbnNumber"
        label={translate('booksEdit.isbnNumber')}
        validate={[
          required(translate('bookForm.required')),
          number(translate('bookForm.isbnNotValid')),
        ]}
      />
      <NumberInput
        name="numberOfPages"
        source="numberOfPages"
        label={translate('booksEdit.numberOfPages')}
        validate={[
          required(translate('bookForm.required')),
          minValue(1, translate('bookForm.numberOfPagesNotValid')),
        ]}
      />
      <NumberInput
        name="rating"
        source="rating"
        label={translate('booksEdit.rating')}
        validate={[
          required(translate('bookForm.required')),
          minValue(1, translate('bookForm.invalidRating')),
          maxValue(5, translate('bookForm.invalidRating')),
        ]}
      />
    </SimpleForm>
  );
};
