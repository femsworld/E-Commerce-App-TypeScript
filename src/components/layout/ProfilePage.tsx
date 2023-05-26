import React from 'react'
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { userProfile } = useAppSelector((state) => state.authenticationReducer);
  return (
    <div>ProfilePage
      <img src={
            userProfile?.avatar && userProfile?.avatar } alt="" />
    </div>
  )
}

export default ProfilePage