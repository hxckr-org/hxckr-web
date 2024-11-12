import type { Meta, StoryObj } from "@storybook/react";
import HeroSection from "@/app/components/sections/landing-hero";

const meta: Meta<typeof HeroSection> = {
  title: "Sections/Landing/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  decorators: [
    (Story) => (
      <div className="h-[150vh] overflow-y-auto">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: {
    title: "Development at Your Own Pace.",
    description: "Learn, build, and grow with hands-on tasks and instant code reviews. Join our pioneer program for hands-on learning and personalised code feedback loops.",
    bannerText: "Technical Bitcoin Education For You"
  },
};

export const BannerOnly: Story = {
  render: () => <HeroSection.Banner />,
};