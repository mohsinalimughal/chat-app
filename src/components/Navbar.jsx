import React from "react";
import { Link } from "react-router";

const Navbar = ( {LogOutFunc, Username} ) => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800"> <Link to={"/"}>   {Username} </Link>  </div>
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li className="hover:text-blue-600 cursor-pointer"> <Link to={"/"}>  Home </Link>    </li>
          <li className="hover:text-blue-600 cursor-pointer"> <Link to={"/Users"}>  Users </Link>    </li>
          <li className="hover:text-blue-600 cursor-pointer"> <Link to={"/About"}>About  </Link>    </li>
          {/* <li className="hover:text-blue-600 cursor-pointer"> <Link to={"/Contact"}> Contact  </Link>    </li> */}
          <li className="hover:text-blue-600 cursor-pointer"> <Link to={"/Login"}> Login  </Link>    </li>
          <li className="hover:text-blue-600 cursor-pointer"> <Link to={"/Rejister"}> Rejister  </Link>    </li>
          <li onClick={LogOutFunc} className="hover:text-blue-600 cursor-pointer">  Logout     </li>
        </ul>
        <div className="md:hidden">
          <button className="text-gray-700 text-2xl focus:outline-none">☰</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
