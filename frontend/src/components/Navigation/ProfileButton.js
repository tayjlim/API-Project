import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignUpFormModal/index'
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {

    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className = 'userMenu'>
      <div className = 'createDiv'>
          {user ? (
          <Link to ='/spots/new'>
            <h1 className = 'Link' id = 'createspotId'>
            Create a New Spot
            </h1>
          </Link>

          ):null}
        </div>


        <i className="fas fa-user-circle" onClick={openMenu}/>


      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>

            <li>Hello, {user.firstName}, {user.lastName}!</li>
            <li>{user.email}</li>
            <li>
              <button className = 'logOutButton' onClick={logout} >Log Out</button>
            </li>
            <li>
            <Link to ='/spots/current'>
            <p>
            Manage Spots
            </p>
          </Link></li>
          </>
            ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>


    </div>



  );
}

export default ProfileButton;
