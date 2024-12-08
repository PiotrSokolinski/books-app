import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Banner } from './Banner';
import { AdminContextDecorator } from '../../../utils/AdminContextDecorator';

describe('Banner', () => {
  it('renders with default "info" level when no level is provided', () => {
    render(
      <AdminContextDecorator>
        <Banner>Default Info Message</Banner>
      </AdminContextDecorator>,
    );

    const banner = screen.getByText('Default Info Message');
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveStyle(`background-color: rgb(2, 136, 209)`);
  });

  it('renders with correct background color for "info" level', () => {
    render(
      <AdminContextDecorator>
        <Banner level="info">Info Message</Banner>
      </AdminContextDecorator>,
    );

    const banner = screen.getByText('Info Message');
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveStyle(`background-color: rgb(2, 136, 209)`);
  });

  it('renders with correct background color for "warning" level', () => {
    render(
      <AdminContextDecorator>
        <Banner level="warning">Warning Message</Banner>
      </AdminContextDecorator>,
    );

    const banner = screen.getByText('Warning Message');
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveStyle(`background-color: rgb(237, 108, 2)`);
  });

  it('renders with correct background color for "error" level', () => {
    render(
      <AdminContextDecorator>
        <Banner level="error">Error Message</Banner>
      </AdminContextDecorator>,
    );

    const banner = screen.getByText('Error Message');
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveStyle(`background-color: rgb(211, 47, 47)`);
  });
});
