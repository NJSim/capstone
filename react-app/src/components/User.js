import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar/NavBar';

function User() {
  const [user, setUser] = useState({});
  const { username }  = useParams();

  useEffect(() => {
    if (!username) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${username}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [username]);

  if (!user) {
    return null;
  }

  return (
    // <ul>
    //   <li>
    //     <strong>User Id</strong> {user.id}
    //   </li>
    //   <li>
    //     <strong>Username</strong> {username}
    //   </li>
    //   <li>
    //     <strong>Email</strong> {user.email}
    //   </li>
    // </ul>
    <div>
      <NavBar></NavBar>
      <div>
        <h1>{user.username}'s Profile Page</h1>
        <h2>User Pages are currently under construction</h2>
        <h2>Thank you for understanding!</h2>
      </div>
      <div>

      </div>
    </div>
  );
}
export default User;
