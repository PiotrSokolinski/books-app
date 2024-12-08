import { Meta, StoryObj } from '@storybook/react';

import { Loader } from './Loader';

const meta = {
  title: 'Atoms/Loader',
  component: Loader,
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {};
