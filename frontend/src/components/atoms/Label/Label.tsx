import React from 'react';
import { Typography, TypographyVariant } from '@mui/material';
import { useTranslate } from 'react-admin';

type LabelProps = {
  variant?: TypographyVariant;
  children?: React.ReactNode;
  textId?: string;
} & (
  | { children: React.ReactNode; textId?: never }
  | { textId: string; children?: never }
);

export const Label = ({ children, textId, variant = 'h6' }: LabelProps) => {
  const translate = useTranslate();
  if (textId) {
    return <Typography variant={variant}>{translate(textId)}</Typography>;
  }

  return <Typography variant={variant}>{children}</Typography>;
};
