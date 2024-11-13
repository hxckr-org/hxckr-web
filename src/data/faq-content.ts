export type FAQCategory = {
  title: string;
  items: {
    question: string;
    answer: string;
  }[];
};

export const faqCategories: FAQCategory[] = [
  {
    title: "General",
    items: [
      {
        question: "What prerequisites do I need before starting?",
        answer: "Basic programming experience in any language supported by Jede is recommended. While prior Bitcoin knowledge is helpful, it's not required as our courses start with fundamentals.",
      },
      {
        question: "How is the learning content structured?",
        answer: "Content is organized into hands-on challenges that progress from basic to advanced concepts. Each challenge includes practical coding tasks, automated tests, and instant feedback.",
      },
      {
        question: "Is this platform suitable for beginners in Bitcoin development?",
        answer: "Yes! While some programming experience is needed, our curriculum is designed to take you from Bitcoin basics through to advanced protocol development.",
      },
      {
        question: "How long does it typically take to complete a challenge?",
        answer: "Beginner challenges take approximately 2 - 4 hours to complete, though more complex ones might require several hours spread across multiple sessions.",
      },
    ],
  },
  {
    title: "Tasks & Challenges",
    items: [
      {
        question: "How do the coding challenges work?",
        answer: "Each challenge provides a unique git repository with broken or incomplete Bitcoin-related code. Your task is to fix or implement the missing functionality while passing all test cases.",
      },
      {
        question: "What types of challenges are available?",
        answer: "Challenges range from implementing basic Bitcoin transactions to building multi-signature wallets, and Lightning Network applications.",
      },
      {
        question: "How do I submit my solutions?",
        answer: "Solutions are submitted from your local terminal using your preferred development environment. Our automated system runs tests against your code and provides immediate feedback on your implementation.",
      },
      {
        question: "Can I get help if I'm stuck on a challenge?",
        answer: "Yes! You can discuss challenges in our Discord community, where both peers and mentors can provide guidance without directly giving away solutions.",
      },
    ],
  },
  {
    title: "Badges & Achievements",
    items: [
      {
        question: "How do I earn badges?",
        answer: "Badges are awarded for completing challenges, contributing to the community, and reaching specific milestones in your learning journey.",
      },
      {
        question: "What types of badges are available?",
        answer: "We offer badges for different skill levels (Beginner, Intermediate, Advanced) and specializations (Transaction Scripts, Lightning Network, Smart Contracts, etc.).",
      },
      {
        question: "Are badges visible on my GitHub profile?",
        answer: "No! Earned badges are only displayed on your profile in the app.",
      },
      {
        question: "Do badges expire?",
        answer: "No, badges are permanent achievements. However, we encourage continuous learning as the Bitcoin ecosystem evolves.",
      },
    ],
  },
];
