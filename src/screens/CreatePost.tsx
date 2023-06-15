import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigation = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const postDetails = () => {
    const formData = {
      title,
      body,
    };

    fetch("/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify(formData),
    })
      .then((result) => result.json())
      .then((result: any) => {
        if (result.error) {
          M.toast({ html: result.error, classes: "#d50000 red accent-4" });
        } else {
          M.toast({
            html: "Created the post successfully",
            classes: "#03a9f4 light-blue",
          });
          navigation("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card input-field create-post-root-div">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(value) => setTitle(value.target.value)}
      />
      <input
        type="text"
        placeholder="Body"
        value={body}
        onChange={(value) => setBody(value.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn  #b71c1c red darken-4">
          <span>Upload Image</span>
          <input type="file" />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light #b71c1c red darken-4 "
        onClick={postDetails}
      >
        Create
      </button>
    </div>
  );
}

export default CreatePost;
