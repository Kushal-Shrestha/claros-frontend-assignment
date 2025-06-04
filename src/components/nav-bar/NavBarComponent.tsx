import { useState } from "react";
import { CircleUserRound, ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";

const NavBarComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <div className="fixed top-0 left-0 right-0 w-full z-50 py-2">
      <div className="flex bg-white w-full justify-between items-center px-6 py-3 rounded-[40px]">
        {/* Logo */}
        <div className="flex items-center justify-center gap-4">
          <img
            src="src\public\images\Logo.svg"
            alt="Company Logo"
            className="h-12 w-auto"
          />
          <div className="font-medium text-xl">Analytics</div>
        </div>

        {/* Navigation (Desktop only) */}
        <div className="hidden md:flex items-center bg-gray-200 text-gray-700 rounded-full p-1 space-x-2">
          <NavLink to="/" className="rounded-full text-sm font-light">
            {({ isActive }) => (
              <span
                className={`block ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-200 font-light"
                } px-6 py-2 rounded-full`}
              >
                Home
              </span>
            )}
          </NavLink>

          <NavLink to="/drug" className="rounded-full text-sm font-light">
            {({ isActive }) => (
              <span
                className={`block ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-200 font-extralight"
                } px-6 py-2 rounded-full`}
              >
                Drugs
              </span>
            )}
          </NavLink>
          <NavLink to="/food" className="rounded-full text-sm font-light">
            {({ isActive }) => (
              <span
                className={`block ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-200 font-extralight"
                } px-6 py-2 rounded-full`}
              >
                Food
              </span>
            )}
          </NavLink>
          <NavLink to="/info" className="rounded-full text-sm font-light">
            {({ isActive }) => (
              <span
                className={`block ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-200 font-extralight"
                } px-6 py-2 rounded-full`}
              >
                Info
              </span>
            )}
          </NavLink>
        </div>

        {/* User Profile + Dropdown (Mobile) */}
        <div className="flex items-center justify-center bg-gray-200 p-4 rounded-full gap-4 relative">
          <CircleUserRound className="w-5 h-5" />
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={toggleDropdown}
          >
            <div className="font-semibold text-sm">Admin</div>
            <ChevronDown className="w-4 h-4 md:hidden" />
          </div>

          {/* Dropdown Menu for md and below */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-14 bg-white border border-gray-200 rounded-lg shadow-md w-44 md:hidden">
              <NavLink to="/" className="rounded-full text-sm font-light">
                {({ isActive }) => (
                  <span
                    className={`block ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-200 font-light"
                    } px-6 py-2 rounded-full`}
                  >
                    Home
                  </span>
                )}
              </NavLink>

              <NavLink to="/drug" className="rounded-full text-sm font-light">
                {({ isActive }) => (
                  <span
                    className={`block ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-200 font-extralight"
                    } px-6 py-2 rounded-full`}
                  >
                    Drugs
                  </span>
                )}
              </NavLink>
              <NavLink to="/food" className="rounded-full text-sm font-light">
                {({ isActive }) => (
                  <span
                    className={`block ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-200 font-extralight"
                    } px-6 py-2 rounded-full`}
                  >
                    Food
                  </span>
                )}
              </NavLink>
              <NavLink to="/info" className="rounded-full text-sm font-light">
                {({ isActive }) => (
                  <span
                    className={`block ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-200 font-extralight"
                    } px-6 py-2 rounded-full`}
                  >
                    Info
                  </span>
                )}
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>

    // <div className="fixed top-0 left-0 right-0 w-full z-50 py-2 bg-red-400">
    //   Helo
    //   <div>Hello</div>
    //   <div>Hello</div>
    //   <div>Hello</div>
    //   <div>Hello</div>
    //   <div>Hello</div>
    // </div>
  );
};

export default NavBarComponent;
