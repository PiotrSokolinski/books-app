import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Loader } from './Loader';

describe('Loader', () => {
  it('renders the loader with CircularProgress and the correct styles', () => {
    render(<Loader />);

    const circularProgress = screen.getByRole('progressbar');
    expect(circularProgress).toBeInTheDocument();

    const loaderWrapper = screen.getByRole('progressbar').parentElement;
    expect(loaderWrapper).toHaveStyle('display: flex');
    expect(loaderWrapper).toHaveStyle('align-items: center');
    expect(loaderWrapper).toHaveStyle('justify-content: center');
  });
});
