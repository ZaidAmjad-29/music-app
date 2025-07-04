import { useData } from "../components/PostProvider";
import Profile from "../components/Profile";
import UserSongs from "../components/UserSongs";
import UserPlaylists from "../components/UserPlaylists";
import EditProfile from "../components/EditProfile";
// import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  // const navigate = useNavigate();

  const { user, showEditModal } = useData();

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <Profile />
      <UserSongs />
      <UserPlaylists />

      {showEditModal && <EditProfile />}
    </div>
  );
}
