import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';

const StyledLoader = styled(Box)({
  display: 'flex',
  margin: 5,
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '20vh',
});

export const Loader = () => {
  return (
    <StyledLoader>
      <CircularProgress />
    </StyledLoader>
  );
};
