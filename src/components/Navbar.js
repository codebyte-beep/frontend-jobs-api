import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate()
  const { setCurrentUser } = useContext(AuthContext);
  const logout = () => {
    localStorage.clear()
    setCurrentUser(null)
    navigate('/register')
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/add-jobs">Add Job</Link>
        </li>
        <li>
          <Link to="/all-jobs">All Jobs</Link>
        </li>
        <li>
          <button onClick={logout}>logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
