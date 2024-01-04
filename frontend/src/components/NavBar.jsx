import "./nav.css";
import { Link, useNavigate } from "react-router-dom";

// import { useState } from "react";
import { useSnackbar } from "notistack";
import { setCurUser, curUser } from "../Info";

export default function NavBar() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  function handleClick(event) {
    let name = event.target.className;
    if (name == "gg-log-out"){
        enqueueSnackbar("GoodBye " + curUser, { variant: "success" });
        setCurUser("");
        navigate("/");
    }

    if (name == "gg-user-add"){
      navigate("/AddFriend");
  }
      
    
  }

  return (
    <>
      <div className="Nav">
         {/* Link to the Home page, the first way of navigating between pages*/}
        <Link to="/Home">
          {" "}
          <i className="gg-home-alt"></i>
        </Link>
         {/* second way of navigating between pages, after the icon is 
         is clickd the function would navigate to approperiate page according to 
         the icon being clicked*/}
        
        <i className="gg-user-add" onClick={handleClick}></i>
        <i className="gg-profile" onClick={handleClick}></i>
        <i className="gg-log-out" onClick={handleClick} ></i>

      </div>
    </>
  );
}
