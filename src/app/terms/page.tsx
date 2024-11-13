import LandingPageLayout from "../components/layout/landing-page-layout";
import Link from "next/link";

export default function TermsPage() {
  return (
    <LandingPageLayout>
      <div className="w-full bg-white pt-32">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-gray-700">
                Welcome to Jede. By accessing our platform, you agree to these terms of service. Jede is a learning platform dedicated to helping software engineers understand and work with Bitcoin technology.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">2. Services</h2>
              <p className="text-gray-700">
                Jede provides educational content, tutorials, and resources related to Bitcoin development. Our services are intended for software engineers and developers looking to enhance their knowledge of Bitcoin technology.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
              <p className="text-gray-700">
                Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">4. Content Usage</h2>
              <p className="text-gray-700">
                All content provided on Jede is for educational purposes only. Users may not reproduce, distribute, or commercially exploit the content without explicit permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">5. Disclaimer</h2>
              <p className="text-gray-700">
                While we strive to provide accurate and up-to-date information, Jede is not responsible for any errors or omissions in the content. Users should verify all information and use it at their own risk.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">6. Privacy Policy</h2>
              <p className="text-gray-700">
                At Jede, we are committed to protecting your privacy and ensuring the security of your personal information. Please review our{' '}
                <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>{' '}
                for detailed information about how we collect, use, and protect your data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">7. Changes to Terms</h2>
              <p className="text-gray-700">
                Jede reserves the right to modify these terms and privacy policy at any time. Users will be notified of any significant changes.
              </p>
            </div>
          </section>

          <div className="mt-12 text-sm text-gray-600">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </LandingPageLayout>
  );
}
