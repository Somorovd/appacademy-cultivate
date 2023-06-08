import { NavLink } from "react-router-dom";
import "./BrowsingNavigation.css";

const BrowsingNavigation = () => {
  return (
    <nav className="browsing-nav">
      <ul className="browsing-nav__list">
        <li>
          <NavLink to="/events">
            Rituals
          </NavLink>
        </li>
        <li>
          <NavLink to="/groups">
            Cults
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default BrowsingNavigation;