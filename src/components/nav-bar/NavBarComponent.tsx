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

  // Calculate margin for main content based on sidebar width
  const mainContentMarginLeft = isCollapsed ? "ml-20" : "ml-64";

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div
        className={`
          ${isCollapsed ? "w-20" : "w-64"}
          bg-background-light shadow-md p-4 flex-col justify-between transition-all duration-300 border-r border-border z-30 flex
          fixed inset-y-0 left-0
        `}
      >
        <div>
          {/* Logo + Toggle */}
          <div className="flex items-center justify-between mb-6">
            <img
              src="/public/Logo.svg"
              alt="Logo"
              className={`h-8 ${isCollapsed ? "mx-auto h-6" : ""}`}
            />
            {!isCollapsed && (
              <button
                onClick={toggleSidebar}
                className="text-text-muted hover:text-text"
              >
                <ChevronLeft size={10} />
              </button>
            )}
            {isCollapsed && (
              <button
                onClick={toggleSidebar}
                className="text-text-muted hover:text-text"
              >
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
                      ? "bg-primary text-white"
                      : "text-text-muted hover:bg-background-lighter hover:text-text"
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
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <CircleUserRound className="w-5 h-5 text-text-muted" />
            {!isCollapsed && (
              <span className="text-sm font-medium text-text-muted">Admin</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className={`flex-1 overflow-y-auto p-6 ${mainContentMarginLeft}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
