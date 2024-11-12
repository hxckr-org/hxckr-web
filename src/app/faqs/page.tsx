import Image from "next/image";

export default function FAQPage() {
  return (
    <div className="bg-purple-accent w-full">
      <div className="container mx-auto px-4 py-8">
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

        {/* Title and Search */}
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h1>
          
          {/* Search Input */}
          <div className="mb-16">
            <input
              type="text"
              placeholder="Search for a question..."
              className="w-full px-6 py-4 rounded-full border border-grey-accent bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-primary"
            />
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {/* General Section */}
            <div>
              <h2 className="text-2xl font-semibold text-purple-primary mb-6">
                General
              </h2>
              
              <div className="space-y-4">
                {/* FAQ Items */}
                <div className="bg-white rounded-2xl p-6 border border-grey-accent">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">
                      Am I issued any certificate at the end?
                    </h3>
                    <button className="text-2xl">−</button>
                  </div>
                  <p className="text-gray-600 mt-4">
                    No, however you earn badges for each milestone completed.
                  </p>
                </div>

                {/* Add more FAQ items with similar structure */}
                <div className="bg-white rounded-2xl p-6 border border-grey-accent">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">
                      What do the courses entail?
                    </h3>
                    <button className="text-2xl">+</button>
                  </div>
                </div>

                {/* More FAQ items... */}
              </div>
            </div>

            {/* You can add more categories following the same pattern */}
          </div>
        </div>
      </div>
    </div>
  );
}
