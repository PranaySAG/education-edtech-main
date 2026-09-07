import React, { useState, createContext, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import profile from "../../assets/profile.svg";
import {
  ChevronFirst,
  ChevronLast,
  MoreVertical,
  Menu,
  X,
  Search,
  Sparkles,
  User,
} from "lucide-react";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownOpen &&
        !event.target.closest(".profile-dropdown-container")
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleProfileAreaClick = () => {
    navigate("/profile");
  };

  const handleViewProfileClick = () => {
    navigate("/profile");
    setDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    navigate("/");
    setDropdownOpen(false);
  };

  return (
    <SidebarContext.Provider value={{ expanded, location }}>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm text-white shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl transition hover:bg-white/15 md:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="h-4 w-4" />
        Menu
      </button>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-[19rem] overflow-hidden border-r border-white/10 bg-[linear-gradient(180deg,rgba(6,17,28,0.96),rgba(3,7,18,0.98))] text-white shadow-[0_30px_120px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-[width,transform] duration-300 ease-in-out md:sticky md:top-0 md:z-auto md:h-screen md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${expanded ? "md:w-[19rem]" : "md:w-[5.5rem]"}`}
      >
        <nav className="flex h-full flex-col overflow-hidden">
          <div className="border-b border-white/10 p-4">
            <div
              className={`mb-4 flex items-center ${
                expanded ? "justify-between" : "justify-center"
              }`}
            >
              <div className={`flex items-center overflow-hidden ${expanded ? "gap-3" : "justify-center"}`}>
                {expanded && (
                  <img src={logo} className="h-10 w-10 rounded-2xl bg-white/10 p-2" alt="Logo" />
                )}
                <div className={`${expanded ? "block" : "hidden"}`}>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">SmartLearn</p>
                  <p className="text-lg font-semibold text-white">Dashboard</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setExpanded((curr) => !curr)}
                  className={`hidden rounded-full border border-white/10 bg-white/5 p-2 text-white transition duration-300 ease-in-out hover:bg-white/10 md:inline-flex ${
                    expanded ? "" : "mx-auto"
                  }`}
                  aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
                >
                  {expanded ? <ChevronFirst className="h-4 w-4" /> : <ChevronLast className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:bg-white/10 md:hidden"
                  aria-label="Close navigation menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className={`${expanded ? "rounded-[1.25rem] border border-white/10 bg-white/5 p-3" : "hidden"}`}>
              <div className="flex items-center gap-3 rounded-[1rem] border border-white/10 bg-slate-950/40 px-3 py-2 text-slate-300">
                <Search className="h-4 w-4 text-emerald-300" />
                <span className="text-sm">Search courses, jobs, AI tools</span>
              </div>
            </div>
          </div>

          <ul className="flex-1 space-y-2 overflow-y-auto px-3 py-4">{children}</ul>

          <div className="border-t border-white/10 p-4 profile-dropdown-container">
            <div
              onClick={handleProfileAreaClick}
              className={`flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 p-3 text-sm text-slate-200 backdrop-blur-xl transition hover:bg-white/10 ${
                expanded ? "justify-start" : "justify-center px-0"
              } cursor-pointer`}
            >
              <img src={profile} alt="Profile" className="h-10 w-10 rounded-2xl bg-white/10 p-1.5" />
              {expanded && (
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Profile</p>
                  <p className="truncate text-sm font-medium text-white">My Profile</p>
                </div>
              )}
            </div>

            {expanded && (
              <button
                onClick={() => setDropdownOpen((curr) => !curr)}
                className="mt-3 inline-flex w-full items-center justify-between rounded-[1.1rem] border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10"
              >
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-300" />
                  Account actions
                </span>
                <MoreVertical className="h-4 w-4" />
              </button>
            )}

            {dropdownOpen && (
              <div className="mt-2 overflow-hidden rounded-[1.1rem] border border-white/10 bg-slate-950/90 p-2 shadow-2xl">
                <button
                  onClick={handleViewProfileClick}
                  className="flex w-full items-center gap-3 rounded-[0.9rem] px-3 py-2 text-left text-sm text-slate-200 transition hover:bg-white/10"
                >
                  <User className="h-4 w-4 text-cyan-300" />
                  View Profile
                </button>
                <button
                  onClick={handleLogoutClick}
                  className="flex w-full items-center gap-3 rounded-[0.9rem] px-3 py-2 text-left text-sm text-red-300 transition hover:bg-red-500/10"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </aside>
    </SidebarContext.Provider>
  );
}

export function SidebarItem({ icon, text, to }) {
  const { expanded, location } = useContext(SidebarContext);
  const isActive = location.pathname === to;

  return (
    <Link to={to} className="block">
      <li
        className={`group flex items-center rounded-[1.1rem] border py-3 transition-[transform,background-color,border-color,color] duration-300 ease-in-out ${
          expanded ? "px-3" : "justify-center px-2"
        } ${
          isActive
            ? "border-emerald-400/25 bg-[linear-gradient(135deg,rgba(16,185,129,0.22),rgba(59,130,246,0.14))] text-white shadow-[0_16px_40px_rgba(16,185,129,0.12)]"
            : "border-transparent bg-white/0 text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
        }`}
      >
        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition duration-300 ease-in-out group-hover:bg-white/10 ${expanded ? "" : "mx-auto"}`}>
          {React.cloneElement(icon, { className: "h-5 w-5" })}
        </div>
        <span className={`${expanded ? "ml-3 block whitespace-nowrap text-sm font-medium" : "hidden"}`}>
          {text}
        </span>
      </li>
    </Link>
  );
}
