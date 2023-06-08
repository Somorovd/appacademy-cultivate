import { useState, useEffect, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const menuRef = useRef();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = (e) => {
    e.stopPropagation();
    if (!showMenu) setShowMenu(true);
    else closeMenu(e);
  }

  const closeMenu = (e, force = false) => {
    // close menu on click,
    // unless the menu is what was clicked
    if (!force && menuRef.current.contains(e.target)) return;
    else setShowMenu(false);
  }

  useEffect(() => {
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.thunkDeleteSession());
    history.push("/");
  };

  const ulClassName = "profile-dropdown " + (showMenu ? "" : "hidden ");

  return (
    <>
      <button
        className="profile-button"
        onClick={openMenu}
      >
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={menuRef}>
        <li>Hello, {user.username}</li>
        <li>{user.email}</li>
        <li
          onClick={(e) => closeMenu(e, true)}
          style={{ width: "fit-content" }}
        >
          <Link to="/groups">
            View Cults
          </Link>
        </li>
        <li
          onClick={(e) => closeMenu(e, true)}
          style={{ width: "fit-content" }}
        >
          <Link to="/events">
            View Rituals
          </Link>
        </li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul >
    </>
  );
}

export default ProfileButton;