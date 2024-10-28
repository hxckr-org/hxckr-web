import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Primitives/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: 'https://github.com/github.png',
    alt: 'GitHub Avatar',
  },
};

export const CustomSize: Story = {
  args: {
    src: 'https://github.com/github.png',
    alt: 'GitHub Avatar',
    className: 'w-20 h-20',
  },
};

export const CustomBorder: Story = {
  args: {
    src: 'https://github.com/github.png',
    alt: 'GitHub Avatar',
    className: 'border-4 border-purple-500',
  },
};

