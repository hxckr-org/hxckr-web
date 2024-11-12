import Link from "next/link";
import AccordionComponent from "@/app/components/primitives/accordion";

type FAQItem = {
  title: string;
  content: string;
};

interface FooterProps {
  faqData?: FAQItem[];
}

const defaultFAQs = [
  {
    title: "Am I issued a certificate at the end of the course?",
    content: "No. However, you earn badges for each milestone completed.",
  },
  {
    title: "What do the courses entail?",
    content: "Each course is a self-paced, interactive experience where you learn about the fundamentals of Bitcoin technology.",
  },
];

export default function Footer({ faqData = defaultFAQs }: FooterProps) {
  return (
    <footer className="bg-grey-footer-background flex flex-col py-32">
      <div className="max-w-[1460px] w-full flex flex-col m-auto gap-14">
        {/* FAQ Section */}
        <div className="flex flex-row justify-between mb-20">
          <div className="flex flex-col items-left gap-4 pl-10">
            <p className="text-[2.5rem] text-white font-p22mackinac font-bold leading-[60px] tracking-[-2%]">
              Frequently Asked Questions
            </p>
            <p className="text-grey-footer-text text-xl font-light tracking-[-2%] leading-[34px]">
              Answers to your questions.
            </p>
            <Link
              href="/faq"
              className="text-white text-xl font-light tracking-[-2%] leading-[34px] w-fit mt-10 bg-purple-primary px-10 py-4 rounded-full"
            >
              See All FAQs
            </Link>
          </div>
          <div className="flex flex-col items-left gap-4 text-white pr-10">
            <AccordionComponent data={faqData} />
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="grid grid-cols-3 gap-20 text-white border-t border-grey-accordion-background pt-20">
          <div className="flex flex-col gap-6 relative pl-10">
            <h3 className="text-xl font-semibold">Contact</h3>
            <div className="flex flex-col gap-4">
              <Link href="https://twitter.com" className="text-grey-footer-text hover:text-white">Twitter</Link>
              <Link href="https://discord.com" className="text-grey-footer-text hover:text-white">Discord</Link>
            </div>
            <div className="absolute right-0 top-0 h-full w-[1px] bg-grey-accordion-background"></div>
          </div>

          <div className="flex flex-col gap-6 relative">
            <h3 className="text-xl font-semibold">Menu</h3>
            <div className="flex flex-col gap-4">
              <Link href="#features" className="text-grey-footer-text hover:text-white">Our Features</Link>
              <Link href="#curriculum" className="text-grey-footer-text hover:text-white">Our Curriculum</Link>
            </div>
            <div className="absolute right-0 top-0 h-full w-[1px] bg-grey-accordion-background"></div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-semibold">Resources</h3>
            <div className="flex flex-col gap-4">
              <Link href="/faq" className="text-grey-footer-text hover:text-white">FAQs</Link>
              <Link href="/contact" className="text-grey-footer-text hover:text-white">Contact Us</Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col gap-4 border-t border-grey-accordion-background pt-10 mt-10">
          <div className="text-2xl font-bold text-white pl-10">LOGO</div>
          <p className="text-grey-footer-text max-w-[500px] pl-10">
            Learn, build, and grow with hands-on tasks and instant code reviews. Join our pioneer
            program for hands-on learning and personalised code feedback loops.
          </p>
          <div className="flex gap-4 text-grey-footer-text text-sm mt-4 pl-10">
            <span>© Product Name 2024</span>
            <span>•</span>
            <Link href="/terms" className="hover:text-white">Terms & Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
