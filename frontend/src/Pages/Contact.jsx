import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., sending the data to an API
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mt-5 p-5 bg-white rounded-2 shadow-sm">
      <h2 className='pb-4 text-center border-1 border-bottom mb-5'>Contact Us</h2>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
            style={{outline: 'none', border: '1px solid #ccc', boxShadow:"none"}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
            style={{outline: 'none', border: '1px solid #ccc',boxShadow:"none"}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            id="message"
            name="message"
            className="form-control"
            value={formData.message}
            onChange={handleChange}
            rows="10"
            style={{resize:"none", outline: 'none', border: '1px solid #ccc', boxShadow:"none"}}
            required
          />
        </div>
        <button type="submit" className="Btn py-2 fw-medium rounded border-0" style={{backgroundColor: '#24befa'}}>Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
