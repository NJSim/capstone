
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { clearQuery, getQuery } from '../../store/search';
import LogoutButton from '../auth/LogoutButton';
import "./NavBar.css"

const NavBar = () => {

  const queryResults = useSelector(state => state.search.results);
  const [searchClicked, setSearchClicked] = useState(false)
  const [query, setQuery] = useState("")
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (query == "") {
      dispatch(clearQuery())
    } else {
      dispatch(getQuery(query));
    }
  },[dispatch, query]);

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
        <input className="searchBar" placeholder="Search Usernames"
        onFocus={(e) => setSearchClicked(true)}
        onBlur={(e) => setSearchClicked(false)}
        onKeyUp={(e) => setQuery(e.target.value)}
        type="search"
        maxLength='500'
        ></input>
        {searchClicked ? (
          <div className="results">
            {Object.keys(queryResults).map((key,i) => {
              return (
                <div onMouseDown={() => history.push(`/users/${queryResults[key]}`) } className="eachResult">
                  <div className="usernameR">
                    {queryResults[key]}

                  </div>

                  <br></br>
                </div>
              )
            })}
          </div>
        ): null}

      </div>
      <br></br>
      <LogoutButton/>

    </nav>
  );
}

export default NavBar;
