import React, { useState } from 'react';
import './App.css';
import { supabase } from './supabaseClient'; // Import the configured Supabase client

// IMPORTANT: Replace this placeholder URL with the actual URL to your Synapse Global logo
const SYNAPSE_LOGO_URL = 'https://i.ibb.co/c1r0d0X/synapse-global-logo.png';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    continent: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const continents = [
    'North America', 'South America', 'Europe', 'Asia', 'Africa'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
          .from('registrations') // <--- Your Supabase table name
          .insert([formData]); // Insert the form data object

      if (error) {
        // Supabase error handling (e.g., duplicate email based on DB constraints)
        if (error.code === '23505') { // PostgreSQL unique violation code
          alert('Registration failed. This email is already registered!');
        } else {
          alert(`Registration failed. Error: ${error.message}`);
        }
        console.error('Supabase Error:', error);
      } else {
        // Successful registration
        alert('Registration successful! You will receive the Google Meet link via email shortly.');
        // Reset form
        setFormData({ fullName: '', email: '', continent: '' });
      }
    } catch (error) {
      // Network or client side error
      alert('A network error occurred during registration. Please try again later.');
      console.error('Network Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="app-container">
        <header className="header">
          <div className="logo-section">
            <img src={'./logo192.jpg'} alt="Synapse Global Logo" className="logo" />
            <div className="logo-text">
              <span className="logo-main">Synapse Global</span>
              <span className="logo-motto">Connect. Code. Conquer the Globe.</span>
            </div>
          </div>
          <h1>How to Start Your Coding Journey for Freshers</h1>
          <p className="subtitle">Your First Step Towards a Career in Code</p>
          <div className="event-details">
            <span>Date: October 19, 2025</span> |
            <span>Time: 2:30 PM IST</span> |
            <span>Platform: Google Meet</span>
          </div>
          <p className="host">Hosted by Synapse Global Leadership</p>
        </header>

        <main className="main-content">
          <section className="description-section">
            <p>
              Are you eager to dive into the world of coding but don't know where to begin? This event is specifically designed for absolute beginners and freshers who are curious about programming and want to kickstart their journey.
            </p>
            <p>
              Join Synapse Global for an insightful session where we'll demystify the initial steps of learning to code. We'll cover:
            </p>
            <ul>
              <li><strong>Why Learn to Code?</strong> Understanding the opportunities and benefits of a career in tech.</li>
              <li><strong>Choosing Your First Language:</strong> A guide to popular beginner-friendly programming languages and how to pick the right one for you.</li>
              <li><strong>Essential Tools & Resources:</strong> Discover the must-have software, online platforms, and communities that will support your learning.</li>
              <li><strong>Building Your First Project:</strong> Tips on how to approach your initial coding projects and gain practical experience.</li>
              <li><strong>Learning Strategies & Best Practices:</strong> How to stay motivated, overcome challenges, and build a solid foundation.</li>
            </ul>
            <p>
              This interactive session will provide you with a clear roadmap and actionable advice to confidently embark on your coding adventure. Bring your questions and get ready to connect, code, and conquer!
            </p>
          </section>

          <section className="registration-section">
            <h2>Secure Your Spot!</h2>
            <form onSubmit={handleSubmit} className="registration-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
              </div>
              <div className="form-group">
                <label htmlFor="continent">Region</label>
                <select
                    id="continent"
                    name="continent"
                    value={formData.continent}
                    onChange={handleChange}
                    required
                >
                  <option value="">Select your Region</option>
                  {continents.map(continent => (
                      <option key={continent} value={continent}>{continent}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? 'Registering...' : 'Register Now'}
              </button>
            </form>
          </section>
        </main>

        <footer className="footer">
          <p>Connect. Code. Conquer the Globe.</p>
          <p>&copy; 2025 Synapse Global. All rights reserved.</p>
        </footer>
      </div>
  );
}

export default App;