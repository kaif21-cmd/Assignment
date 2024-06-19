// Header.js
import React from 'react';
import './Header.css'; // Import your CSS file for styling

function Header({ isLoggedIn, handleLogout }) {
  return (
    <header className="header">
      <h1>Internship Portal</h1>
      <nav>
        <ul>
          {isLoggedIn ? (
            <li><button onClick={handleLogout}>Logout</button></li>
          ) : (
            <>
              <li><a href="http://localhost:8005/login.html">Login</a></li>
              <li><a href="http://localhost:8005">Signup</a></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
