import { Link } from "react-router-dom"
import { LineChart, Package, Package2, PanelLeft, ShoppingCart, Users2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { ProductDataTable } from "@/components/productDataTable"
import api from "@/api"
import { Category, Product } from "@/types"
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
import React, { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

export function ProductDashboard() {
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

  return (
    <>
      <div className="m-18 bg-[#EEEE]">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <TooltipProvider>
            <nav className="flex flex-col items-center gap-4 px-2 py-4">
              <Link
                to={"/Dash2"}
                className="group flex bg-slate-600 h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              >
                <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
              </Link>

              {/* <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={""}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
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
                    className="flex h-9 w-9 items-center justify-center bg-primary rounded-lg  text-accent-foreground transition-colors hover:text-foregroundmd:h-8 md:w-8"
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
                    className="flex items-center gap-4 px-2.5  text-foreground"
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
                    <Link to={"/Dash2"}>Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <BreadcrumbPage>
                      <Link to={"/dash2/products"}>Products</Link>
                    </BreadcrumbPage>
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
        <h2 className="text-5xl font-bold">Product</h2>

        <div className="container flex-1">
          <div className="grid items-start gap-8 m-10 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Create Category</CardTitle>
                <CardDescription>Deploy your new category in one-click.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <form onSubmit={handelSubmitcat}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        name="name"
                        placeholder="Name"
                        value={cat.name}
                        onChange={handelChangecat}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button type="submit" className="ml-auto">
                      Create
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create Product</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <form onSubmit={handelSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        name="name"
                        placeholder="Name"
                        value={product.name}
                        onChange={handelChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="image">Image</Label>
                      <Input
                        id="image"
                        name="image"
                        placeholder="Image"
                        value={product.image}
                        onChange={handelChange}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Description of your product"
                      value={product.description}
                      onChange={handelChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>

                    <Select onValueChange={handelSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories &&
                          categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button type="submit" className="ml-auto">
                      Create
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="m-5">
          <ProductDataTable products={products} />
        </div>
      </div>
    </>
  )
}
