import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../contexts/user/user.context';
import Gallery from '../gallery/gallery.component';
import './profile.styles.scss';

const Profile = () => {
    const { state, dispatch } = useContext(UserContext);        // nearest Context.Provider
    const { user } = state;
    const [ myPosts, setMyPosts ] = useState([]);

    useEffect(() => {
        fetch('/myposts', {
            headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')}
        })
          .then(res => res.json())
          .then(posts => setMyPosts(posts.myPosts))
          .catch(console.log)
    }, []);


    return(
        <div className='profile'>
            <div className='user-info'>
                <img className='profile-img' src='https://images.unsplash.com/photo-1570731102433-34470efb6acf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' alt='avatars'  />
                <div className='introduction'>
                    <h2>{user ? user.name : 'Loading'}</h2>
                    <div className='user-activity'>
                        <h4>20 posts</h4>
                        <h4>20 followers</h4>
                        <h4>20 following</h4>
                    </div>
                    <div>Live in California</div>
                </div>
            </div>
            {myPosts.length
                ?  <Gallery userPosts={myPosts} />
                : <p>Pending</p>
            }
           
        </div>
    )
};

export default Profile;




// myPosts.map(eachPost => 
//     <img src={eachPost.photo} alt={eachPost.title}  
//         className='item-img' key={eachPost._id}
//     />
// )