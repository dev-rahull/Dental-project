import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import clsx from "clsx";
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  ChevronDown,
  LogOut,
  UserCircle
} from "lucide-react";

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { to: "/patients", label: "Patients", icon: <Users className="w-4 h-4" /> },
    { to: "/calendar", label: "Calendar", icon: <CalendarClock className="w-4 h-4" /> },
  ];

  return (
    <div className="flex h-[calc(100vh-50px)]">
      <aside className="bg-white w-64 border-r shadow-sm px-6 py-6 flex flex-col justify-between">
        <div>
          <div className="text-2xl font-bold text-blue-700 tracking-tight mb-6">
            Admin Panel
          </div>

          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={clsx(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition",
                  location.pathname === item.to
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {user && (
          <div className="relative mt-6">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700"
            >
              <span className="flex items-center gap-2">
                <UserCircle className="w-4 h-4" />
                {user.role || "Admin"}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 bottom-14 w-full bg-white border rounded shadow-lg py-2 z-50">
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </aside>

      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
