import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';
import { TextField, useShowContext, useTranslate } from 'react-admin';
import { styled } from '@mui/system';

import { Book } from '../../../types/book';
import { Box } from '@mui/material';
import { Banner } from '../../atoms/Banner/Banner';
import { Flex } from '../../atoms/Flex/Flex';
import { Loader } from '../../atoms/Loader/Loader';

const StyledRow = styled(Flex)({
  mt: 1,
});

export const BookCard = () => {
  const { record, isLoading, error } = useShowContext<Book>();
  const translate = useTranslate();

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Banner level={'error'}>{error.message}</Banner>;
  }
  if (!record) {
    return <Banner level="error">{translate('booksShow.error')}</Banner>;
  }

  return (
    <Card>
      <CardContent>
        <TextField source="title" variant="h4" />
        <Divider sx={{ my: 1 }} />
        <StyledRow>
          <Typography>{translate('booksShow.author')}</Typography>
          <TextField source="author" variant="h6" />
        </StyledRow>
        <StyledRow>
          <Typography>{translate('booksShow.numberOfPages')}</Typography>
          <TextField source="numberOfPages" variant="h6" />
        </StyledRow>
        <StyledRow>
          <Typography>{translate('booksShow.isbnNumber')}</Typography>
          <TextField source="isbnNumber" variant="h6" />
        </StyledRow>
        <StyledRow>
          <Typography>{translate('booksShow.rating')}</Typography>
          <Box>
            {Array.from({ length: record.rating }).map((_, index) => (
              <StarIcon key={index} />
            ))}
          </Box>
        </StyledRow>
      </CardContent>
    </Card>
  );
};
