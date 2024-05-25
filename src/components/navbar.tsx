import { BeakerIcon } from "@heroicons/react/24/solid"

import logo from "../components/logo.png"
import { CartDrawer } from "./cart/drawerCart"

export function Navbar() {
  return (
    <div className=" bg-[#112B3C] sticky top-0 z-10">
      <nav className="max-w-screen-xl mx-auto py-4 px-6 ">
        <div className="flex items-center justify-between">
          <div className="h-9">
            <img src={logo} alt="logo" className="h-50 w-auto object-contain size-10" />
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            color="white"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
          </svg>

          <ul className="hidden md:flex md:gap-14">
            <li>
              <a className="menu-item hover:size-full"> Special offers</a>
            </li>
            <li>
              <a className="menu-item"> Chocolate shope</a>
            </li>
          </ul>
          <div className="flex items-center justify-between">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <CartDrawer />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
        </div>
      </nav>
    </div>
  )
}
