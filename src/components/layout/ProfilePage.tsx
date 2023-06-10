import React, { useState } from 'react'
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { User } from '../../types/User';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  // const { userProfile } = useAppSelector((state) => state.authenticationReducer);
  const storedUserProfile = localStorage.getItem("userProfile");
  const [userProfile, setUserProfile] = useState<User | null>(null);

  if (storedUserProfile) {
    const parsedUserProfile = JSON.parse(storedUserProfile);
    setUserProfile(parsedUserProfile);
  }

  return (
    <div>ProfilePage
      <h4>User Profile: {userProfile?.name}</h4>
      <img src={
            userProfile?.avatar && userProfile?.avatar } alt="" />
    </div>

  )
}

export default ProfilePage