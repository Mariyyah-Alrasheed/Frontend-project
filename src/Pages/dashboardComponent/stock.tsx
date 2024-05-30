import React, { useState } from "react"
import api from "@/api"
import { ProductDataTable } from "@/components/productDataTable"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Product, Stock } from "@/types"
import { StockDataTable } from "@/components/stockDataTable"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

export function StockForDashboard() {
  const queryClient = useQueryClient()
  const [stock, setStock] = useState({
    productId: "",
    stockQuantity: 0,
    price: 0,
    color: "",
    size: ""
  })

  console.log(stock)
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

  const postStock = async (stock) => {
    try {
      const res = await api.post("/stocks", stock)
      return res.data
    } catch (error) {
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleChange = (e) => {
    const { name, value, valueAsNumber } = e.target
    if (name == "stockQuantity" || name == "price") {
      setStock({
        ...stock,
        [name]: valueAsNumber
      })
      return
    }
    setStock({
      ...stock,
      [name]: value
    })
  }

  const handleSelect = (value) => {
    setStock((prevState) => ({
      ...prevState,
      productId: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await postStock(stock)
    queryClient.invalidateQueries({ queryKey: ["stock"] })
  }

  const uniqueMap: { [key: string]: boolean } = {}
  const uniqueProducts = products?.filter((product) => {
    if (!uniqueMap[product.id]) {
      uniqueMap[product.id] = true
      return product
    }
    return false
  })

  return (
    <>
      <div className=" bg-[#EEEE]">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <TooltipProvider>
            <nav className="flex flex-col items-center gap-4 px-2 py-4">
              <Link
                to={"/Dash2"}
                className="group flex bg-slate-600 h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              >
                <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                <span className="sr-only ">Acme Inc</span>
              </Link>

              {/* <Tooltip> */}
              {/* <TooltipTrigger asChild>
                  <Link
                    to={""}
                    className="flex h-9 w-9  items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
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
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground bg-primary transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <LineChart className="h-5 w-5" />
                    <span className="sr-only">Stocks</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Stocks</TooltipContent>
              </Tooltip>
            </nav>
            {/* <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
              <Tooltip>
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
              </Tooltip>
            </nav> */}
          </TooltipProvider>
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
                    to={""}
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
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
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
                    className="flex items-center gap-4 px-2.5  text-foreground"
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
                    <Link to={"/Dash2"}>Dashboard</Link>
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
          </header>
        </div>
        <div className="container flex-1 m-15">
          <div className="grid justify-center items-center gap-8 ">
            <h2 className="text-5xl font-bold">Stocks</h2>

            <h2 className=" text-2xl mt-10 font-bold"> ADD TO STOCK </h2>
            <Card>
              <CardHeader>
                <CardTitle>Enter Product Stock</CardTitle>
                <CardDescription>Update stock information for your products.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="productId">Product ID</Label>
                      <Select onValueChange={handleSelect}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product ID" />
                        </SelectTrigger>
                        <SelectContent>
                          {uniqueProducts &&
                            uniqueProducts.map((product, i) => (
                              <SelectItem key={i} value={product.id}>
                                {product.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="stockQuantity">Stock Quantity</Label>
                      <Input
                        id="stockQuantity"
                        name="stockQuantity"
                        type="number"
                        placeholder="Stock Quantity"
                        value={stock.stockQuantity}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={stock.price}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="color">Color</Label>
                      <Input
                        id="color"
                        name="color"
                        placeholder="Color"
                        value={stock.color}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="size">Size</Label>
                      <Input
                        id="size"
                        name="size"
                        placeholder="Size"
                        value={stock.size}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="ml-auto">
                    Update Stock
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <h2 className=" text-2xl mt-10 font-bold">ALL STOCK</h2>

          <StockDataTable products={products} />
        </div>
      </div>
    </>
  )
}
