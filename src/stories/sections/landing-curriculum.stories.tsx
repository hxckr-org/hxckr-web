import type { Meta, StoryObj } from "@storybook/react";
import CurriculumSection from "@/app/components/sections/landing-curriculum";

const meta: Meta<typeof CurriculumSection> = {
  title: "Sections/Landing/CurriculumSection",
  component: CurriculumSection,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof CurriculumSection>;

export const Default: Story = {
  args: {},
};
