import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert("Logout failed");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
