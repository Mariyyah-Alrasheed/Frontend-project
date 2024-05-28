import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Separator } from "@radix-ui/react-select"
import { DeleteIcon } from "lucide-react"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import api from "@/api"
import { getTokenFromStorage } from "@/lib/utils"
import { Address } from "@/types"
import { GlobalContext } from "@/App"
import React from "react"
import { Navbar } from "@/components/navbar"

export function Checkout() {
  const navigate = useNavigate()

  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")

  const { state, handleDeleteFromCart, handleRemoveCart } = context

  const [address, setAddress] = useState({
    country: "",
    city: "",
    streetName: "",
    postalCode: 0,
    zipCode: 0
  })

  //   const getAddressesById = async (addressId: string | undefined) => {
  //     try {
  //       const res = await api.get(`/addresses/${addressId}`)
  //       return res.data
  //     } catch (error) {
  //       console.error(error)
  //       return Promise.reject(new Error("Something went wrong"))
  //     }
  //   }

  //   const { data: addresses } = useQuery<Address[]>({
  //     queryKey: ["addresses", state.user?.nameidentifier],
  //     queryFn: () => getAddressesById(state.user?.nameidentifier)
  //   })

  //   const [selectedAddress, setSelectedAddress] = useState(defaultAddress)

  //   const handleRadioChange = (value: string) => {
  //     console.log("value", value)

  //     setSelectedAddress(value)
  //   }

  //   const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target
  //     setAddress({ ...address, [name]: value })
  //     console.log(name, value)
  //   }
  const postAddress = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.post("/addresss", address, {
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
  const queryClient = useQueryClient()

  //   const handleAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault()
  //     await postAddress()
  //     queryClient.invalidateQueries({ queryKey: ["addresses"] })
  //   }
  //   console.log("ID ADDRESS", selectedAddress)

  //   const postAddress = async () => {
  //     try {
  //       const res = await api.post("/addresss", address)
  //       return res.data
  //     } catch (error) {
  //       return Promise.reject(new Error("Somthing went wrong"))
  //     }
  //   }

  const handelChange = (e) => {
    const { name, value } = e.target
    console.log(e.target.value)

    setAddress({
      ...address,
      [name]: value
    })
  }
  const handelSubmit = async (e) => {
    e.preventDefault()

    await postAddress()
    queryClient.invalidateQueries({ queryKey: ["addresss"] })
  }

  //   const getProducts = async () => {
  //     try {
  //       const res = await api.get("/products")
  //       return res.data
  //     } catch (error) {
  //       console.error(error)
  //       return Promise.reject(new Error("Something went wrong"))
  //     }
  //   }

  //   // Queries
  //   const { data: products, error } = useQuery<Product[]>({
  //     queryKey: ["products"],
  //     queryFn: getProducts
  //   })

  const [cart, setCart] = React.useState(state.cart)
  const [total, setTotal] = React.useState(0)

  type OrderItem = {
    stockId: string
    quantity: number
  }

  // type OrderCheckout = [OrderItem[]]

  // const groups = state.cart.reduce((acc, obj) => {
  //   const key = obj.id
  //   const curGroup = acc[key] ?? []
  //   return { ...acc, [key]: [...curGroup, obj] }
  // }, {} as { [productId: string]: Product[] })

  const checkoutOrder: OrderItem[] = []

  // Object.keys(groups).forEach((key) => {
  //   const products = groups[key]

  //   checkoutOrder.items.push({
  //     quantity: products.length,
  //     productId: key
  //   })
  // })

  // checkoutOrder.items.push({
  //       quantity: products.length,
  //       productId: key
  //     })

  const handleCheckout = async () => {
    try {
      state.cart.map((item) => {
        checkoutOrder.push({
          stockId: item.id,
          quantity: item.itemQuantity
        })
      })
      navigate("/Thankyou")

      const token = localStorage.getItem("token")
      const res = await api.post("/orders/checkout", checkoutOrder, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (res.status === 201) {
        handleRemoveCart()
        navigate("/Thankyou")
      }
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  React.useEffect(() => {
    setCart(state.cart)

    // Calculate total price
    const totalPrice = state.cart.reduce((acc, item) => {
      return acc + item.price * item.itemQuantity
    }, 0)
    setTotal(totalPrice)
  }, [state.cart])
  console.log("state ", state.cart)

  return (
    <>
      <Navbar />

      <div className="   mt-36 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 md:px-6 bg-[#140802]">
        <div className="disabled:flow-root">
          <h1 className="text-4xl font-bold text-[#EFEFEF]">Checkout</h1>
          <p className="text-[#D3BBA6] dark:text-[#D3BBA6]">
            Enter your address to complete your order.
          </p>
        </div>
      </div>
      <div className=" grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 md:px-6 bg-[#140802]">
        <div className="space-y-6">
          <form onSubmit={handelSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#D3BBA6]" htmlFor="streetName">
                  Street Name
                </Label>
                <Input
                  value={address.streetName}
                  onChange={handelChange}
                  name="streetName"
                  className="bg-[#D3BBA6] text-[#140802]"
                  id="streetName"
                  placeholder="123 Main St"
                />
              </div>
              {/* <div className="space-y-2">
                <Label className="text-[#D3BBA6]" htmlFor="apartment">
                  Apartment, suite, etc. (optional)
                </Label>
                <Input
                  className="bg-[#D3BBA6] text-[#140802]"
                  id="apartment"
                  placeholder="Apt 123"
                />
              </div> */}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#D3BBA6]" htmlFor="city">
                  City
                </Label>
                <Input
                  onChange={handelChange}
                  value={address.city}
                  name="city"
                  className="bg-[#D3BBA6] text-[#140802]"
                  id="city"
                  placeholder="San Francisco"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#D3BBA6]" htmlFor="postalCode">
                  Postal Code
                </Label>
                <div>
                  <Input
                    onChange={handelChange}
                    value={address.postalCode}
                    name="postalCode"
                    className="bg-[#D3BBA6] text-[#140802]"
                    id="postalCode"
                    placeholder="California"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#D3BBA6]" htmlFor="zipCode">
                  ZIP Code
                </Label>
                <Input
                  onChange={handelChange}
                  name="zipCode"
                  value={address.zipCode}
                  className="bg-[#D3BBA6] text-[#140802]"
                  id="zipCode"
                  placeholder="94103"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#D3BBA6]" htmlFor="country">
                  Country
                </Label>
                <div>
                  <Input
                    onChange={handelChange}
                    name="country"
                    value={address.country}
                    className="bg-[#D3BBA6] text-[#140802]"
                    id="country"
                    placeholder="United States"
                  />
                </div>
              </div>
            </div>
            <Button
              className="bg-[#D3BBA6] text-[#140802] hover:bg-[#ccab8d] hover:text-[#EFEFEF]"
              size="lg"
            >
              Add address
            </Button>
          </form>
        </div>

        <div className="bg-[#D3BBA6] rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-[#140802]">Order Summary</h2>

          {cart.map((item) => (
            <div key={item.id} className="grid gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img
                    alt={item.name}
                    className="rounded-md"
                    height={64}
                    src={item.image}
                    style={{
                      aspectRatio: "64/64",
                      objectFit: "cover"
                    }}
                    width={64}
                  />
                  <div>
                    <h3 className="font-medium text-[#140802]">{item.name}</h3>
                    {/* <p className="text-[#3c3937] dark:text-[#2f2115]">{item.itemQuantity}</p> */}
                  </div>
                </div>
                <div className="font-medium text-[#140802]">{item.price * item.itemQuantity}$</div>
              </div>
              <div className="">
                <p className="text-[#3c3937] dark:text-[#2f2115]">{item.itemQuantity}</p>

                <Button
                  variant="secondary"
                  className=" w-20"
                  onClick={() => handleDeleteFromCart(item.id)}
                >
                  -
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex justify-between text-2xl items-center font-medium text-[#987563]">
          <Button onClick={handleCheckout}>Checkout</Button>
          <div>Total</div>
          <div> {total}$</div>
        </div>
      </div>

      {/* 

      {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="text-lg">{item.itemQuantity}</div>
                  <img src={item.image} className="w-8" alt={item.name} />
                  <div className="text-lg">{item.name}</div>
                </div>
                <div className="text-lg m-3">{item.price * item.itemQuantity}$</div>
                <div className="text-lg">
                  <Button variant="destructive" onClick={() => handleDeleteFromCart(item.id)}>
                    -
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <DrawerFooter>
            <div className="flex justify-between w-full">
              <div className="text-lg font-semibold">Total: {total}$</div>
              <div>
                <Button onClick={handleCheckout}>Checkout</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </div>
            </div>
          </DrawerFooter>
 */}

      <footer className="bg-[#140802] text-[#EFEFEF] py-6 px-4 md:px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p className="text-sm">© 2023 Acme Inc. All rights reserved.</p>
          <nav className="flex items-center space-x-4">
            <Link className="text-sm hover:underline" to="#">
              Privacy Policy
            </Link>
            <Link className="text-sm hover:underline" to="#">
              Terms of Service
            </Link>
            <Link className="text-sm hover:underline" to="#">
              Contact Us
            </Link>
          </nav>
        </div>
      </footer>
    </>
  )
}
