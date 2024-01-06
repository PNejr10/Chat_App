import React from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { setCurUser, setID, setUser_secret } from "../context";

export default function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = React.useState({ User: "", Password: "" });
  const navigate = useNavigate();

  function HandleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:1010/login", formData)
      .then((response) => {
        enqueueSnackbar("Welcome " + response.data.user.name, {
          variant: "success",
        });
        setCurUser(response.data.user.name);
        setID(response.data.user.id);
        setUser_secret(response.data.user.password)
        navigate("/Home");
      })
      .catch((error) => {
        enqueueSnackbar("User information is not valid", { variant: "error" });
        console.log(error);
      });
  }

  return (
    <div className="sc">
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              name="User"
              placeholder="Username"
              onChange={HandleChange}
              value={formData.User}
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              name="Password"
              placeholder="Password"
              onChange={HandleChange}
              value={formData.Password}
            />
          </div>
          <button type="submit">LOGIN</button>
          <p>
            NOT A USER? <Link to="/SignUp"> Sign Up </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
