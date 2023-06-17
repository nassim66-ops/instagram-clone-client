import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function NavBar() {
  const searchModal = useRef<any>(null);
  const { state, dispatch } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<any>([]);
  const navigation = useNavigate();

  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);

  const renderList = () => {
    if (state) {
      return [
        <li key="4">
          <i
            data-target="modal1"
            className="large material-icons modal-trigger"
            style={{
              color: "black",
              cursor: "pointer",
              marginRight: " 10px",
            }}
          >
            search
          </i>
        </li>,
        <li key="1">
          <Link to="/profile">Profile</Link>
        </li>,

        <li key="2">
          <Link to="/create">Create Post</Link>
        </li>,

        <li key="3">
          <Link to="/followedPosts">Following Page</Link>
        </li>,

        <li key="5">
          <button
            className="btn #c62828 red darken-3"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              navigation("/signin");
            }}
          >
            Logout
          </button>
          ,
        </li>,
      ];
    } else {
      return [
        <li key="1">
          <Link to="/SignIn">SignIn</Link>
        </li>,
        <li key="2">
          <Link to="/signup">Sign Up</Link>
        </li>,
      ];
    }
  };

  const fetchUsers = (value: any) => {
    setSearch(value);
    fetch("/search-users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        query: value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        setUsers(res);
      });
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
      {/* Modal Structure */}
      <div id="modal1" className="modal" ref={searchModal}>
        <div
          className="modal-content"
          style={{
            color: "black",
          }}
        >
          <b>Search</b>
          <input
            type="text"
            placeholder="search for users"
            value={search}
            onChange={(value) => fetchUsers(value.target.value)}
          />
          <ul className="collection">
            {users.map((item: any) => {
              return (
                <li className="collection-item" key={item._id}>
                  <Link
                    to={
                      item._id === state._id
                        ? "/profile"
                        : "/profile/" + item._id
                    }
                    onClick={() => {
                      M.Modal.getInstance(searchModal.current).close();
                    }}
                  >
                    <b>{item.name}</b>: {item.email}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="modal-footer">
          <button
            className="modal-close waves-effect waves-green btn-flat"
            onClick={() => {
              setSearch("");
              setUsers([]);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
