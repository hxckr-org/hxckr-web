import type { Meta, StoryObj } from '@storybook/react';
import BTCMasterySection from '@/app/components/sections/landing-btc-mastery';

const meta: Meta<typeof BTCMasterySection> = {
  title: 'Sections/Landing/BTCMastery',
  component: BTCMasterySection,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    avatars: {
      control: 'object',
      description: 'Array of avatar image URLs',
    },
    title: {
      control: 'text',
      description: 'Main title of the section',
    },
    description: {
      control: 'text',
      description: 'Description text below the title',
    },
    launchingText: {
      control: 'text',
      description: 'Text shown next to avatars',
    },
    ctaText: {
      control: 'text',
      description: 'Call-to-action button text',
    },
    ctaLink: {
      control: 'text',
      description: 'Call-to-action button link',
    },
    image: {
      control: 'text',
      description: 'Background image URL',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BTCMasterySection>;

export const Default: Story = {};

export const CustomContent: Story = {
  args: {
    title: "Start Your Bitcoin Development Journey Today",
    description: "Master Bitcoin development with our comprehensive curriculum and hands-on projects.",
    launchingText: "Join our beta program",
    ctaText: "Get Started Now",
    ctaLink: "/signup",
  },
};

export const FewerAvatars: Story = {
  args: {
    avatars: [
      "/assets/images/launching-soon-avatar-1.png",
      "/assets/images/launching-soon-avatar-2.png",
      "/assets/images/launching-soon-avatar-3.png",
    ],
  },
};

export const CustomBackground: Story = {
  args: {
    image: "/assets/images/alternative-background.webp",
  },
};
