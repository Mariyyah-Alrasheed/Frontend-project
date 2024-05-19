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
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { AboutUs } from "./aboutUs"

export function Home() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")

  const { state, handelAddCart } = context

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
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })

  console.log("data ", data)

  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      <div className="App">
        <h1 className="text-2xl uppercase mb-10">Products</h1>

        <section className="flex flex-col md:flex-row gap-2 max-w-6xl mx-auto flex-wrap">
          {data?.map((product) => (
            <Card key={product.id} className="w-[200px]">
              <CardHeader>
                <img alt={product.name} src={product.image} className="mb-4 h-48 object-contain" />
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{product.price}$</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handelAddCart(product)}>
                  Add to cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
    </>
  )
}
