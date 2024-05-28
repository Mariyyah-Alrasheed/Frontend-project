import { GlobalContext } from "@/App"
import api from "@/api"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero/heroPage"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Category, Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { AboutUs } from "./aboutUs"
import { Link } from "react-router-dom"
import { ProductDetails } from "./productDetails"
import { SonnerDemo } from "@/components/sonner"
import { toast } from "sonner"
import { Hero2 } from "@/components/hero/hero2"
import { GithubIcon, LinkedinIcon, MountainIcon, TwitterIcon } from "lucide-react"

export const showToast = (message, action) => {
  toast(message, action)
}

export function Home() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")

  const { state, handelAddCart } = context

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
  const { data: stocks, error: stockError } = useQuery<Product[]>({
    queryKey: ["stocks"],
    queryFn: getStocks
  })

  return (
    <>
      <Navbar />
      <Hero2 />
      <Hero />
      <AboutUs />

      {/* <ProductDetails /> */}
      <div className="App">
        {categories?.map((cat) => (
          <div
            className="flex flex-wrap w-1/3 gap-2 mx-auto items-center justify-center"
            key={cat.id}
          >
            {products &&
              products.some((product) => product.id && product.categoryId === cat.id) && (
                <>
                  <h1 className="text-3xl lg:text-5xl font-extrabold font-serif  uppercase mb-16 p-5 text-[#FFDAB9]">
                    {cat.name}
                  </h1>
                  {[
                    ...new Map(
                      products
                        .filter((product) => product.categoryId === cat.id)
                        .map((filteredProduct) => [filteredProduct.id, filteredProduct])
                    ).values()
                  ].map((uniqueProduct) => (
                    <>
                      <div className="flex">
                        <Card className="w-[250px] bg-[#140802] ">
                          <Link to={`/products/${uniqueProduct.id}`}>
                            <img
                              alt={uniqueProduct.name}
                              className="aspect-[4/3] w-full rounded-t-lg object-cover "
                              height={300}
                              src={uniqueProduct.image}
                              width={400}
                            />
                            <CardContent className="p-4">
                              <div className="space-y-2">
                                <CardTitle className="text-lg font-semibold text-[#BD9E82]">
                                  {uniqueProduct.name}
                                </CardTitle>
                                <p className="text-sm text-[#FFDAB9] dark:text-gray-400">
                                  {uniqueProduct.description}
                                </p>
                              </div>

                              <span className="font-semibold text-lg">{uniqueProduct.price}$</span>
                            </CardContent>
                          </Link>
                          <CardFooter>
                            <Button className="w-full" onClick={() => handelAddCart(uniqueProduct)}>
                              Add to cart
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </>
                  ))}
                </>
              )}
          </div>
        ))}

        {error && <p className="text-red-500">{error.message}</p>}
      </div>

      <footer className="bg-[#8B4513] p-6 md:py-8 w-full dark:bg-[#5C3317]">
        <div className="container max-w-7xl flex flex-col items-center justify-between gap-4 md:flex-row md:gap-6">
          <div className="flex items-center gap-2">
            <Link className="flex items-center" to="#">
              <MountainIcon className="h-5 w-5 fill-[#FFDAB9]" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <p className="text-xs text-[#FFDAB9] dark:text-[#D2B48C]">
              © 2024 Acme Inc. All rights reserved.
            </p>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              className="text-sm font-medium hover:underline underline-offset-4 text-[#FFDAB9]"
              to="/"
            >
              Home
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4 text-[#FFDAB9]"
              to="#"
            >
              Products
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4 text-[#FFDAB9]"
              to="#"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button className="rounded-full" size="icon" variant="ghost">
              <TwitterIcon className="h-5 w-5 fill-[#FFDAB9]" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button className="rounded-full" size="icon" variant="ghost">
              <GithubIcon className="h-5 w-5 fill-[#FFDAB9]" />
              <span className="sr-only">GitHub</span>
            </Button>
            <Button className="rounded-full" size="icon" variant="ghost">
              <LinkedinIcon className="h-5 w-5 fill-[#FFDAB9]" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </div>
        </div>
      </footer>
    </>
  )
}
