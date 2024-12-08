import Box from '@mui/material/Box';
import { Empty as RaEmpty, ResourceContextValue } from 'react-admin';
import { styled } from '@mui/system';

const StyledEmpty = styled(Box)({
  padding: 15,
});

type EmptyProps = {
  resource: ResourceContextValue;
};

export const Empty = ({ resource }: EmptyProps) => {
  return (
    <StyledEmpty>
      <RaEmpty resource={resource} />
    </StyledEmpty>
  );
};
