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

const cartItems = [
  {
    id: 1,
    name: "Product A",
    quantity: 5
  },
  {
    id: 2,
    name: "Product B",
    quantity: 3
  },
  {
    id: 3,
    name: "Product C",
    quantity: 7
  }
]

export function CartDrawer() {
  const context = React.useContext(GlobalContext)
  if (!context) throw Error("Context is missing")

  const { state } = context

  const [cart, setCart] = React.useState(state.cart)
  if (state.cart.length > cart.length) {
    setCart(state.cart)
  }

  console.log(cart)

  function adjustQuantity(id: string, adjustment: number) {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          itemQuantity: Math.max(1, item.itemQuantity + adjustment)
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
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
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => adjustQuantity(item.id, -1)}
                    disabled={item.itemQuantity <= 1}
                  >
                    <MinusIcon className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <div className="text-lg">{item.name}</div>
                </div>
                <div className="text-lg">{item.itemQuantity}</div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => adjustQuantity(item.id, 1)}
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
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
