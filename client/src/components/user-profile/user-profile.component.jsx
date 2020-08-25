import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserInfo from '../user-info/user-info.component';
import Gallery from '../gallery/gallery.component';
import './user-profile.styles.scss';

const UserProfile = () => {
  const { userId } = useParams();         // get url params
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetch(`/user/${userId}`, {
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('jwt') },
    })
      .then((res) => res.json())
      .then((userAndPosts) => setUserProfile(userAndPosts))
      .catch(console.log);
  }, [userId]);

  return (
    <React.Fragment>
      {userProfile
        ? <div className='user-profile'>
            <UserInfo user={userProfile.user} posts={userProfile.posts} />
            {userProfile.posts.length ? <Gallery userPosts={userProfile.posts} /> : <p>Pending</p>}
          </div>
        : <h2>Loading...</h2>
      }
    </React.Fragment>
  );
};

export default UserProfile;
