import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Empty } from './Empty';
import { AdminContextDecorator } from '../../../utils/AdminContextDecorator.tsx';

describe('Empty', () => {
  const resource = 'Book';

  it('renders the Empty component with the correct resource', () => {
    render(
      <AdminContextDecorator>
        <Empty resource={resource} />
      </AdminContextDecorator>,
    );

    expect(screen.getByText('No Books yet.')).toBeInTheDocument();
  });
});
