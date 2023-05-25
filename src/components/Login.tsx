// import React, { useState } from 'react';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!username || !password) {
//       setError('Username and password are required');
//     } else {
//       window.location.href = '/';
//     }
//   };

//   return (
//     <div data-testid="login">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button>Login</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import useInput from '../hooks/useInput';
// import { CredentialResponse } from '@react-oauth/google';
// import jwt_decode from 'jwt-decode';

// interface GoogleResult {
//   name: string;
//   email: string;
// }
// interface DecodedToken {
//     name: string;
//   }
// const Login = () => {
//     const nameInput = useInput()
//     const emailInput = useInput()
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [user, setUser] = useState('');

//   const handleLogin = () => {
//     const { name } = decodeToken;
//     const sucessLogin = (credentialResponse: CredentialResponse) => {
//         const { credential } = credentialResponse 
//         if (credential) {
//             const decoded = jwt_decode<GoogleResult>(credential)
//             nameInput.setValue(decoded.name)
//             emailInput.setValue(decoded.email)
//         }
//     }
//     if (username === nameInput.value && password === 'password') {
//       // Mocking a JWT token
//       const token = 'YOUR_TOKEN';

//       // Decoding the token to extract user information
//     //   const decodedToken = decodeToken(token);
//     const decodedToken = decodeToken(token);
     

//       // Store user details in state
//       setUser(name);
//       setIsLoggedIn(true);
//       setError('');
//     } else {
//       setError('Invalid username or password');
//     }
//   };

//   const decodeToken = (token: string) => {
//     // Decoding the JWT token using jwt-decode library
//     // Replace this with your actual token decoding logic
//     try {
//       return jwt_decode(token);
//     } catch (error) {
//       return null;
//     }
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!username || !password) {
//       setError('Username and password are required');
//     } else {
//       handleLogin();
//     }
//   };

//   return (
//     <div data-testid="login">
//       <h2>Login</h2>
//       {isLoggedIn ? (
//         <div>
//           <p>Welcome, {user}!</p>
//           <button onClick={() => setIsLoggedIn(false)}>Logout</button>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button>Login</button>
//           {error && <p>{error}</p>}
//         </form>
//       )}
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import useInput from '../hooks/useInput';
// import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
// import jwt_decode from 'jwt-decode';

// interface GoogleResult {
//   name: string;
//   email: string;
// }

// interface DecodedToken {
//   name: string;
// }

// const Login = () => {
//   const nameInput = useInput();
//   const emailInput = useInput();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState('');

//   const handleLogin = (decodedToken: DecodedToken | null) => {
//     console.log('Entered username:', username);
//         console.log('Entered password:', password);
//     if (decodedToken && username === decodedToken.name && password === 'password') {
//       setUser(decodedToken.name);
//       setIsLoggedIn(true);
//       setError('');
//     } else {
//       setError('Invalid username or password');
//     }
//   };

// //   const decodeToken = (token: string) => {
// //     try {
// //       return jwt_decode<DecodedToken>(token);
// //     } catch (error) {
// //       return null;
// //     }
// //   };

// const decodedToken = jwt_decode<DecodedToken>(token);
// console.log('Decoded token:', decodedToken);

// // Check if the name property exists in the decoded token
// if (decodedToken && 'name' in decodedToken) {
//   const { name } = decodedToken;
//   setUser(name);
//   setIsLoggedIn(true);
//   setError('');
// } else {
//   setError('Invalid username or password');
// }

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!username || !password) {
//       setError('Username and password are required');
//     } else {
//       const token = 'YOUR_TOKEN';
//       const decodedToken = decodeToken(token);
//       handleLogin(decodedToken);
//     }
//   };

//   const successLogin = (credentialResponse: CredentialResponse) => {
//     const { credential } = credentialResponse;
//     if (credential) {
//       const decoded = jwt_decode<GoogleResult>(credential);
//       nameInput.setValue(decoded.name);
//       emailInput.setValue(decoded.email);
//     }
//   };

//   return (
//     <div data-testid="login">
//       <h2>Login</h2>
//       {isLoggedIn ? (
//         <div>
//           <p>Welcome, {user}!</p>
//           <button onClick={() => setIsLoggedIn(false)}>Logout</button>
//         </div>
//       ) : (
//         <div>
//             <GoogleOAuthProvider clientId={'324328018346-k4qe7t3mtk7ruk3j8o9gmricqlofu6g7.apps.googleusercontent.com'}  >
//           <GoogleLogin onSuccess={successLogin} />
//           </GoogleOAuthProvider>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="username"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button>Login</button>
//             {error && <p>{error}</p>}
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import useInput from '../hooks/useInput';
import jwt_decode from 'jwt-decode';
import useAppDispatch from '../hooks/useAppDispatch';
import { userLogin } from '../redux/reducers/authenticationReducer';
import useDebounce from 'react-use/lib/useDebounce';

interface DecodedToken {
  name: string;
}

const Login = () => {
  // const nameInput = useInput();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const dispatch = useAppDispatch()

  

  const handleLogin = () => {
    dispatch(userLogin({email, password}))
  };
// use app selector to get the userprofile and maybe result (so we could persist the state)
//after getting those from useAppsSelector, use useEffect to check if the user profile exist, if yess
//check in the use effect if user (current user) exist in localStorage, if Yes route to homepage
//In the dependency array, add the currentUser or profile 

//To logout, remove current user from local storage, and return homepage
  const decodeToken = (token: string): DecodedToken | null => {
    try {
      return jwt_decode<DecodedToken>(token);
    } catch (error) {
      return null;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email  || !password) {
      setError('Username and password are required');
    } else {
      console.log("test login")
      handleLogin();
    }
    // useDebounce(handleLogin, 5000);
    // useDebounce(handleLogin(), timeout:  5000) //check debounce sample
    // useDebounce(handleLogin, 5000)
  };


  return (
    <div data-testid="login">
      <h2>Login</h2>
      {isLoggedIn ? (
        <div>
          <p>Welcome, {user}!</p>
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
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

// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { userLogin } from '../redux/reducers/authenticationReducer';
// // import { login } from '../redux/actions/authActions';

// const Login: React.FC = () => {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     dispatch(userLogin({email, password}));
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={handleEmailChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={handlePasswordChange}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
