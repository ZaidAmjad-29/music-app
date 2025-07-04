import { Link, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <nav className="p-4 bg-gray-800 text-white flex gap-4">
        <Link to="/profile">Profile</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/playlists">My Playlists</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/explore">Explore</Link>
      </nav>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}
