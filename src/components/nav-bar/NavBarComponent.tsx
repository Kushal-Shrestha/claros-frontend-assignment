import {
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Pill,
  UtensilsCrossed,
  Info,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const SidebarLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const navItems = [
    { name: "Home", to: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Drugs", to: "/drug", icon: <Pill size={20} /> },
    { name: "Food", to: "/food", icon: <UtensilsCrossed size={20} /> },
    { name: "Info", to: "/info", icon: <Info size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } bg-white shadow-md p-4 flex flex-col justify-between transition-all duration-300 h-screen sticky top-0`}
      >
        <div>
          {/* Logo + Toggle */}
          <div className="flex items-center justify-between mb-6">
            <img
              src="src\public\images\Logo.svg"
              alt="Logo"
              className={`h-8 ${isCollapsed ? "mx-auto h-6" : ""}`}
            />
            {!isCollapsed && (
              <button onClick={toggleSidebar} className="text-gray-100">
                <ChevronLeft size={10} />
              </button>
            )}
            {isCollapsed && (
              <button onClick={toggleSidebar} className="text-gray-100">
                <ChevronRight size={10} />
              </button>
            )}
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  } ${isCollapsed ? "justify-center" : ""}`
                }
              >
                {item.icon}
                {!isCollapsed && <span className="text-sm">{item.name}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <CircleUserRound className="w-5 h-5" />
            {!isCollapsed && <span className="text-sm font-medium">Admin</span>}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto h-screen p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
