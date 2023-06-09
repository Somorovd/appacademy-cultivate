import { NavLink } from "react-router-dom";
import "./BrowsingNavigation.css";

const BrowsingNavigation = () => {
  return (
    <nav className="browsing-nav">
      <ul className="browsing-nav__list">
        <li>
          <NavLink to="/events" className="skew-left purple">
            <span>
              Rituals
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/groups" className="skew-left purple">
            <span>
              Cults
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default BrowsingNavigation;