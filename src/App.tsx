import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createContext, useState } from "react"
import { Cart, Product } from "./types"
import { Dashboard } from "./Pages/dashboard"
import { Home } from "./Pages/home"
import { Navbar } from "./components/navbar"
import { stat } from "fs"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/Dashboard",
    element: <Dashboard />
  }
])

type GlobalContextType = {
  state: GlobalState
  handelAddCart: (product: Product) => void
}

type GlobalState = {
  cart: Cart[]
}

export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart: []
  })

  const handelAddCart = (product: Product) => {
    const isDuplicate = state.cart.find((cartItem) => cartItem.id === product.stockId)

    if (isDuplicate) {
      console.log(isDuplicate)
      const updatedCart = state.cart.map((cartItem) => {
        console.log(cartItem)
        if (cartItem.id === isDuplicate.id) {
          console.log("INSIDE")
          return {
            ...cartItem,
            itemQuantity: cartItem.itemQuantity + 1
          }
        }
        return cartItem
      })

      setState({
        ...state,
        cart: updatedCart
      })
      return
    }
    const cartItem: Cart = {
      id: product.stockId,
      name: product.name,
      itemQuantity: 1
    }

    setState({
      ...state,
      cart: [...state.cart, cartItem]
    })
  }
  return (
    <>
      <div className="App">
        <GlobalContext.Provider value={{ state, handelAddCart }}>
          <RouterProvider router={router} />
        </GlobalContext.Provider>
      </div>
    </>
  )
}

export default App
