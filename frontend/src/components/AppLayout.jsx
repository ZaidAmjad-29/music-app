import { Link, Outlet, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useData } from "./PostProvider";

import {
  Upload,
  Heart,
  Compass,
  Music,
  Library,
  Menu,
  X,
  Search,
} from "lucide-react";
import { useState } from "react";

export default function AppLayout() {
  const location = useLocation();
  const { user } = useData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { to: "/upload", label: "Upload", icon: Upload, color: "text-yellow-400" },
    {
      to: "/playlists",
      label: "My Playlists",
      icon: Library,
      color: "text-pink-400",
    },
    {
      to: "/favorites",
      label: "Favorites",
      icon: Heart,
      color: "text-red-400",
    },
    { to: "/explore", label: "Explore", icon: Compass, color: "text-blue-400" },
    { to: "/search", label: "Search", icon: Search, color: "text-red-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <nav className="bg-black/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Music className="text-white" size={20} />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Wavify
                </span>
              </div>

              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-800/50 transition-all duration-200 group"
              >
                <div className="relative">
                  <img
                    src={`http://localhost:4000${user?.user?.profileImage}`}
                    alt="Profile"
                    className="w-10 h-10 object-cover rounded-full border-2 border-gray-600 group-hover:border-purple-400 transition-colors duration-200"
                  />
                  {/* <div className="absolute  w-4 h-4  rounded-full border-2 border-black"></div> */}
                </div>
                <span className="hidden md:block text-gray-300 group-hover:text-white font-medium transition-colors duration-200">
                  {user?.user?.name || "My Profile"}
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`
                        flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200
                        hover:bg-gray-800/50 group relative overflow-hidden
                        ${
                          location.pathname === link.to
                            ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white shadow-lg"
                            : "text-gray-400 hover:text-white"
                        }
                      `}
                  >
                    <Icon
                      size={18}
                      className={`
                          transition-colors duration-200
                          ${
                            location.pathname === link.to
                              ? link.color
                              : "group-hover:text-purple-400"
                          }
                        `}
                    />
                    <span className="font-medium text-sm">{link.label}</span>
                    {location.pathname === link.to && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center">
              <LogoutButton />
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-purple-400 transition-colors p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          <div
            className={`
              md:hidden transition-all duration-300 ease-in-out overflow-hidden
              ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <div className="py-4 space-y-2 border-t border-gray-800">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                        hover:bg-gray-800/50 group
                        ${
                          location.pathname === link.to
                            ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white"
                            : "text-gray-400 hover:text-white"
                        }
                      `}
                  >
                    <Icon
                      size={20}
                      className={`
                          transition-colors duration-200
                          ${
                            location.pathname === link.to
                              ? link.color
                              : "group-hover:text-purple-400"
                          }
                        `}
                    />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-gray-800">
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            />
          </div>

          <div className="relative z-10">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
