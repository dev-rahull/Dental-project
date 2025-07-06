import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Stethoscope } from "lucide-react";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow-md border-b border-gray-200">
      <div className="flex items-center gap-3 text-blue-700">
        <Stethoscope size={28} strokeWidth={2.2} />
        <h1 className="text-xl font-semibold tracking-tight">
          ENTNT Dental Center
        </h1>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Role: <b className="text-gray-800">{user.role}</b>
          </span>
          <button
            onClick={logout}
            className="px-4 py-1.5 rounded-md bg-gray-100 text-sm text-gray-700 hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
