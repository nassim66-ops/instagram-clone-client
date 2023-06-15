import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";

function UserProfile() {
  const [userInfo, setUserInfo] = useState<any>();
  const [showFollow, setShowFollow] = useState(true);

  const { state, dispatch } = useContext(UserContext);
  const { userId } = useParams();

  useEffect(() => {
    fetch(`/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log("res");
        setUserInfo(res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  useEffect(() => {
    userInfo &&
      userInfo.user.followers.map((item: any) => {
        if (state._id === item) {
          setShowFollow(false);
        }
      });
  }, [userInfo, state]);

  const pictureAddress =
    "https://cdn.pixabay.com/photo/2018/07/21/03/55/woman-3551832_640.jpg";

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log("follow res: ", res);
        dispatch({
          type: "UPDATE",
          payload: { following: res.following, followers: res.followers },
        });
        localStorage.setItem("user", JSON.stringify(res));
        setUserInfo((preState: any) => {
          return {
            ...preState,
            user: {
              ...preState.user,
              followers: [...preState.user.followers, res._id],
            },
          };
        });
        setShowFollow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unFollowUser = () => {
    fetch("/unFollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unFollowId: userId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log("unFollow res: ", res);
        dispatch({
          type: "UPDATE",
          payload: { following: res.following, followers: res.followers },
        });
        localStorage.setItem("user", JSON.stringify(res));
        setUserInfo((preState: any) => {
          const newFollowers = preState.user.followers.filter(
            (item: any) => item !== res._id
          );
          return {
            ...preState,
            user: {
              ...preState.user,
              followers: newFollowers,
            },
          };
        });
        setShowFollow(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {userInfo ? (
        <div className="top-root-dev">
          <div className="root-dev">
            <div>
              <img
                src={pictureAddress}
                alt="profile"
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
              />
            </div>
            <div>
              <h4>{userInfo.user.name}</h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "120%",
                }}
              >
                <div>
                  <h5>{userInfo.user.email}</h5>
                </div>
                <div>
                  {showFollow ? (
                    <button
                      className="btn waves-effect waves-light #b71c1c red darken-4 "
                      onClick={followUser}
                    >
                      Follow
                    </button>
                  ) : (
                    <button
                      className="btn waves-effect waves-light #b71c1c red darken-4 "
                      onClick={unFollowUser}
                    >
                      UnFollow
                    </button>
                  )}
                </div>
              </div>
              <div className="info-dev">
                <h5>{userInfo.result.length} posts</h5>
                <h5>{userInfo.user.followers.length} followers</h5>
                <h5>{userInfo.user.following.length} following</h5>
              </div>
            </div>
          </div>

          <div className="gallery">
            {userInfo.result.map((item: any) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                  key={item._id}
                >
                  <h5 style={{ color: "#000" }}>{item.title}</h5>
                  <img src={pictureAddress} alt={item.title} className="item" />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h2>Loading ...</h2>
      )}
    </>
  );
}

export default UserProfile;
