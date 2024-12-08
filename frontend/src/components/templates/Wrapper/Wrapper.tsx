import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

type WrapperProps = {
  children: React.JSX.Element;
};

const StyledWrapper = styled(Box)(({ theme }) => ({
  minWidth: '50%',
  alignSelf: 'center',
  borderRadius: theme.shape.borderRadius,
}));

export const Wrapper = ({ children }: WrapperProps) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};
