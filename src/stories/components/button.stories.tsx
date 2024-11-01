import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/app/components/primitives/button';

const meta: Meta<typeof Button> = {
  title: 'Components/Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    className: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Click me',
  },
};

export const CustomClass: Story = {
  args: {
    children: 'Custom Button',
    className: 'bg-red-500 hover:bg-red-600',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
        </svg>
        Button with Icon
      </>
    ),
  },
};

