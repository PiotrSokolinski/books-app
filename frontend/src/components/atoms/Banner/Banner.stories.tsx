import { Meta, StoryObj } from '@storybook/react';

import { Banner } from './Banner';

const meta = {
  title: 'Atoms/Banner',
  component: Banner,
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  args: {
    children: 'Error banner',
  },
};

export const Error: Story = {
  args: {
    children: 'Error banner',
    level: 'error',
  },
};

export const Warning: Story = {
  args: {
    children: 'Error banner',
    level: 'warning',
  },
};

export const Info: Story = {
  args: {
    children: 'Error banner',
    level: 'info',
  },
};
