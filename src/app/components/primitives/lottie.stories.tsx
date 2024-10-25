import type { Meta, StoryObj } from '@storybook/react';
import LottieComponent from './lottie';

const meta: Meta<typeof LottieComponent> = {
  title: 'Components/Primitives/Lottie',
  component: LottieComponent,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    autoplay: { control: 'boolean' },
    loop: { control: 'boolean' },
    style: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof LottieComponent>;

export const Default: Story = {
  args: {
    src: "https://cdn.lottielab.com/l/79r75TAX9dXH1D.json",
  },
};

export const CustomSrc: Story = {
  args: {
    src: "https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json",
  },
};

export const WithCustomStyle: Story = {
  args: {
    src: "https://cdn.lottielab.com/l/79r75TAX9dXH1D.json",
    style: { width: '200px', height: '200px' },
  },
};

export const NoAutoplay: Story = {
  args: {
    src: "https://cdn.lottielab.com/l/79r75TAX9dXH1D.json",
    autoplay: false,
  },
};
