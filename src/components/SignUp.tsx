import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !email) {
      setError('Username and email cannot be empty');
    } else if (username.length < 4) {
      setError('Username must be at least 4 characters');
    } else {
      // Perform sign up logic here

      // Redirect to the login page
      window.location.href = '/login';
    }
  };

  useEffect(() => {
    if (error) {
      // Scroll to the top of the page if there is an error
      window.scrollTo(0, 0);
    }
  }, [error]);

  return (
    <div data-testid="signup">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <input type="file" name="" id="" />
        <button>Send</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUp;
