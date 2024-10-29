import type { Meta, StoryObj } from '@storybook/react';
import AccordionComponent from '@/app/components/primitives/accordion';

const meta: Meta<typeof AccordionComponent> = {
  title: 'Components/Primitives/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  argTypes: {
    data: { control: 'object' },
    accordionRootClassName: { control: 'text' },
    accordionItemClassName: { control: 'text' },
    accordionTriggerClassName: { control: 'text' },
    accordionContentClassName: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof AccordionComponent>;

const defaultData = [
  {
    title: "What is Bitcoin?",
    content: "Bitcoin is a decentralized digital currency that can be transferred on the peer-to-peer bitcoin network.",
  },
  {
    title: "How does Bitcoin work?",
    content: "Bitcoin uses blockchain technology to create a distributed ledger of all transactions, eliminating the need for a central authority.",
  },
  {
    title: "Is Bitcoin safe?",
    content: "While Bitcoin's technology is considered secure, it's important to take precautions when storing and using Bitcoin, such as using secure wallets and being aware of potential scams.",
  },
];

export const Default: Story = {
  args: {
    data: defaultData,
  },
};

export const CustomStyles: Story = {
  args: {
    data: defaultData,
    accordionRootClassName: "w-full max-w-md",
    accordionItemClassName: "bg-blue-100 mb-2",
    accordionTriggerClassName: "font-bold text-blue-600",
    accordionContentClassName: "text-gray-700",
  },
};

export const SingleItem: Story = {
  args: {
    data: [defaultData[0]],
  },
};

