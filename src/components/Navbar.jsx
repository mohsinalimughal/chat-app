import React, { useState } from "react";
import { Link } from "react-router";

const Navbar = ({ LogOutFunc, Username }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-ivory-white bg-opacity-90 backdrop-blur-md shadow-sm border-b border-soft-lavender border-opacity-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Username */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="text-xl font-medium text-charcoal-black flex items-center hover:text-soft-lavender transition duration-300"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 mr-2 text-muted-green" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                />
              </svg>
              {Username || "ChatApp"}
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              <Link
                to="/"
                className="px-4 py-2 rounded-lg text-sm font-medium text-charcoal-black hover:bg-soft-lavender hover:bg-opacity-10 hover:text-soft-lavender transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/users"
                className="px-4 py-2 rounded-lg text-sm font-medium text-charcoal-black hover:bg-soft-lavender hover:bg-opacity-10 hover:text-soft-lavender transition duration-300"
              >
                Users
              </Link>
              <Link
                to="/about"
                className="px-4 py-2 rounded-lg text-sm font-medium text-charcoal-black hover:bg-soft-lavender hover:bg-opacity-10 hover:text-soft-lavender transition duration-300"
              >
                About
              </Link>
              {Username ? (
                <button
                  onClick={LogOutFunc}
                  className="ml-2 px-4 py-2 rounded-lg text-sm font-medium bg-soft-lavender bg-opacity-90 text-ivory-white hover:bg-opacity-100 shadow-sm transition duration-300"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-charcoal-black hover:bg-soft-lavender hover:bg-opacity-10 transition duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-soft-lavender bg-opacity-90 text-ivory-white hover:bg-opacity-100 shadow-sm transition duration-300"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-soft-lavender hover:bg-opacity-10 focus:outline-none transition duration-300"
            >
              <svg
                className="h-6 w-6 text-charcoal-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Glassmorphism effect) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ivory-white bg-opacity-95 backdrop-blur-md border-b border-soft-lavender border-opacity-20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-4 py-3 rounded-lg text-base font-medium text-charcoal-black hover:bg-soft-lavender hover:bg-opacity-10 transition duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/users"
              className="block px-4 py-3 rounded-lg text-base font-medium text-charcoal-black hover:bg-soft-lavender hover:bg-opacity-10 transition duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Users
            </Link>
            <Link
              to="/about"
              className="block px-4 py-3 rounded-lg text-base font-medium text-charcoal-black hover:bg-soft-lavender hover:bg-opacity-10 transition duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            {Username ? (
              <button
                onClick={() => {
                  LogOutFunc();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium bg-soft-lavender bg-opacity-90 text-ivory-white hover:bg-opacity-100 shadow-sm transition duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-3 rounded-lg text-base font-medium text-charcoal-black hover:bg-soft-lavender hover:bg-opacity-10 transition duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-3 rounded-lg text-base font-medium bg-soft-lavender bg-opacity-90 text-ivory-white hover:bg-opacity-100 shadow-sm transition duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;