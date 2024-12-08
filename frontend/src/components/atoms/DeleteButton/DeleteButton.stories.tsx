import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { DeleteButton } from './DeleteButton';

const meta = {
  title: 'Atoms/DeleteButton',
  component: DeleteButton,
  args: { onClick: fn() },
} satisfies Meta<typeof DeleteButton>;

export default meta;
type Story = StoryObj<typeof DeleteButton>;

export const Default: Story = {};
