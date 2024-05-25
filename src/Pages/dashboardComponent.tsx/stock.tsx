import React, { useState } from "react"
import { useQueryClient } from "react-query"
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
import { Stock } from "@/types"
import { StockDataTable } from "@/components/stockDataTable"

export function StockForDashboard({ products }) {
  // const queryClient = useQueryClient()

  const [stock, setStock] = useState({
    productId: "",
    stockQuantity: 0,
    price: 0,
    color: "",
    size: ""
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
    const { name, value } = e.target
    setStock((prevState) => ({
      ...prevState,
      [name]: value
    }))
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

  return (
    <>
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
                    {products &&
                      products.map((product) => (
                        <SelectItem key={product.productId} value={product.productId}>
                          {product.productId}
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

      <StockDataTable products={products} />
    </>
  )
}
