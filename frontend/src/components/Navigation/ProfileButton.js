import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const menuRef = useRef();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = (e) => {
    e.stopPropagation();
    if (!showMenu) setShowMenu(true);
  }

  useEffect(() => {
    const closeMenu = (e) => {
      // close menu on click,
      // unless the menu is what was clicked
      if (menuRef.current.contains(e.target)) return;
      else setShowMenu(false);
    }
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.thunkDeleteSession());
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
        <li>{user.username}</li>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;