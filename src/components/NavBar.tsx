import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function NavBar() {
  const { state, dispatch } = useContext(UserContext);
  const navigation = useNavigate();

  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link to="/profile">Profile</Link>
        </li>,

        <li>
          <Link to="/create">Create Post</Link>
        </li>,

        <li>
          <Link to="/followedPosts">Following Page</Link>
        </li>,
        <button
          className="btn #c62828 red darken-3"
          onClick={() => {
            localStorage.clear();
            dispatch({ type: "CLEAR" });
            navigation("/signin");
          }}
        >
          Logout
        </button>,
      ];
    } else {
      return [
        <li>
          <Link to="/SignIn">SignIn</Link>
        </li>,
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>,
      ];
    }
  };
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? "/" : "/signin"} className="brand-logo left">
          Instagram Clone
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
