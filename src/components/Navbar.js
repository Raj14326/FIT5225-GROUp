import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light">
      <Link to="/" className="navbar-brand">BirdTag</Link>
      <Link to="/upload" className="nav-link">Upload</Link>
      <Link to="/search" className="nav-link">Search</Link>
      <Link to="/edit-tags" className="nav-link">Edit Tags</Link>
      <Link to="/delete" className="nav-link">Delete</Link>
    </nav>
  );
}

export default Navbar;
