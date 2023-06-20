import React, { useState, useEffect, useRef } from 'react';
import axios, { AxiosError } from 'axios';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { User } from '../types/User';
import { EditMeUser, createOneUser } from '../redux/reducers/usersReducer';
import imageUpload from '../redux/common/imageUpload';
import Login from './Login';

const SignUp = () => {
  const [name, setName] = useState('');
  const defaultAvatar = "https://upload.wikimedia.org/wikipedia/fi/4/45/Yoda.jpg";
  const inputRef = useRef<HTMLInputElement | null>(null); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [error, setError] = useState('');
  const [createdNewUserSucess, setCreatedNewUserSucess] = useState(false);
  const { newUser } = useAppSelector((state) => state.usersReducer)
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Name and email cannot be empty');
    } else if (name.length < 4) {
      setError('Username must be at least 4 characters');
    } else if (password.length < 5) {
      setError("Password must be at least 5 characters long.");
    } 
    else {
      if(inputRef.current && inputRef.current.files && inputRef.current.files.length > 0) {
        const avatarFile = inputRef.current.files[0]
        try {
          const location = imageUpload(avatarFile); //maybe await here
          dispatch(createOneUser ({name, email, password, avatar}))
          .then((action: any) => {
            if(!action.error) {
              setCreatedNewUserSucess(true) 
              alert("User has being created successfully")
            } else {
              setError(action.payload.message)
            }
          })
        } catch (e) {
          const error = e as AxiosError
            return error
        }
      }
      // Perform sign up logic here

      // Redirect to the login page
      // window.location.href = '/login';
    // dispatch(createOneUser CreateNewUserFuciReducer({name, email, password, avatar}))
    // dispatch(EditMeUser(updatedUserProfile))

    }
  };
  const clearAvatar = () => {
    setAvatar(defaultAvatar);
    if (inputRef.current) {
        inputRef.current.value = "";
    }
}
if (createdNewUserSucess) {
    return (
      <div>
        <p>User issuccessfully created! Please login.</p>
        <Login/>
      </div>
    );
}    
 
  // useEffect(() => {
  //   if (error) {
  //     // Scroll to the top of the page if there is an error
  //     window.scrollTo(0, 0);
  //   }
  // }, [error]);

  // const createNewUser = (newCreatedUser: User) => {
  //   dispatch(createOneUser ({name, email, password, avatar}))
  //     }
  
  return (
    <div data-testid="signup">
      {/* <form onSubmit={handleSubmit}> */}
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
          {/* <button onClick={clearAvatar}> Clear file </button> */}
          <button> Submit form </button>
        {/* <input type="file" name="" id="" /> */}
        {/* <input type="dro" name="" role=  /> */}
        {/* <button onClick={() => createNewUser()}>Send</button> */}
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUp;
