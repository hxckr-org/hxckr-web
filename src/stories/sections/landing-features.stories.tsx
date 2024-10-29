import type { Meta, StoryObj } from "@storybook/react";
import FeaturesSection from "@/app/components/sections/landing-features";

const meta: Meta<typeof FeaturesSection> = {
  title: "Sections/Landing/FeaturesSection",
  component: FeaturesSection,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof FeaturesSection>;

export const Default: Story = {
  args: {},
};

export const CustomFeatures: Story = {
  args: {
    features: [
      {
        image: "/assets/images/features-coding-1.png",
        title: "Custom Feature 1",
        description: "Custom description for feature 1",
      },
      {
        image: "/assets/images/features-chart-2.png",
        title: "Custom Feature 2",
        description: "Custom description for feature 2",
      },
      {
        image: "/assets/images/features-cubes-3.png",
        title: "Custom Feature 3",
        description: "Custom description for feature 3",
      },
    ],
  },
};