import React, { useEffect, useState } from 'react'
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { User } from '../../types/User';
import { EditMeUser } from '../../redux/reducers/usersReducer';
import { Buttons } from '@testing-library/user-event/dist/types/system/pointer/buttons';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  // const { userProfile } = useAppSelector((state) => state.authenticationReducer);
  const storedUserProfile = localStorage.getItem("userProfile");
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const { currentUser } = useAppSelector((state) => state.usersReducer)

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

  const EditeUserBtn = (updatedUserProfile: User) => {
    if(userProfile) {
      dispatch(EditMeUser(updatedUserProfile))
    }
  }

  return (
    <div>ProfilePage
      <h4>Name: {userProfile?.name}</h4>
      <h4>Email: {userProfile?.email}</h4>
      <h5>User Role: {userProfile?.role}</h5>
      <h4>User Id: {userProfile?.id}</h4>
      <img src={
            userProfile?.avatar && userProfile?.avatar } alt="avatar"  width="200rem" height="200rem" />
            {userProfile && <button onClick={() => EditeUserBtn(userProfile)}> Update Profile</button>}
    </div>

  )
}

export default ProfilePage