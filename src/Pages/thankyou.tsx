import { Navbar } from "@/components/navbar"
import { CircleCheckIcon, MountainIcon } from "lucide-react"
import { Link } from "react-router-dom"

export function Thankyou() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white mt-10 p-32">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center">
            <Link to="#">
              <MountainIcon className="text-[#D3BBA6] w-16 h-16" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Thank you!
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Your order #12345 has been confirmed.
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
            <p className="text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              #12345
            </p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">This is your order number.</p>
          </div>
          <div className="flex justify-center">
            <Link
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#D3BBA6] hover:bg-[#c0a28d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D3BBA6] dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300"
              to={"/"}
            >
              Go to homepage
            </Link>
          </div>
        </div>
      </div>
      <footer className="w-full bg-gray-100 dark:bg-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2024 Acme Inc. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              to="#"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              to="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              to="#"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
