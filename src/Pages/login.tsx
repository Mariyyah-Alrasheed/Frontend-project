import { Link, useNavigate } from "react-router-dom"
import api from "@/api"
import jwt from "jwt-decode"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { GlobalContext } from "@/App"
import { reshapeUser } from "@/lib/utils"
import { Navbar } from "@/components/navbar"

export function Login() {
  const navigate = useNavigate()
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state, handleStoreUser } = context

  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  console.log("user ", user)

  const handelLogin = async () => {
    console.log("user in login component", user)

    try {
      const res = await api.post("/users/login", user)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const handelSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const token = await handelLogin()
    if (token) {
      localStorage.setItem("token", token)
      const decodedToken = jwt(token)
      const user = reshapeUser(decodedToken)
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      handleStoreUser(user)

      if (state.user?.role === "Admin") {
        navigate("/Dash2")
      }
      navigate("/")
    }
  }

  return (
    <>
      <Navbar />
      <div className=" bg-[#533218] backdrop-blur-lg backdrop-filter bg-opacity-50 mt-40  lg:p-20">
        <section className="min-h-screen flex items-center justify-center">
          <div className="form-container w-1/2 flex  items-center justify-center rounded-3xl shadow-lg max-w-2xl p-5">
            <div className=" w-full sm:w-3/4 px-16 text-white p-8 rounded">
              <div className=" bg-amber-950  bg-opacity-50 p-8 rounded">
                <h2 className=" font-bold text-2xl text-white">Login</h2>
                <p className=" text-sm text-white mt-4 font-bold">
                  If you already a member, easily log in
                </p>

                <form action="POST" className="flex flex-col gap-4" onSubmit={handelSubmit}>
                  <input
                    className="p-2 mt-8 rounded-xl bg-[#26150d]  bg-opacity-75 text-white"
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handelChange}
                  />
                  <div className="relative mt-8">
                    <input
                      className="p-2 rounded-xl w-full pr-10 bg-[#26150d]  bg-opacity-75 text-white"
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handelChange}
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="gray"
                        className="bi bi-eye"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                      </svg>
                    </div>
                  </div>
                  <button className="bg-[#211106] rounded-lg py-2 text-amber-50 hover:scale-110 duration-300">
                    Login
                  </button>
                </form>

                <div className=" mt-10 grid grid-cols-3 items-center text-amber-50">
                  <hr className=" border-gray-400" />
                  <p className=" text-center text-sm">OR</p>
                  <hr className=" border-gray-400" />
                </div>

                <button className=" bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-110 duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="gray"
                    className=" mr-3 bi bi-google"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                  </svg>
                  Login with Google
                </button>
              </div>

              <div className="mt-5 text-xs border-b border-[#d5966b] py-4 text-[#d5966b]">
                <a href="#">Forgot your password?</a>
              </div>

              <div className="mt-3 text-xs flex justify-between items-center text-[#d5966b]">
                <p> Don`t have an account?</p>

                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                  <Link to="/Signup"> Register</Link>
                </button>
              </div>
            </div>

            {/* <div className="sm:block hidden w-1/2">
              <img
                className=" rounded-2xl"
                src="https://images.pexels.com/photos/7538069/pexels-photo-7538069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              /> */}
            {/* </div> */}
          </div>
        </section>
      </div>
    </>
  )
}
