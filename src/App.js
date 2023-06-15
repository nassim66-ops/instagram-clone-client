import React, { createContext, useEffect, useReducer } from "react";

//Styles
import "./App.css";

//Routing
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

//Navigation bar
import NavBar from "./components/NavBar";

// Screens
import Home from "./screens/Home";
import SignIn from "./screens/SignIn";
import Profile from "./screens/Profile";
import SignUp from "./screens/Signup";
import CreatePost from "./screens/CreatePost";
import { initialState, reducer } from "./reducers/userReducer";
import UserProfile from "./screens/UserProfile";
import FollowedUserPosts from "./screens/FollowedUserPosts";

export const UserContext = createContext();

const Routing = () => {
  const navigation = useNavigate();
  // const [state, dispatch] = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      // navigation("/");
    } else {
      navigation("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/profile/:userId" element={<UserProfile />} />
      <Route path="/followedPosts" element={<FollowedUserPosts />} />
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
