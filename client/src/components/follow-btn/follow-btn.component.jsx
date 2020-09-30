import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../../contexts/user/user.context';
import { updateUserFollow } from '../../reducers/user/user.reducer';

const FollowBtn = ({ setUserProfile }) => {
  // sign in user
  const { state, dispatch } = useContext(UserContext); // nearest Context.Provider
  const { user } = state;
  // profile page user
  const { userId } = useParams(); // get url params

  // check if the sign in user has already followed when componentDidMount
  const [ showFollow, setShowFollow ] = useState(user ? !user.following.includes(userId) : true);


  // when follow btn is clicked > update userProfile state (the followed user's follower [])
  const setUserFollower = followerUser => {
    setUserProfile(prevState => {
      const alreadyFollowed = prevState.user.followers.includes(followerUser._id);

      if (!alreadyFollowed) {
        // add sign in user to follower array
        return {
          ...prevState, // user & posts
          user: {
            ...prevState.user,
            followers: [...prevState.user.followers, followerUser._id],
          },
        };
      }
      return prevState;
    });
  };

  // when unfollow btn is clicked > update userProfile state (the followed user's follower [])
  const removeUserFollower = unfollowerUser => {
    setUserProfile(prevState => {
      const alreadyFollowed = prevState.user.followers.includes(unfollowerUser._id);
      if (alreadyFollowed) {
        // remove sign in user from follower array
        return {
          ...prevState, // user & posts
          user: {
            ...prevState.user,
            followers: prevState.user.followers.filter(eachId => eachId !== unfollowerUser._id),
          },
        };
      }
      return prevState;
    });
  };


  const followUser = () => {
    fetch('/follow', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
      },
      body: JSON.stringify({ followedId: userId }), // user to be followed = profile page user
    })
      .then((res) => res.json())
      .then((followerUser) => {
        /* update user obj (sign in user & followed user) － with follower & following */
        // 1. update sessionStorage user obj (sign in user)
        sessionStorage.setItem('user', JSON.stringify(followerUser));
        // 2. update reducer user state (my profile page)
        dispatch(updateUserFollow(followerUser));
        // 3. update userProfile state － followed user's follower [] (other user profile page)
        setUserFollower(followerUser);
        // btn
        setShowFollow(false);
      })
      .catch(console.log);
  };

  const unfollowUser = () => {
    fetch('/unfollow', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
      },
      body: JSON.stringify({ unfollowedId: userId }), // user to be unfollowed = profile page user
    })
      .then((res) => res.json())
      .then((unfollowerUser) => {
        /* update user obj (sign in user & followed user) － with follower & following */
        // 1. update sessionStorage user obj (sign in user)
        sessionStorage.setItem('user', JSON.stringify(unfollowerUser));
        // 2. update reducer user state (my profile page)
        dispatch(updateUserFollow(unfollowerUser));
        // 3. update userProfile state － followed user's follower [] (other user profile page)
        removeUserFollower(unfollowerUser);
        // btn
        setShowFollow(true);
      })
      .catch(console.log);
  };

  return (
    <React.Fragment>
      {showFollow
        ? <button className="follow-btn" onClick={() => followUser()}>Follow</button>
        : <button className="unfollow-btn" onClick={() => unfollowUser()}>Unfollow</button>
      }
    </React.Fragment>
  );
};

export default FollowBtn;
