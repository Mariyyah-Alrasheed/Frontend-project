import * as React from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Product } from "@/types"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import api from "@/api"
import { Navbar } from "@/components/navbar"
import Select from "react-select"
import { GlobalContext } from "@/App"
import { Button } from "@/components/ui/button" // Make sure you have this import

export function ProductDetails() {
  const context = React.useContext(GlobalContext)
  if (!context) throw Error("Context is missing")

  const { state, handelAddCart } = context

  const [selectedStock, setSelectedStock] = React.useState<Product | null>(null)
  const params = useParams()

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
  const { data: products, error: productError } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })

  const getProduct = async () => {
    try {
      const res = await api.get(`/products/${params.productId}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const {
    data: product,
    error,
    isLoading
  } = useQuery<Product>({
    queryKey: ["product"],
    queryFn: getProduct
  })

  React.useEffect(() => {
    if (products && products.length > 0) {
      const stockOfProduct = products.filter((pro) => pro.id === product?.id)
      if (stockOfProduct && stockOfProduct.length > 0) {
        setSelectedStock(stockOfProduct[0])
      }
    }
  }, [products, product])

  if (isLoading) {
    return <p>Loading....</p>
  }

  if (!product) {
    return <p>Product Not Found</p>
  }

  const stockOfProduct = products?.filter((pro) => pro.id === product.id)

  const handleStockChange = (selectedOption: any) => {
    const selectedStockId = selectedOption.value
    const selectedStock = stockOfProduct?.find((stock) => stock.stockId === selectedStockId)
    setSelectedStock(selectedStock || null)
  }

  const defaultValue = selectedStock
    ? { value: selectedStock.stockId, label: `Product: ${selectedStock.color}` }
    : null

  return (
    <>
      <div className="bg-[#112B3C] p-6 md:p-10 lg:p-16">
        <Navbar />

        <Card className="max-w-4xl mx-auto my-10 p-10">
          <CardContent className="flex md:flex-row items-start">
            <img className="w-1/3 h-auto object-cover m-9" src={product.image} alt={product.name} />
            <div>
              <CardTitle>
                <h2 className="text-xl md:text-2xl lg:text-5xl mb-4 mr-10 font-extrabold">
                  {product.name}
                </h2>
              </CardTitle>
              <p className="mb-4 text-sm md:text-m lg:text-lg mr-10">{product.description}</p>
              <div className="mb-4">
                <label
                  htmlFor="stockId"
                  className="block mb-2 text-m md:text-l lg:text-lg font-semibold"
                >
                  Select Product:
                </label>
                <Select
                  className=""
                  name="stockId"
                  options={stockOfProduct?.map((pro) => ({
                    value: pro.stockId,
                    label: `Product: ${pro.color} (Size: ${pro.size}, Price: ${pro.price}$)`
                  }))}
                  onChange={handleStockChange}
                  defaultValue={defaultValue}
                />
              </div>
              {selectedStock && (
                <div className="mt-4">
                  <p>
                    <strong>Type:</strong> {selectedStock.color}
                  </p>
                  <p>
                    <strong>Size:</strong> {selectedStock.size}
                  </p>
                  <p>
                    <strong>Price:</strong> {selectedStock.price}$
                  </p>
                  <Button className="w-full" onClick={() => handelAddCart(selectedStock)}>
                    Add to cart
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
