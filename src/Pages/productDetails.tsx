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
import { CandyCaneIcon, CheckIcon, HandIcon, VeganIcon } from "lucide-react"
import { Checkout } from "./checkout"
import { ToastContainer } from "react-toastify"

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
      <div className="   md:p-10 lg:p-16">
        <Navbar />
        <Card className=" lg:p-16  bg-[#140802ea] lg:mt-8">
          <section className=" md:m-10 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto  md:py-20">
            <div className="flex flex-col gap-6 items-center">
              <img
                className=" w-3/4 md:2/3 rounded-lg overflow-hidden aspect-square object-cover lg:w-3/4"
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
              />
            </div>
            <div className="grid gap-4">
              <div>
                <h2 className="text-xl md:text-6xl lg:text-6xl font-serif  text-[#EFEFEF] font-bold">
                  {product.name}
                </h2>

                <p className="text-[#EFEFEF] mt-6 dark:text-[#EFEFEF] text-xs md:text-xl">
                  {product.description}
                </p>
              </div>
              <div className="flex items-center gap-4 justify-center">
                <label
                  htmlFor="stockId"
                  className="block mb-2 text-m md:text-l lg:text-lg font-semibold text-[#EFEFEF]"
                >
                  Select Product:
                </label>
                <Select
                  className=" text-black bg-black"
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
                  <p className="text-[#EFEFEF]">
                    <strong>Type:</strong> {selectedStock.color}
                  </p>
                  <p className="text-[#EFEFEF]">
                    <strong>Size:</strong> {selectedStock.size}
                  </p>
                  <p className="text-[#EFEFEF]">
                    <strong>Price:</strong> {selectedStock.price}$
                  </p>
                  <Button className="lg:w-full m-3" onClick={() => handelAddCart(selectedStock)}>
                    Add to cart
                  </Button>
                  <ToastContainer />
                </div>
              )}
            </div>
          </section>
        </Card>
        <section className="bg-[#D3BBA6] dark:bg-[#140802] py-12 md:py-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-4 md:px-0">
            <div className="grid gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#140802]">
                Chocolate Highlights
              </h2>
              <ul className="grid gap-2 text-[#391F13] dark:text-gray-400">
                <li>
                  <CheckIcon className="w-5 h-5 mr-2 inline-block text-[#D3BBA6]" />
                  Single-origin cacao beans
                </li>
                <li>
                  <CheckIcon className="w-5 h-5 mr-2 inline-block text-[#D3BBA6]" />
                  Fair-trade and ethically sourced
                </li>
                <li>
                  <CheckIcon className="w-5 h-5 mr-2 inline-block text-[#D3BBA6]" />
                  No artificial flavors or preservatives
                </li>
                <li>
                  <CheckIcon className="w-5 h-5 mr-2 inline-block text-[#D3BBA6]" />
                  Handcrafted in small batches
                </li>
              </ul>
            </div>
            <div className="grid gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#140802]">Tasting Notes</h2>
              <ul className="grid gap-2 text-[#391F13] dark:text-gray-400">
                <li>
                  <CheckIcon className="w-5 h-5 mr-2 inline-block text-[#D3BBA6]" />
                  Rich, velvety texture
                </li>
                <li>
                  <CheckIcon className="w-5 h-5 mr-2 inline-block text-[#D3BBA6]" />
                  Subtle notes of caramel and vanilla
                </li>
                <li>
                  <CheckIcon className="w-5 h-5 mr-2 inline-block text-[#D3BBA6]" />
                  Balanced sweetness and bitterness
                </li>
                <li>
                  <CheckIcon className="w-5 h-5 mr-2 inline-block text-[#D3BBA6]" />
                  Smooth, lingering finish
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-0 grid gap-8">
            <div className="grid gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#a18e85]">
                Why Choose Lion Chocolate?
              </h2>
              <p className="text-[#a18e85] dark:text-gray-400 text-lg">
                Our Lion Gourmet Chocolate is crafted with the finest ingredients and attention to
                detail to provide you with an unparalleled chocolate experience.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="grid gap-4">
                <CandyCaneIcon className="w-12 h-12 text-[#D3BBA6]" />
                <h3 className="text-xl font-bold text-[#988075]">Premium Cacao</h3>
                <p className="text-[#a18e85] dark:text-gray-400">
                  Our chocolate is made from single-origin cacao beans, ensuring exceptional flavor
                  and quality.
                </p>
              </div>
              <div className="grid gap-4">
                <VeganIcon className="w-12 h-12 text-[#D3BBA6]" />
                <h3 className="text-xl font-bold text-[#a18e85]">Ethical Sourcing</h3>
                <p className="text-[#a18e85] dark:text-gray-400">
                  We work directly with small-scale farmers to ensure fair trade practices and
                  sustainable production.
                </p>
              </div>
              <div className="grid gap-4">
                <HandIcon className="w-12 h-12 text-[#D3BBA6]" />
                <h3 className="text-xl font-bold text-[#a18e85]">Handcrafted Perfection</h3>
                <p className="text-[#a18e85] dark:text-gray-400">
                  Each batch of our chocolate is carefully crafted by our skilled chocolatiers to
                  deliver the ultimate taste experience.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
