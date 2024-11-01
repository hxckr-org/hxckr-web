import type { Meta, StoryObj } from "@storybook/react";
import HeroSection from "@/app/components/sections/landing-hero";

const meta: Meta<typeof HeroSection> = {
  title: "Sections/Landing/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: {},
};

// Story with Banner component separately
export const BannerOnly: Story = {
  render: () => <HeroSection.Banner />,
};