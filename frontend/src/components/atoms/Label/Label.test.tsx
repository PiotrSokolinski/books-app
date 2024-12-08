import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import * as reactAdmin from 'react-admin';

import { Label } from './Label';
import { TypographyVariant } from '@mui/material';

vi.mock('react-admin', () => ({
  useTranslate: vi.fn(),
}));

describe('Label', () => {
  it('renders children when textId is not provided', () => {
    render(<Label variant="h6">Some label text</Label>);

    const label = screen.getByText('Some label text');
    expect(label).toBeInTheDocument();
    expect(label).toHaveStyle('font-size: 1.25rem');
  });

  it('renders translated text when textId is provided', () => {
    const translatedText = 'Translated Text';
    vi.spyOn(reactAdmin, 'useTranslate').mockReturnValue(() => translatedText);

    render(<Label textId="someTextId" variant="h6" />);

    const label = screen.getByText(translatedText);
    expect(label).toBeInTheDocument();
    expect(label).toHaveStyle('font-size: 1.25rem');
  });

  it.each([
    ['h1', 'font-size: 6rem'],
    ['h2', 'font-size: 3.75rem'],
    ['h3', 'font-size: 3rem'],
    ['h4', 'font-size: 2.125rem'],
    ['h5', 'font-size: 1.5rem'],
    ['h6', 'font-size: 1.25rem'],
  ])(
    'uses the correct variant (%s)',
    (variant: string, expectedStyle: string) => {
      render(
        <Label
          variant={variant as TypographyVariant}
        >{`${variant} label`}</Label>,
      );

      const label = screen.getByText(`${variant} label`);
      expect(label).toHaveStyle(expectedStyle);
    },
  );
  it('applies custom variant when provided', () => {
    render(<Label variant="body1">Custom variant label</Label>);

    const label = screen.getByText('Custom variant label');
    expect(label).toHaveStyle('font-size: 1rem');
  });
});
