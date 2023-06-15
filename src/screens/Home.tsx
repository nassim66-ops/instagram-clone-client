import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Home() {
  const [data, setData] = useState<any[]>([]);
  const { state, dispatch } = useContext(UserContext);
  const navigation = useNavigate();

  useEffect(() => {
    fetch("/allPosts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log("result", result);
        result.error ? navigation("/signin") : setData(result);
      })
      .catch((err) => {
        navigation("/signin");
      });
  }, []);

  const motoImage =
    "https://cdn.pixabay.com/photo/2016/11/22/23/47/dirt-road-1851258_960_720.jpg";

  const likePost = (id: any) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newDataArray = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newDataArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unLikePost = (id: any) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newDataArray = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newDataArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const commentOnPost = (id: any, text: string) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
        text,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
      });
  };

  const deletePost = (id: any) => {
    fetch(`/deletePost/${id}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        const newDataArray = data.filter((item) => {
          return item._id !== res.result._id;
        });
        setData(newDataArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteComment = (id: any, postId: any) => {
    fetch("/deleteComment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        id,
        postId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log("res", res);
      });
  };

  return (
    <div className="home">
      {Array.isArray(data) &&
        data?.map((item: any) => {
          // console.log("item", item);
          return (
            <div className="card home-card" key={item._id}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h5
                  style={{
                    cursor: "pointer",
                    paddingLeft: "20px",
                  }}
                >
                  <Link
                    to={
                      item.postedBy._id === state._id
                        ? "/profile"
                        : "/profile/" + item.postedBy._id
                    }
                  >
                    {item.postedBy.name}
                  </Link>
                </h5>
                {item.postedBy._id === state._id && (
                  <i
                    className="material-icons"
                    onClick={() => deletePost(item._id)}
                    style={{ cursor: "pointer", paddingRight: "20px" }}
                  >
                    delete
                  </i>
                )}
              </div>
              <div className="card-image">
                <img src={motoImage} alt="motocycle" />
              </div>
              <div className="card-content">
                {item.likes.includes(state?._id) ? (
                  <i
                    className="material-icons"
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => unLikePost(item._id)}
                  >
                    favorite
                  </i>
                ) : (
                  <i
                    className="material-icons"
                    style={{ cursor: "pointer" }}
                    onClick={() => likePost(item._id)}
                  >
                    favorite
                  </i>
                )}

                <h5>{item.title}</h5>
                <h5>
                  {item.likes.length === 1
                    ? `${item.likes.length} like`
                    : `${item.likes.length} likes`}
                </h5>
                <p>{item.body}</p>
                <form
                  onSubmit={(e: any) => {
                    e.preventDefault();
                    commentOnPost(item._id, e.target[0].value);
                  }}
                >
                  <input type="text" placeholder="Add a comment" />
                </form>

                <div>
                  {item.comments.map((comment: any) => {
                    return (
                      <div key={comment._id}>
                        <h6
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            border: "1px solid black",
                            padding: "5px",
                            borderRadius: "8px",
                          }}
                        >
                          <div>
                            <span
                              style={{ fontWeight: "bold", cursor: "pointer" }}
                            >
                              <Link
                                to={
                                  comment.postedBy._id === state._id
                                    ? "/profile"
                                    : "/profile/" + comment.postedBy._id
                                }
                              >
                                {comment.postedBy.name}
                              </Link>
                            </span>{" "}
                            <span>{comment.text}</span>{" "}
                          </div>
                          {comment.postedBy._id === state._id && (
                            <i
                              className="small material-icons"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                deleteComment(comment._id, item._id)
                              }
                            >
                              delete
                            </i>
                          )}
                        </h6>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Home;
