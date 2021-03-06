import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => (
  <div className="menu">
    <ul className="menu_list ">
      <li className="menu__list__item">
        <NavLink
          to="/createIncident"
          exact
          activeClassName="menu_list__item__active"
        >
          Create Incident
        </NavLink>
      </li>
      <li className="">
        <NavLink
          to="/"
          exact
          activeClassName="menu_list__item__active"
          onClick={() => {
            sessionStorage.removeItem('iReporterToken');
          }}
        >
          logout
        </NavLink>
      </li>
    </ul>
  </div>
);

export default NavBar;
