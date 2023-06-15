import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

function Profile() {
  const [posts, setPosts] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("/myPosts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPosts(res.myPosts);
      });
  }, []);
  const pictureAddress =
    "https://cdn.pixabay.com/photo/2018/07/21/03/55/woman-3551832_640.jpg";

  return (
    <div className="top-root-dev">
      <div className="root-dev">
        <div>
          <img
            src={pictureAddress}
            alt="profile"
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
          />
        </div>
        <div>
          <h4>{state ? state.name : "Loading"}</h4>
          <h5>{state ? state.email : "Loading"}</h5>

          <div className="info-dev">
            <h5>{posts.length} posts</h5>
            <h5>{state ? state.followers.length : "Loading..."} followers</h5>
            <h5>{state ? state.following.length : "Loading..."} following</h5>
          </div>
        </div>
      </div>

      <div className="gallery">
        {posts.map((item: any) => {
          return (
            <img
              src={pictureAddress}
              alt={item.title}
              className="item"
              key={item._id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
