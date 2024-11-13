import LandingPageLayout from "../components/layout/landing-page-layout";

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
                At Jede, we are committed to protecting your privacy and ensuring the security of your personal information. This privacy policy explains how we collect, use, and protect your data.
              </p>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">Data Collection</h3>
              <p className="text-gray-700">
                We collect the following types of information:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-2">
                <li>Account information (GitHub profile data during sign-up)</li>
                <li>Learning progress and course completion data</li>
                <li>Usage analytics to improve our platform</li>
                <li>Technical information for security and functionality</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4 mb-2">Data Usage</h3>
              <p className="text-gray-700">
                Your data is used for the following purposes:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-2">
                <li>Providing and improving our educational services</li>
                <li>Tracking your learning progress</li>
                <li>Personalizing your learning experience</li>
                <li>Ensuring platform security and preventing abuse</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4 mb-2">Data Protection</h3>
              <p className="text-gray-700">
                We implement industry-standard security measures to protect your data, including:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-2">
                <li>Secure data encryption in transit and at rest</li>
                <li>Regular security audits and updates</li>
                <li>Strict access controls and authentication</li>
                <li>Secure data backup and recovery procedures</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4 mb-2">Data Sharing</h3>
              <p className="text-gray-700">
                We do not sell your personal information to third parties. We may share your data only in the following circumstances:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>With service providers who assist in platform operations</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4 mb-2">Your Rights</h3>
              <p className="text-gray-700">
                You have the right to:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-2">
                <li>Access your personal data</li>
                <li>Request corrections to your data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of certain data collection</li>
              </ul>
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
