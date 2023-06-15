import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigation = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const postData = () => {
    const data = {
      name: name,
      email: email,
      password: password,
    };
    if (validateEmail(email) === null) {
      M.toast({ html: "Invalid email", classes: "#d50000 red accent-4" });
    } else {
      fetch(`/signup`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((result) => result.json())
        .then((res: any) => {
          if (res.error) {
            M.toast({ html: res.error, classes: "#d50000 red accent-4" });
          } else {
            M.toast({ html: res.message, classes: "#03a9f4 light-blue" });
            navigation("/signin");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="myCard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(value) => setName(value.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(value) => setEmail(value.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(value) => setPassword(value.target.value)}
        />
        <button
          className="btn waves-effect waves-light #b71c1c red darken-4 "
          onClick={postData}
        >
          Sign Up
        </button>
        <p>
          <Link to="/SignIn">Already have and account ?</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
