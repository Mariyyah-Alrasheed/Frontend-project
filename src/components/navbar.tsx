import { BeakerIcon } from "@heroicons/react/24/solid"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import logo from "../components/logo.png"
import { CartDrawer } from "./cart/drawerCart"
import * as React from "react"
import { Link } from "lucide-react"
import { GlobalContext } from "@/App"

export function IconWithHover({ children }) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div
      className="inline-block p-2 rounded-full bg-[#391F13] hover:text-[#0b0a09] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {React.cloneElement(children, { isHovered })}
    </div>
  )
}

export function Navbar() {
  const context = React.useContext(GlobalContext)
  if (!context) throw Error("Context is missing")

  const { state, handleRemoveUser } = context

  const handelLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    handleRemoveUser()
  }

  return (
    <div className=" bg-opacity-0 -mt-40 sticky top-0 z-10">
      <nav className="max-w-screen-xl mx-auto py-4 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className=" h-14">
            <img src={logo} alt="logo" className="h-full w-auto object-contain" />
          </div>
          <ul className="hidden md:flex md:gap-14 text-[#BD9E82] font-extralight text-xl">
            <li>
              <a href="about-Us">Special offers</a>
            </li>
            <li>
              <a className="menu-item" href="#chocolate">
                Chocolate shop
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <IconWithHover>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#BD9E82"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
          </IconWithHover>
          <IconWithHover>
            <CartDrawer />
          </IconWithHover>
          <IconWithHover>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#BD9E82"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </IconWithHover>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <IconWithHover>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#BD9E82"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </IconWithHover>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Setting</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {!state.user && (
                <DropdownMenuItem>
                  <a href="/signup"> Sign up </a>
                </DropdownMenuItem>
              )}
              {!state.user && (
                <DropdownMenuItem>
                  <a href="/login">Log in</a>
                </DropdownMenuItem>
              )}
              {state.user?.role === "Admin" && (
                <DropdownMenuItem>
                  <a href="/Dash2">Dashboard</a>
                </DropdownMenuItem>
              )}
              {state.user && <DropdownMenuItem onClick={handelLogout}>Logout</DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  )
}
