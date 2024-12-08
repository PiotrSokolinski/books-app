import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

type BannerProps = {
  level?: 'info' | 'warning' | 'error';
  children: React.ReactNode;
};

const StyledError = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '20vh',
  minWidth: '10rem',
});

const StyledMessage = styled(Box)<{ level: 'info' | 'warning' | 'error' }>(({
  theme,
  level,
}) => {
  const getBackgroundColor = () => {
    switch (level) {
      case 'info':
        return theme.palette.info.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'error':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[200];
    }
  };

  return {
    padding: 10,
    width: '75%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: getBackgroundColor(),
    color: theme.palette.getContrastText(getBackgroundColor()),
    textAlign: 'center',
  };
});

export const Banner = ({ level = 'info', children }: BannerProps) => {
  return (
    <StyledError>
      <StyledMessage level={level}>{children}</StyledMessage>
    </StyledError>
  );
};
