import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.styles.scss';

const Navigation = () => (
  <nav className='navigation'>
    <Link to='/' className='logo logo-font'>Instagram</Link>
      <div className='options'>
        <Link to='/signin' className='option'>Sign In</Link>
        <Link to='/signup' className='option'>Sign Up</Link>
        <Link to='/profile' className='option'>Profile</Link>
        <Link to='/createpost' className='option'>Create post</Link>
      </div>
  </nav>
);

export default Navigation;