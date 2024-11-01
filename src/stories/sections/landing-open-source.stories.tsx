import type { Meta, StoryObj } from "@storybook/react";
import OpenSourceSection from "@/app/components/sections/landing-open-source";

const meta: Meta<typeof OpenSourceSection> = {
  title: "Sections/Landing/OpenSourceSection",
  component: OpenSourceSection,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof OpenSourceSection>;

export const Default: Story = {
  args: {},
};