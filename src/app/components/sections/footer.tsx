import Link from "next/link";
import AccordionComponent from "@/app/components/primitives/accordion";

export default function Footer() {
  return (
    <footer className="bg-grey-footer-background flex flex-col py-32">
      <div className="max-w-[1460px] w-full flex flex-col m-auto gap-14">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col items-left gap-4">
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
          <div className="flex flex-col items-left gap-4 text-white">
            <AccordionComponent
              data={[
                {
                  title: "Am I issued a certificate at the end of the course?",
                  content:
                    "No. However, you earn badges for each milestone completed.",
                },
                {
                  title: "What do the courses entail?",
                  content:
                    "Each course is a self-paced, interactive experience where you learn about the fundamentals of Bitcoin technology.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
