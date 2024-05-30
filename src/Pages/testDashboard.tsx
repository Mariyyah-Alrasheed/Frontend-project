import { Link, useNavigate } from "react-router-dom"
import {
  ArrowUpIcon,
  CreditCardIcon,
  DollarSignIcon,
  FacebookIcon,
  Home,
  LineChart,
  LinkedinIcon,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  TwitterIcon,
  Users2,
  UsersIcon
} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import React, { useState } from "react"
import api from "@/api"
import { ProductDataTable } from "@/components/productDataTable"
import { Category, Product, Stock, User } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { StockForDashboard } from "./dashboardComponent/stock"
import { GlobalContext } from "@/App"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

// import { Product, ProductDashboard } from "./dashboardComponent.tsx/product"

export function IconWithHover({ children }) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div
      className="inline-block p-2 rounded-full hover:bg-gray-200 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {React.cloneElement(children, { isHovered })}
    </div>
  )
}

export function TestDashboard() {
  const navigate = useNavigate()

  const context = React.useContext(GlobalContext)
  if (!context) throw Error("Context is missing")

  const { state, handleRemoveUser } = context

  const handelLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    handleRemoveUser()
    navigate("/")
  }

  const queryClient = useQueryClient()

  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    image: "",
    description: ""
  })

  const [cat, setCat] = useState({
    name: ""
  })

  const [stock, setStock] = useState({
    productId: "",
    stockQuantity: 0,
    price: 0,
    color: "",
    size: ""
  })

  const postProducts = async (product: Product) => {
    try {
      const res = await api.post("/products", product)
      return res.data
    } catch (error) {
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handelSelect = (value) => {
    console.log(value)
    setProduct({
      ...product,
      categoryId: value
    })
  }

  const handelChange = (e) => {
    const { name, value } = e.target
    console.log(e.target.value)

    setProduct({
      ...product,
      [name]: value
    })
  }

  const handelSubmit = async (e) => {
    e.preventDefault()

    await postProducts(product)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  const handelChangecat = (e) => {
    const { name, value } = e.target
    console.log(e.target.value)

    setCat({
      ...cat,
      [name]: value
    })
  }

  const handelSubmitcat = async (e) => {
    e.preventDefault()

    await postCategory(cat)
    queryClient.invalidateQueries({ queryKey: ["category"] })
  }

  // const handelChangeStock = (e) => {
  //   const { name, value } = e.target
  //   console.log(e.target.value)

  //   // setStock({
  //   //   ...stock,
  //   //   [name]: value
  //   // })
  // }

  // const handelSubmitStock = async (e) => {
  //   e.preventDefault()

  //   await postStock(stock)
  //   queryClient.invalidateQueries({ queryKey: ["stock"] })
  // }

  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data: products, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data: users, error: userError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers
  })

  const getCategories = async () => {
    try {
      const res = await api.get("/categorys")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data: categories, error: catError } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories
  })

  const postCategory = async (cat: Category) => {
    try {
      const res = await api.post("/categorys", cat)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries

  const getStocks = async () => {
    try {
      const res = await api.get("/stocks")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data: stocks, error: stocksError } = useQuery<Stock[]>({
    queryKey: ["stocks"],
    queryFn: getStocks
  })

  const categoriesIds = categories?.reduce((acc, cat) => {
    return {
      ...acc,
      [cat.id]: cat.name
    }
  }, {} as { [key: string]: string })

  console.log(categoriesIds)
  const productWithCat = products?.map((product) => {
    if (categoriesIds) {
      const category = categoriesIds[product.categoryId]
      if (category) {
        return {
          ...product,
          categoryId: category
        }
      }
    }
    return product
  })

  const filteredProducts = productWithCat?.filter((product) =>
    stocks?.some((stock) => stock.productId === product.id)
  )

  return (
    <>
      <div className="bg-[#EEEE]">
        <TooltipProvider>
          <div className="flex min-h-screen w-full flex-col">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
              <nav className="flex flex-col items-center gap-4 px-2 py-4">
                <Link
                  to={"/Dash2"}
                  className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                  <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                {/* <Tooltip> */}
                {/* <TooltipTrigger asChild> */}
                {/* <Link
                    to={""}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Dashboard</span>
                  </Link> */}
                {/* </TooltipTrigger> */}
                {/* <TooltipContent side="right">Dashboard</TooltipContent>
              </Tooltip> */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={"/dash2/orders"}
                      className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span className="sr-only">Orders</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Orders</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={"/dash2/products"}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                      <Package className="h-5 w-5" />
                      <span className="sr-only">Products</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Products</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={"/dash2/users"}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                      <Users2 className="h-5 w-5" />
                      <span className="sr-only">Customers</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Customers</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={"/dash2/stocks"}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                      <LineChart className="h-5 w-5" />
                      <span className="sr-only">Stocks</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Stocks</TooltipContent>
                </Tooltip>
              </nav>
              {/* <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4"> */}
              {/* <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={""}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Settings</TooltipContent>
              </Tooltip> */}
              {/* </nav> */}
            </aside>

            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                      <PanelLeft className="h-5 w-5" />
                      <span className="sr-only">Toggle Menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                      <Link
                        to={"/Dash2"}
                        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                      >
                        <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                        <span className="sr-only">Acme Inc</span>
                      </Link>
                      {/* <Link
                      to={"/Dash2"}
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Home className="h-5 w-5" />
                      Dashboard
                    </Link> */}
                      <Link
                        to={"/dash2/orders"}
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        Orders
                      </Link>
                      <Link
                        to={"/dash2/products"}
                        className="flex items-center gap-4 px-2.5 text-foreground"
                      >
                        <Package className="h-5 w-5" />
                        Products
                      </Link>
                      <Link
                        to={"/dash2/users"}
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                      >
                        <Users2 className="h-5 w-5" />
                        Customers
                      </Link>
                      <Link
                        to={"/dash2/stocks"}
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                      >
                        <LineChart className="h-5 w-5" />
                        Stocks
                      </Link>
                    </nav>
                  </SheetContent>
                </Sheet>
                <Breadcrumb className="hidden md:flex">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <BreadcrumbPage>
                          <Link to={"/Dash2"}>Dashboard</Link>
                        </BreadcrumbPage>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to={"/dash2/products"}>Products</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <Link to={"/dash2/orders"}>Orders</Link>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <IconWithHover>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="black"
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
                    {state.user && (
                      <DropdownMenuItem>
                        <a href="/">Home page</a>
                      </DropdownMenuItem>
                    )}
                    {!state.user && (
                      <DropdownMenuItem>
                        <Link to="/Login"> Log In</Link>
                      </DropdownMenuItem>
                    )}
                    {state.user && (
                      <DropdownMenuItem
                        onClick={() => {
                          handelLogout
                        }}
                      >
                        Logout
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </header>

              <div className="flex flex-col mx-auto mb-6">
                {/* <div> */}
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400">Welcome back, {state.user?.name}</p>
                {/* </div> */}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex items-center justify-between">
                    <CardTitle>Total Revenue</CardTitle>
                    <DollarSignIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$45,231.89</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex items-center justify-between">
                    <CardTitle>New Subscriptions</CardTitle>
                    <UsersIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">+2,350</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex items-center justify-between">
                    <CardTitle>Total Sales</CardTitle>
                    <CreditCardIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">+12,234</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">+19% from last month</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TooltipProvider>
      </div>
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 px-4 md:px-6">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 Acme Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              to="#"
            >
              <TwitterIcon className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              to="#"
            >
              <FacebookIcon className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              to="#"
            >
              <LinkedinIcon className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
          <Button className="ml-auto" size="sm" variant="ghost">
            <ArrowUpIcon className="h-4 w-4" />
            Back to top
          </Button>
        </div>
      </footer>
    </>
  )
}
