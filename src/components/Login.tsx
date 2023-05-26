  import React, { useEffect, useState } from 'react';
  import jwt_decode from 'jwt-decode';
  import useAppDispatch from '../hooks/useAppDispatch';
  import { userLogin, userLogout } from '../redux/reducers/authenticationReducer';
  import useAppSelector from '../hooks/useAppSelector';
  import { UserProfile } from '../types/UserProfile';
import { setCurrentUser } from '../redux/reducers/usersReducer';
import Home from './layout/Home';
import ProfilePage from './layout/ProfilePage';

  interface DecodedToken {
    name: string;
  }

  const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedUserProfile = localStorage.getItem('userProfile');
    if (storedUserProfile  && isLoggedIn) {
      const parsedUserProfile = JSON.parse(storedUserProfile);
      setUserProfile(parsedUserProfile);
    }
    else {
      setUserProfile(null);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    } else {
      localStorage.removeItem('userProfile');
    }
  }, [userProfile]);

  const handleLogin = async () => {
    try {
      console.log('Logging in...');
      await dispatch(userLogin({ email, password })).unwrap();
      setIsLoggedIn(true);
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    dispatch(userLogout());
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Username and password are required');
    } else {
      handleLogin();
    }
  };

  return (
    <div data-testid="login">
      <h2>Login</h2>
      {isLoggedIn ? (
        <div>
          <p>Welcome, {userProfile?.name}!</p>
          <button onClick={handleLogout}>Logout</button>
          {/* <ProfilePage></ProfilePage> */}
          <Home></Home>
          
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
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
          <button>Login</button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Login;
