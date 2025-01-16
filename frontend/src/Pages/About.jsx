import React from "react";

const About = () => {
  return (
    <div className="container bg-white p-5 mt-5 rounded-2 shadow-sm" style={{ textAlign: "justify" }}>
      <h2 className="pb-4 text-center border-1 border-bottom mb-5">About Us</h2>

      <section className="mb-4">
        <h4 className="fw-bold" style={{ color: "#24befa" }}>Who We Are</h4>
        <p>
          Welcome to Stayzio, your trusted companion for insightful and engaging blog content. We are a team of passionate writers, thinkers, and creators dedicated to delivering high-quality articles that inspire, inform, and entertain our readers.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="fw-bold" style={{ color: "#24befa" }}>Our Mission</h4>
        <p>
          At Stayzio, our mission is to create a platform that connects readers with valuable information and stories. We aim to foster a community of knowledge seekers by delivering diverse and thought-provoking content across various topics.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="fw-bold" style={{ color: "#24befa" }}>What We Offer</h4>
        <p>
          We offer a wide range of blog articles, covering topics such as:
        </p>
        <ul>
          <li>Lifestyle and wellness tips.</li>
          <li>Technology trends and innovations.</li>
          <li>Travel guides and experiences.</li>
          <li>Personal development and productivity hacks.</li>
        </ul>
        <p>
          Each article is crafted with care, ensuring it resonates with our readers and provides meaningful insights.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="fw-bold" style={{ color: "#24befa" }}>Our Values</h4>
        <p>We are guided by the following core values:</p>
        <ul>
          <li><strong>Integrity:</strong> We strive for honesty and transparency in our content.</li>
          <li><strong>Creativity:</strong> We embrace innovative ideas and perspectives.</li>
          <li><strong>Community:</strong> We prioritize building connections and engaging with our readers.</li>
          <li><strong>Excellence:</strong> We are committed to delivering high-quality content consistently.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h4 className="fw-bold" style={{ color: "#24befa" }}>Meet the Team</h4>
        <p>
          Our team comprises dedicated professionals with expertise in various fields, united by a shared passion for storytelling and knowledge sharing. Together, we work to bring you content that inspires and informs.
        </p>
        <div className="team-members">
          <div className="team-member mb-3">
            <h5 className="fw-bold">John Doe</h5>
            <p>Founder & Chief Editor</p>
          </div>
          <div className="team-member mb-3">
            <h5 className="fw-bold">Jane Smith</h5>
            <p>Content Strategist</p>
          </div>
          <div className="team-member mb-3">
            <h5 className="fw-bold">Michael Brown</h5>
            <p>Technical Writer</p>
          </div>
        </div>
      </section>

      <section className="mb-4">
        <h4 className="fw-bold" style={{ color: "#24befa" }}>Join Our Community</h4>
        <p>
          Stay connected with us and be part of our growing community. Follow us on social media, subscribe to our newsletter, and share your thoughts and feedback. We value your input and look forward to hearing from you.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="fw-bold" style={{ color: "#24befa" }}>Contact Us</h4>
        <p>
          Have questions, suggestions, or just want to say hi? Reach out to us:
        </p>
        <ul>
          <li><b>Email:</b> <a href="#">contact@stayzio.com</a></li>
          <li><b>Phone:</b> +1 234 567 890</li>
          <li><b>Address:</b> Stayzio Blog, 123 Blog Street, Blog City, BC 45678</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
