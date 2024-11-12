import Image from "next/image";
import FAQContent from "@/app/components/sections/faq-content";
import { faqCategories } from "@/data/faq-content";

export default function FAQPage() {
  return (
    <div className="bg-purple-accent w-full">
      <div className="container mx-auto px-4 py-8 pt-48">
        {/* Header Image */}
        <div className="flex justify-center mb-12">
          <Image
            src="/assets/images/faqs-header-image.svg"
            alt="FAQ Header Image"
            width={320}
            height={560}
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h1>
        
        {/* Client-side FAQ content with search */}
        <FAQContent categories={faqCategories} />
      </div>
    </div>
  );
}
