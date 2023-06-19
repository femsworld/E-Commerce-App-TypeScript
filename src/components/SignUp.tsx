import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvater] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Name and email cannot be empty');
    } else if (name.length < 4) {
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

  // const createNewUser = () => {
  //   dispatch(dispatch CreateNewUserFuciReducer({name, email, password, avatar}))
  // }
  
  return (
    <div data-testid="signup">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        {/* <input type="dro" name="" role=  /> */}
        {/* <button onClick={() => createNewUser()}>Send</button> */}
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUp;
