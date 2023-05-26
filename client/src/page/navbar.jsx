import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const menuItems = [
  {
    title: "Home",
    url: "/",
    cName: "nav-links",
  },
  {
    title: "Dealer",
    url: "/dealer",
    cName: "nav-links",
  },
  {
    title: "Sign up",
    url: "/signup",
    cName: "nav-links-mobile",
  },
  {
    title: "Login",
    url: "/login",
    cName: "nav-links-mobile",
  },
];

const Navbar = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <nav className="navbar">
      <h1
        style={{ fontSize: "30px", fontWeight: "bold" }}
        className="navbar-logo"
      >
        BUYC
      </h1>
      <div className="menu-icon" onClick={handleClick}>
        <i className={active ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={active ? "nav-menu active" : "nav-menu"}>
        {menuItems.map((item, index) => {
          return (
            <li key={index}>
              <a href={item.url} className={item.cName}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
      
      <Link to="/signup" style={{marginRight: "1%",}}>
        <button
          style={{
            background: "#3acbf7",
            color: "white",
            padding: "5px 15px",
            borderRadius: "10px",
            
          }}
        >
          Signup
        </button>
      </Link>

      <Link to="/login" style={{marginRight: "1%",}}>
        <button
          style={{
            background: "#3acbf7",
            color: "white",
            padding: "5px 15px",
            borderRadius: "10px",
            
          }}
        >
          Login
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
