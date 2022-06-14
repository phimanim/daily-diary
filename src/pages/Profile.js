import { useAuth } from "../components/AuthContext";

function Profile() {
  const { user, handleLogout } = useAuth();
  return (
    <div>
      <p>Bonjour {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
