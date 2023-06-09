import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import DemoUserLoginButton from '../DemoUserLoginButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  const clickNewGroup = () => {
    history.push("/groups/new")
  }

  let sessionLinks;
  let sessionClassName = "session-li";
  if (sessionUser) {
    sessionLinks = (
      <li className={sessionClassName}>
        <button onClick={clickNewGroup} className="skew purple">
          <span>
            Start a Cult
          </span>
        </button>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li className={sessionClassName}>
        <DemoUserLoginButton />
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
          buttonClasses="skew purple"
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
          buttonClasses="skew purple"
        />
      </li>
    );
  }

  return (
    <nav className="main-nav">
      <ul>
        <li className="nav-logo">
          <NavLink exact to="/">
            Cultivate
          </NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    </nav>
  );
}

export default Navigation;