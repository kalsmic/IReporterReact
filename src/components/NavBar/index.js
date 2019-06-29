import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => (
  <div className="menu">
    <ul className="menu_list ">
      <li className="menu__list__item">
        <NavLink
          to="/red-flags"
          exact
          activeClassName="menu_list__item__active"
        >
          <i className="fa fa-flag" />
          {' '}
Redflags
        </NavLink>
      </li>
      <li className="menu__list__item">
        <NavLink
          to="/interventions"
          exact
          activeClassName="menu_list__item__active"
        >
          <i className="fa fa-drafting-compass" />
          {' '}
Interventions
        </NavLink>
      </li>
      <li className="menu__list__item">
        <NavLink
          to="/createIncident"
          exact
          activeClassName="menu_list__item__active"
        >
          <i className="fa fa-plus" />
          {' '}
Create Incident
        </NavLink>
      </li>
      <li className="menu__list__item">
        <NavLink
          to="/"
          data-test="logout"
          exact
          activeClassName="menu_list__item__active"
          onClick={() => {
            sessionStorage.removeItem('iReporterToken');
          }}
        >
          <i className="fa fa-lock" />
          {' '}
logout
        </NavLink>
      </li>
    </ul>
  </div>
);

export default NavBar;
