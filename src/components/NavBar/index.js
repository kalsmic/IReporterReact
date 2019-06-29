import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => (
  <div className="menu">
    <ul className="menu__list ">
      <li>
        <NavLink
          to="/createIncident"
          exact
          activeClassName="menu__list__item__active"
          className="menu__list__item"
        >
          <i className="fa fa-plus" />
          {' '}
          Create Incident
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/red-flags"
          exact
          activeClassName="menu__list__item__active"
          className="menu__list__item"
        >
          <i className="fa fa-flag" />
          {' '}
Redflags
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/interventions"
          exact
          activeClassName="menu__list__item__active"
          className="menu__list__item"
        >
          <i className="fa fa-drafting-compass" />
          {' '}
Interventions
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/"
          data-test="logout"
          exact
          activeClassName="menu__list__item__active"
          className="menu__list__item"
          onClick={() => {
            sessionStorage.removeItem('iReporterToken');
          }}
        >
          <i className="fa fa-unlock" />
          {' '}
logout
        </NavLink>
      </li>
    </ul>
  </div>
);

export default NavBar;
