import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createContext, useState } from "react"
import { Cart, DecodedUser, Product } from "./types"
import { Dashboard } from "./Pages/dashboard"
import { Home } from "./Pages/home"
import { Navbar } from "./components/navbar"
import { QueryClient, QueryClientProvider } from "react-query"
import { Login } from "./Pages/login"
import { Signup } from "./Pages/signup"
import { PrivateRoute } from "./components/privateRoute"
import { TestDashboard } from "./Pages/testDashboard"
import { ProductDataTable } from "./components/productDataTable"
import { UserDataTable } from "./components/userDataTable"
import { ProductDetails } from "./Pages/productDetails"

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: "/SignUp",
    element: <Signup />
  },
  {
    path: "/Dash2",
    element: <TestDashboard />
    // children: [
    //   {
    //     path: "/Dash2/products",
    //     element: <ProductDataTable /> // Make sure to pass the `products` prop correctly
    //   },
    //   {
    //     path: "/Dash2/customers",
    //     element: <UserDataTable users /> // Make sure to pass the `products` prop correctly
    //   }
    // ]
  },
  {
    path: "/Dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    )
  },
  {
    path: "/products/:productId",
    element: <ProductDetails />
  }
])

type GlobalContextType = {
  state: GlobalState
  handelAddCart: (product: Product) => void
  handleStoreUser: (user: DecodedUser) => void
  handleDeleteFromCart: (id: string) => void
}

type GlobalState = {
  cart: Cart[]
  user: DecodedUser | null
}

export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart: [],
    user: null
  })

  const handleDeleteFromCart = (id) => {
    const updatedCart = state.cart
      .map((item) => {
        if (item.id === id) {
          if (item.itemQuantity > 0) {
            return { ...item, itemQuantity: item.itemQuantity - 1 }
          }
          // If item quantity is 1, it will be filtered out in the next step
        }
        return item
      })
      .filter((item) => item.itemQuantity > 0)

    setState({
      ...state,
      cart: updatedCart
    })
  }

  const handelAddCart = (product: Product) => {
    const isDuplicate = state.cart.find((cartItem) => cartItem.id === product.stockId)

    if (isDuplicate) {
      const updatedCart = state.cart.map((cartItem) => {
        if (cartItem.id === isDuplicate.id) {
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
      itemQuantity: 1,
      image: product.image,
      price: product.price
    }

    setState({
      ...state,
      cart: [...state.cart, cartItem]
    })
  }

  const handleStoreUser = (user: DecodedUser) => {
    setState({
      ...state,
      user
    })
  }
  return (
    <>
      <div className="App">
        <GlobalContext.Provider
          value={{ state, handelAddCart, handleStoreUser, handleDeleteFromCart }}
        >
          <RouterProvider router={router} />
        </GlobalContext.Provider>
      </div>
    </>
  )
}

export default App
