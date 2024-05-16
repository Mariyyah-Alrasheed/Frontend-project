import api from "@/api"
import { DataTableDemo } from "@/components/DataTable"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Category, Product, ProductWithCat } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { promises } from "dns"
import { useState } from "react"

export function Dashboard() {
  const queryClient = useQueryClient()

  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    image: "",
    description: ""
  })

  const postProducts = async () => {
    try {
      const res = await api.post("/products", product)
      return res.data
    } catch (error) {
      return Promise.reject(new Error("Somthing went wrong"))
    }
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

    await postProducts()
    queryClient.invalidateQueries({ queryKey: ["products"] })
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
      <Navbar />
      <form className="mt-20 w-3/4 md:w-1/2 mx-auto" onSubmit={handelSubmit}>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add new product</h3>
        <Input
          className=" mt-4"
          name="categoryId"
          type="text"
          placeholder="Category Id"
          onChange={handelChange}
        />
        <Input
          className=" mt-4"
          name="name"
          type="text"
          placeholder="Name"
          onChange={handelChange}
        />

        <Input
          className=" mt-4"
          name="image"
          type="text"
          placeholder="Image "
          onChange={handelChange}
        />
        <Input
          className=" mt-4"
          name="description"
          type="text"
          placeholder="Product description"
          onChange={handelChange}
        />
        <div className="flex flex-col hover:text-teal-950 decoration-teal-950">
          <Button type="reset" className="mt-4 mr-auto" variant="outline">
            Reset
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>

      <DataTableDemo products={productWithCat} />
    </>
  )
}
