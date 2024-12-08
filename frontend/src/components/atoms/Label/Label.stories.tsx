import { Meta, StoryObj } from '@storybook/react';

import { Label } from './Label';

const meta = {
  title: 'Atoms/Label',
  component: Label,
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Label',
  },
};

export const H1Label: Story = {
  args: {
    children: 'Label',
    variant: 'h1',
  },
};

export const H2Label: Story = {
  args: {
    children: 'Label',
    variant: 'h2',
  },
};

export const H3Label: Story = {
  args: {
    children: 'Label',
    variant: 'h3',
  },
};

export const H4Label: Story = {
  args: {
    children: 'Label',
    variant: 'h4',
  },
};

export const H5Label: Story = {
  args: {
    children: 'Label',
    variant: 'h5',
  },
};

export const H6Label: Story = {
  args: {
    children: 'Label',
    variant: 'h6',
  },
};
