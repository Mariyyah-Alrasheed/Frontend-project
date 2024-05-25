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

      <Hero />
      <AboutUs />

      {/* <ProductDetails /> */}
      <div className="App">
        {categories?.map((cat) => (
          <div key={cat.id}>
            {products &&
              products.some((product) => product.id && product.categoryId === cat.id) && (
                <>
                  <h1 className="text-2xl uppercase mb-10 p-5">{cat.name}</h1>
                  <section className="flex flex-col md:flex-row justify-center gap-2 max-w-6xl mx-auto flex-wrap">
                    {[
                      ...new Map(
                        products
                          .filter((product) => product.categoryId === cat.id)
                          .map((filteredProduct) => [filteredProduct.id, filteredProduct])
                      ).values()
                    ].map((uniqueProduct) => (
                      <Card key={uniqueProduct.id} className="w-[200px]">
                        <Link to={`/products/${uniqueProduct.id}`}>
                          <CardHeader>
                            <img
                              alt={uniqueProduct.name}
                              src={uniqueProduct.image}
                              className="mb-4 h-48 object-contain"
                            />
                            <CardTitle>{uniqueProduct.name}</CardTitle>
                            <CardDescription className=" text-sm">
                              {uniqueProduct.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>{uniqueProduct.price}$</p>
                          </CardContent>
                        </Link>
                        <CardFooter>
                          <Button className="w-full" onClick={() => handelAddCart(uniqueProduct)}>
                            Add to cart
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </section>
                </>
              )}
          </div>
        ))}

        {error && <p className="text-red-500">{error.message}</p>}
      </div>
    </>
  )
}
