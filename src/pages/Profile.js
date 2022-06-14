import { useAuth } from "../components/AuthContext";
import { Link } from "react-router-dom";

function Profile() {
  const { user, handleLogout } = useAuth();
  return (
    <div>
      <p>Bonjour {user.email}</p>
      <Link to="/dailys">See all your dailys</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
