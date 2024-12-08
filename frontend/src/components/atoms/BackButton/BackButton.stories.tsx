import { Meta, StoryObj } from '@storybook/react';

import { BackButton } from './BackButton';

// TODO: F4 - More stories across the application

const meta = {
  title: 'Atoms/BackButton',
  component: BackButton,
} satisfies Meta<typeof BackButton>;

export default meta;
type Story = StoryObj<typeof BackButton>;

export const GoBackWithLabel: Story = {
  args: {
    label: 'Go Back',
    path: '/example',
  },
};

export const GoBackWithLabelId: Story = {
  args: {
    labelId: 'bookActions.label',
    path: '/example',
  },
};
