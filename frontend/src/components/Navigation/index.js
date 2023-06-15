// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className = 'bar'>
    <ul id = 'navigation'>

      <li>
        <NavLink exact to="/">
          <h1 className = 'Link'>PokeBnB</h1>
        </NavLink>

      </li>

      {isLoaded && (

          <ProfileButton user={sessionUser} />

      )}
    </ul>
    </div>
  );
}

export default Navigation;
