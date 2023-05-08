// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className = 'bar' id = 'navigation'>
    <button id = 'homebttn'>
      <li>
        <NavLink exact to="/">

        HOME

        </NavLink>

      </li>
      </button>
      {isLoaded && (
        <li id = 'loginsignupbutton'>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
