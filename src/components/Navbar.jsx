import React, { useState } from "react";
import { Link } from "react-router";

const Navbar = ({ LogOutFunc, Username }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Username */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="text-xl font-bold flex items-center"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                />
              </svg>
              {Username || "ChatApp"}
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 transition duration-150"
              >
                Home
              </Link>
              <Link
                to="/Users"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 transition duration-150"
              >
                Users
              </Link>
              <Link
                to="/About"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 transition duration-150"
              >
                About
              </Link>
              {Username ? (
                <button
                  onClick={LogOutFunc}
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium bg-indigo-700 hover:bg-indigo-800 transition duration-150"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/Login"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 transition duration-150"
                  >
                    Login
                  </Link>
                  <Link
                    to="/Register"
                    className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-700 hover:bg-indigo-800 transition duration-150"
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
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-indigo-500 focus:outline-none transition duration-150"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 transition duration-150"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/Users"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 transition duration-150"
              onClick={() => setMobileMenuOpen(false)}
            >
              Users
            </Link>
            <Link
              to="/About"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 transition duration-150"
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
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 transition duration-150"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/Login"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 transition duration-150"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/Register"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 transition duration-150"
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