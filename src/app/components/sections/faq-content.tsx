"use client";

import { useState } from "react";
import { FAQCategory } from "@/data/faq-content";
import AccordionComponent from "@/app/components/primitives/accordion";

interface FAQContentProps {
  categories: FAQCategory[];
}

export default function FAQContent({ categories }: FAQContentProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter FAQs based on search query
  const filteredCategories = categories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="max-w-[800px] mx-auto">
      {/* Search Input */}
      <div className="mb-16">
        <input
          type="text"
          placeholder="Search for a question..."
          className="w-full px-6 py-4 rounded-full border border-grey-accent bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* FAQ Categories */}
      <div className="space-y-12">
        {filteredCategories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h2 className="text-2xl font-semibold text-purple-primary mb-6">
              {category.title}
            </h2>
            
            <AccordionComponent 
              data={category.items.map(item => ({
                title: item.question,
                content: item.answer
              }))}
              accordionRootClassName="w-full"
              accordionItemClassName="bg-white border border-grey-accent rounded-2xl mb-4 last:mb-0"
              accordionTriggerClassName="p-6"
              accordionContentClassName="p-6 pt-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
