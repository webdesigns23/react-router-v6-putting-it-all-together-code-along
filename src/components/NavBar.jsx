import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/bookstores">Bookstores</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  );
}

export default NavBar;