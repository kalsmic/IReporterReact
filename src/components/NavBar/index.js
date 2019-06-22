import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <div className="menu">
    <ul className="menu_list">
      <li className="menu_list__item">
        <NavLink
          to="/signup"
          exact
          activeClassName="menu_"
        >
          SignUp
        </NavLink>
      </li>
      <li className="">
        <NavLink
          to="/"
          exact
          activeClassName="menu_list__item__active"
        >
          login
        </NavLink>
      </li>
      <li className="menu__list__item">
        <NavLink
          to="/createIncident"
          exact
          activeClassName="menu_list__item__active"
        >
          Create Incident
        </NavLink>
      </li>
      <li className="menu_list__item">
        <NavLink
          to="/viewIncident"
          exact
          activeClassName="menu_list__item__active"
        >
          View Incident
        </NavLink>
      </li>
    </ul>
  </div>
);

export default NavBar;
