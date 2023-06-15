import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function SignIn() {
  const { state, dispatch } = useContext(UserContext);
  const navigation = useNavigate();
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
      email: email,
      password: password,
    };
    if (validateEmail(email) === null) {
      M.toast({ html: "Invalid email", classes: "#d50000 red accent-4" });
    } else {
      fetch(`/signin`, {
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
            localStorage.setItem("jwt", res.accessToken);
            localStorage.setItem("user", JSON.stringify(res.user));
            dispatch({ type: "USER", payload: res.user });
            M.toast({
              html: "Sign in successfully",
              classes: "#03a9f4 light-blue",
            });
            navigation("/");
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
          Login
        </button>
        <p>
          <Link to="/SignUp">Don't have and account ?</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
