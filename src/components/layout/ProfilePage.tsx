import React, { useEffect, useState } from 'react'
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { User } from '../../types/User';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  // const { userProfile } = useAppSelector((state) => state.authenticationReducer);
  const storedUserProfile = localStorage.getItem("userProfile");
  const [userProfile, setUserProfile] = useState<User | null>(null);

  useEffect(() => {
    console.log("Before If UserProlfe")
    if (storedUserProfile) {
      console.log("After If user Profile")
      const parsedUserProfile = JSON.parse(storedUserProfile);
      setUserProfile(parsedUserProfile);
      console.log("parsedUserProfile", parsedUserProfile)
    }
  }, [storedUserProfile])
  console.log(userProfile)
  console.log("userProfile", userProfile)
  return (
    <div>ProfilePage
      <h4>User Profile: {userProfile?.name}</h4>
      <h5>User Role: {userProfile?.role}</h5>
      <img src={
            userProfile?.avatar && userProfile?.avatar } alt="" />
    </div>

  )
}

export default ProfilePage