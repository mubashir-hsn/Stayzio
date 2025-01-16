import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container bg-white py-4 px-5 mt-5 rounded-1 shadow-sm" style={{ textAlign: "justify" }}>
      <h2 className="py-4 text-center border-1 border-bottom">Our Privacy Policy</h2>
      <p className="pt-4">Effective Date: <strong>{new Date().toLocaleDateString()}</strong></p>

      <section className="mb-4">
        <h4 className="fw-bold" style={{ color: "#24befa" }}>Introduction</h4>
        <p>
          Welcome to Stayzio! We value your privacy and are committed to protecting your personal information.
          This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="fw-bold" style={{ color: "#24befa" }}>Information We Collect</h4>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, phone number, etc., when provided through forms.</li>
          <li><strong>Usage Data:</strong> Information about your device, browser, and interaction with our website (e.g., IP address, cookies).</li>
          <li><strong>Cookies:</strong> Small data files stored on your device to enhance your browsing experience.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h4 className="fw-bold" style={{ color: "#24befa" }}>How We Use Your Information</h4>
        <p>We use your information for the following purposes:</p>
        <ul>
          <li>To provide and manage our services.</li>
          <li>To personalize user experiences and improve our website.</li>
          <li>To communicate with you, including responding to inquiries or sending updates.</li>
          <li>To analyze usage trends and improve website performance.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h4 className="fw-bold" style={{ color: "#24befa" }}>Sharing Your Information</h4>
        <p>We do not sell or rent your personal information to third parties. However, we may share your data in the following circumstances:</p>
        <ul>
          <li>With service providers to perform functions on our behalf (e.g., analytics, hosting).</li>
          <li>To comply with legal obligations or protect our rights.</li>
          <li>In connection with a business transaction, such as a merger or sale.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h4 className="fw-bold" style={{ color: "#24befa" }}>Your Rights</h4>
        <p>You have the following rights regarding your personal data:</p>
        <ul>
          <li>Access and request a copy of your data.</li>
          <li>Request correction or deletion of your information.</li>
          <li>Object to the processing of your data.</li>
          <li>Withdraw consent at any time for data processing.</li>
        </ul>
        <p>
          To exercise these rights, contact us at <a href="mailto:privacy@stayzio.com">privacy@stayzio.com</a>.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="fw-bold" style={{ color: "#24befa" }}>Data Security</h4>
        <p>
          We implement reasonable security measures to protect your data from unauthorized access or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="fw-bold" style={{ color: "#24befa" }}>Third-Party Links</h4>
        <p>
          Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to read their privacy policies.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="fw-bold" style={{ color: "#24befa" }}>Children's Privacy</h4>
        <p>
          Stayzio does not knowingly collect information from children under 13. If we learn that we have collected data from a child without parental consent, we will delete it.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="fw-bold" style={{ color: "#24befa" }}>Updates to This Policy</h4>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="fw-bold" style={{ color: "#24befa" }}>Contact Us</h4>
        <p>
          If you have any questions or concerns about this Privacy Policy, please contact us:
        </p>
        <ul>
          <li>Email: <a href="mailto:privacy@stayzio.com">privacy@stayzio.com</a></li>
          <li>Phone: +1 234 567 890</li>
          <li>Address: Stayzio Blog, 123 Blog Street, Blog City, BC 45678</li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
