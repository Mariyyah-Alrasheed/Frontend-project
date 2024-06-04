import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createContext, useEffect, useState } from "react"
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
import { StockForDashboard } from "./Pages/dashboardComponent/stock"
import { ProductDashboard } from "./Pages/dashboardComponent/product"
import { CustomerDashboard } from "./Pages/dashboardComponent/customer"
import { OrderDashboard } from "./Pages/dashboardComponent/order"
import { Checkout } from "./Pages/checkout"
import { Thankyou } from "./Pages/thankyou"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ProductByCategory } from "./Pages/productByCategory"

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
    path: "/Checkout",
    element: <Checkout />
  },
  {
    path: "/Thankyou",
    element: <Thankyou />
  },
  {
    path: "/Dash2",
    element: <TestDashboard />
  },
  {
    path: "/dash2/stocks",
    element: <StockForDashboard />
  },
  {
    path: "/dash2/users",
    element: <CustomerDashboard />
  },
  {
    path: "/dash2/orders",
    element: <OrderDashboard />
  },
  {
    path: "/dash2/products",
    element: <ProductDashboard />
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
  },
  {
    path: "/productsByCategory/:categoryId",
    element: <ProductByCategory />
  }
])

type GlobalContextType = {
  state: GlobalState
  handelAddCart: (product: Product) => void
  handleStoreUser: (user: DecodedUser) => void
  handleDeleteFromCart: (id: string) => void
  handleRemoveCart: () => void
  handleRemoveUser: () => void
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
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      const decodedUser = JSON.parse(user)
      setState({
        ...state,
        user: decodedUser
      })
    }
  }, [])

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
    toast("Item added to cart")
  }

  const handleStoreUser = (user: DecodedUser) => {
    setState({
      ...state,
      user
    })
  }

  const handleRemoveUser = () => {
    setState({
      ...state,
      user: null
    })
  }

  const handleRemoveCart = () => {
    setState({
      ...state,
      cart: []
    })

    toast("Hello, world!")
  }
  return (
    <>
      <div className="App">
        <GlobalContext.Provider
          value={{
            state,
            handelAddCart,
            handleStoreUser,
            handleDeleteFromCart,
            handleRemoveCart,
            handleRemoveUser
          }}
        >
          <RouterProvider router={router} />
        </GlobalContext.Provider>
      </div>
    </>
  )
}

export default App
