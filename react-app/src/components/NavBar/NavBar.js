
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import "./NavBar.css"

const NavBar = () => {

  const [searchClicked, setSearchClicked] = useState(false)
  const [query, setQuery] = useState("")

  return (
    <nav className="navBarMain">
      {/* <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul> */}
      <NavLink className="logoNav" to="/">
        <h1 className="logo">
          Gamestagram
        </h1>
      </NavLink>
      <div>
        <input className="searchBar" placeholder="Search"
        onFocus={(e) => setSearchClicked(true)}
        onBlur={(e) => setSearchClicked(false)}
        onKeyUp={(e) => setQuery(e.target.value)}
        type="search"
        ></input>
        {searchClicked ? (
          <div>
            Test Results
          </div>
        ): null}

      </div>
      <br></br>
      <LogoutButton/>

    </nav>
  );
}

export default NavBar;
