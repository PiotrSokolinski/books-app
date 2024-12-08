import type { Preview } from '@storybook/react';

import { AdminContextDecorator } from '../src/utils/AdminContextDecorator';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <AdminContextDecorator>
        <Story />
      </AdminContextDecorator>
    ),
  ],
};

export default preview;
