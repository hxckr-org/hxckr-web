import type { Meta, StoryObj } from '@storybook/react';
import Footer from '@/app/components/sections/footer';

const meta: Meta<typeof Footer> = {
  title: 'Sections/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    faqData: {
      control: 'object',
      description: 'FAQ data for the accordion',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

// Default story with original FAQ data
export const Default: Story = {};

// Story with custom FAQ data
export const CustomFAQs: Story = {
  args: {
    faqData: [
      {
        title: "How long does each course take?",
        content: "Course duration varies based on your pace and prior experience. Most students complete a course within 4-6 weeks."
      },
      {
        title: "Is there a community for support?",
        content: "Yes! We have an active Discord community where you can get help from mentors and peers."
      },
      {
        title: "Do I need prior coding experience?",
        content: "While helpful, no prior coding experience is required. Our courses start from the basics."
      }
    ]
  }
};

// Story with minimal FAQ data
export const MinimalFAQs: Story = {
  args: {
    faqData: [
      {
        title: "What is Bitcoin development?",
        content: "Bitcoin development involves creating applications and solutions using Bitcoin's protocol and technology stack."
      }
    ]
  }
};

