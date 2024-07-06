"use client";
import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/lib/slices/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout);
    router.push("/auth/register");
  };

  return (
    <nav
      className={`fixed w-full z-30 top-0 start-0 end-0 bg-white border-b border-gray-600`}
    >
      <div className="w-full flex flex-wrap items-center justify-between p-4">
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded={isOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <FaBars className="w-6 h-6" />
        </button>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="w-full flex flex-row p-4 md:p-0 mt-4 font-medium border border-gray-500 rounded-lg rtl:space-x-reverse">
            <li>
              <a
                href="/"
                className="w-full block py-2 px-3 hover:text-gray-100 hover:bg-gray-700 hover:rounded-md"
                onClick={toggleMenu}
              >
                Home
              </a>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link href={"/quizzes"}>
                    <button
                      className="w-full block py-2 px-3 hover:text-gray-100 hover:bg-gray-700 hover:rounded-md"
                      onClick={toggleMenu}
                    >
                      Quizzes
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href={"/reports"}>
                    <button
                      className="w-full block py-2 px-3 hover:text-gray-100 hover:bg-gray-700 hover:rounded-md"
                      onClick={toggleMenu}
                    >
                      Reports
                    </button>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      toggleMenu();
                      handleLogout();
                    }}
                    className="w-full block py-2 px-3 hover:text-gray-100 hover:bg-gray-700 hover:rounded-md"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a
                    href="/auth/login"
                    className="w-full block py-2 px-3 hover:text-gray-100 hover:bg-gray-700 hover:rounded-md"
                    onClick={toggleMenu}
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="/auth/register"
                    className="w-full block py-2 px-3 hover:text-gray-100 hover:bg-gray-700 hover:rounded-md"
                    onClick={toggleMenu}
                  >
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
