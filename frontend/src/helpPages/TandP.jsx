import React from "react";

const TermsAndPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto py-10 px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-teal-400">
            Terms and Policies
          </h1>
          <p className="text-gray-400 mt-2">
            Please read our terms and policies carefully to understand your
            rights and obligations.
          </p>
        </div>

        {/* Terms of Service */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-teal-400 mb-4">
            Terms of Service
          </h2>
          <p className="text-gray-400 leading-7 mb-4">
            By using our application, you agree to abide by our terms and
            conditions. These terms outline your rights and responsibilities
            when using the application.
          </p>
          <ul className="list-disc list-inside text-gray-400 leading-7">
            <li>
              You must not use the application for any illegal or unauthorized
              purpose.
            </li>
            <li>
              You agree to provide accurate and up-to-date information when
              registering an account.
            </li>
            <li>
              We reserve the right to terminate accounts for violations of our
              terms.
            </li>
          </ul>
        </section>

        {/* Privacy Policy */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-teal-400 mb-4">
            Privacy Policy
          </h2>
          <p className="text-gray-400 leading-7 mb-4">
            Your privacy is important to us. This section explains how we
            collect, use, and protect your personal information.
          </p>
          <ul className="list-disc list-inside text-gray-400 leading-7">
            <li>
              We collect your information to provide a better experience and
              improve our services.
            </li>
            <li>
              Your personal data is protected using industry-standard security
              measures.
            </li>
            <li>
              We do not share your information with third parties without your
              consent, except as required by law.
            </li>
          </ul>
        </section>

        {/* User Responsibilities */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-teal-400 mb-4">
            User Responsibilities
          </h2>
          <p className="text-gray-400 leading-7 mb-4">
            As a user of our platform, you are responsible for:
          </p>
          <ul className="list-disc list-inside text-gray-400 leading-7">
            <li>
              Keeping your login credentials secure and not sharing them with
              others.
            </li>
            <li>
              Respecting other users and refraining from abusive or harmful
              behavior.
            </li>
            <li>
              Reporting any suspicious or unauthorized activities immediately.
            </li>
          </ul>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-bold text-teal-400 mb-4">
            Contact Information
          </h2>
          <p className="text-gray-400 leading-7">
            If you have any questions or concerns regarding these terms or our
            policies, feel free to reach out to us at:
          </p>
          <ul className="list-none mt-4 text-gray-400">
            <li>
              Email:{" "}
              <a
                href="mailto:shivamtestinghost@gmail.com"
                className="text-teal-500 hover:text-teal-300"
              >
                shivamtestinghost@gmail.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                href="tel:+919417313393"
                className="text-teal-500 hover:text-teal-300"
              >
                +91 9417313393
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TermsAndPolicyPage;
