import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🍽️ Tasty Recipes</div>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/recipes">Recipes</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;