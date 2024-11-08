import Link from "next/link";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-grey-signin-background mx-auto px-4 py-8">
      <div className="container mx-auto flex justify-center items-center h-full">
        <Card>
          <CardHeader>
            <CardTitle>Privacy Policy</CardTitle>
            <Link
              href="/signin"
              className="text-sm text-[#5A5B5C] font-normal underline"
            >
              Back to login
            </Link>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-xl font-semibold mt-4">
                GitHub Sign-Up Data Usage
              </h2>

              <p>
                When you choose to sign up for our service using your GitHub
                account, we collect and process certain information from your
                GitHub profile. This privacy policy explains how we handle this
                data.
              </p>

              <h3 className="text-lg font-semibold mt-4">
                Information We Collect
              </h3>
              <p>
                When you sign up using GitHub, we may collect the following
                information:
              </p>
              <ul className="list-disc pl-6">
                <li>Your GitHub username</li>
                <li>
                  Your public email address associated with your GitHub account
                </li>
                <li>Your GitHub avatar URL</li>
                <li>Your name (if publicly available on GitHub)</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">
                How We Use Your Information
              </h3>
              <p>
                We use the information collected from GitHub for the following
                purposes:
              </p>
              <ul className="list-disc pl-6">
                <li>To create and manage your account on our platform</li>
                <li>To personalize your user experience</li>
                <li>
                  To communicate with you about your account and our services
                </li>
                <li>To provide customer support</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">Data Protection</h3>
              <p>
                We are committed to protecting your data. We implement
                industry-standard security measures to prevent unauthorized
                access, disclosure, or alteration of your personal information.
              </p>

              <h3 className="text-lg font-semibold mt-4">Data Sharing</h3>
              <p>
                We do not sell, trade, or otherwise transfer your personal
                information to outside parties. This does not include trusted
                third parties who assist us in operating our website, conducting
                our business, or servicing you, as long as those parties agree
                to keep this information confidential.
              </p>

              <h3 className="text-lg font-semibold mt-4">Your Rights</h3>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of any inaccurate information</li>
                <li>Request deletion of your data from our systems</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">
                Changes to This Policy
              </h3>
              <p>
                We may update this privacy policy from time to time. We will
                notify you of any changes by posting the new privacy policy on
                this page and updating the &quot;last updated&quot; date.
              </p>

              <h3 className="text-lg font-semibold mt-4">Contact Us</h3>
              <p>
                If you have any questions about this privacy policy or our
                handling of your GitHub data, please contact us at{" "}
                <a
                  href="mailto:info@jede.com"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  info@jede.com
                </a>
                .
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-6">
                Last updated: 08, Nov 2024
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white text-black rounded-lg shadow-lg overflow-hidden">
    {children}
  </div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
    {children}
  </div>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-2xl font-bold text-gray-800">{children}</h1>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="px-6 py-4">{children}</div>
);
