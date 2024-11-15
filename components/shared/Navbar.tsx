"use client";

import Link from "next/link";
import { navLinks } from "@/constants";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { MdAdsClick } from "react-icons/md";
import Button from "../ui/Button";
import { useState } from "react";

const Navbar = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(''); // Changed from null to empty string

  const handleOpenMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  const handleLogin = (selectedRole:any) => {
    setUserRole(selectedRole);
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setUserRole('');
    setIsLoggedIn(false);
  };

  // Filter navLinks based on role
  const filteredNavLinks = navLinks.filter(link => {
    if (userRole === 'applicant' && link.name.toLowerCase() === 'job') {
      return false;
    }
    return true;
  });

  const LoginModal = () => (
    isLoginModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Choose your role</h2>
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <MdClose className="text-2xl" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleLogin('recruiter')}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
            >
              Login as Recruiter
            </button>
            <button
              onClick={() => handleLogin('applicant')}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
            >
              Login as Applicant
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <nav className="py-5 bg-transparent relative top-0 z-10 w-full">
      <div className="max-w-[1450px] w-[90%] mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <div className="flex items-center gap-1">
            <h1 className="text-black font-semibold uppercase text-xl">
              JobCenter
            </h1>
            <MdAdsClick className="text-purple-600 text-3xl" />
          </div>
        </Link>

        <ul className="flex gap-16 items-center max-md:hidden">
          {filteredNavLinks.map((link, index) => (
            <Link href={link.route} key={index}>
              <li>{link.name}</li>
            </Link>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {isLoggedIn && (
          <Link href={"/"}>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition-colors"
            >
              Logout
            </button>
          </Link>
          )}

          {(!isLoggedIn || (isLoggedIn && userRole === 'recruiter')) && (
            <Link href={isLoggedIn ? "/create" : "#"}>
              <button
                onClick={isLoggedIn ? undefined : () => setIsLoginModalOpen(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                {isLoggedIn ? "Post a Job" : "Login"}
              </button>
            </Link>
          )}

          <div
            className="md:hidden text-3xl cursor-pointer text-black"
            onClick={handleOpenMobileMenu}
          >
            {openMobileMenu ? <MdClose /> : <FiMenu />}
          </div>

          {openMobileMenu && (
            <ul className="md:hidden bg-purple-600 absolute top-14 right-5 px-4 py-6 text-center text-white rounded-md flex flex-col gap-3 shadow-md">
              {filteredNavLinks.map((link, index) => (
                <Link
                  href={link.route}
                  key={index}
                  onClick={() => setOpenMobileMenu(false)}
                >
                  <li>{link.name}</li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
      <LoginModal />
    </nav>
  );
};

export default Navbar;