import * as React from "react"
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"
import { GlobalContext } from "@/App"
import { it } from "node:test"

export function CartDrawer() {
  const context = React.useContext(GlobalContext)
  if (!context) throw Error("Context is missing")

  const { state, handleDeleteFromCart } = context

  const [cart, setCart] = React.useState(state.cart)

  React.useEffect(() => {
    setCart(state.cart)
  }, [state.cart])

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Shopping Cart</DrawerTitle>
            <DrawerDescription>Your items</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="text-lg">{item.itemQuantity}</div>

                  <img src={item.image} className=" w-8"></img>

                  <div className="text-lg">{item.name}</div>
                </div>{" "}
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
            <Button>Checkout</Button>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
