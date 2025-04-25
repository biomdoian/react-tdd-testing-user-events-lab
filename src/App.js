import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState([]);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleInterestChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setInterests([...interests, value]);
    } else {
      setInterests(interests.filter((interest) => interest !== value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const interestsList = interests.length > 0 ? ` Your interests: ${interests.join(', ')}` : '';
    setSubmissionMessage(`Thank you for signing up, ${name} (${email})!${interestsList}`);
    setName('');
    setEmail('');
    setInterests([]);
  };

  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <h2>Sign up for our newsletter!</h2>
      {submissionMessage ? (
        <p>{submissionMessage}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <h3>Interests</h3>
            <div>
              <input
                type="checkbox"
                id="web-development"
                value="web development"
                checked={interests.includes('web development')}
                onChange={handleInterestChange}
              />
              <label htmlFor="web-development">Web Development</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="design"
                value="design"
                checked={interests.includes('design')}
                onChange={handleInterestChange}
              />
              <label htmlFor="design">Design</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="marketing"
                value="marketing"
                checked={interests.includes('marketing')}
                onChange={handleInterestChange}
              />
              <label htmlFor="marketing">Marketing</label>
            </div>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      )}
    </main>
  );
}

export default App;