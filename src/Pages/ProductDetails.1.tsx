// import * as React from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import {
//   Carousel,
//   CarouselApi,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious
// } from "@/components/ui/carousel"
// import { Product } from "@/types"
// import { useParams } from "react-router-dom"
// import { useQuery } from "@tanstack/react-query"
// import api from "@/api"

// export function ProductDetails() {
//   const [currentIndex, setCurrentIndex] = React.useState(0)
//   const params = useParams()

//   const [slider, setSlider] = React.useState<CarouselApi>()

//   const params = useParams()
//   React.useEffect(() => {
//     if (!slider) {
//       return
//     }

//     const current = products?.findIndex((product) => product.id === params.productId)
//     if (current !== undefined) {
//       slider.scrollTo(current, true)
//     }
//   }, [slider, params])
//   const getProduct = async () => {
//     try {
//       const res = await api.get(`/products`)
//       //   const res = await api.get(`/products/${params}`)
//       return res.data
//     } catch (error) {
//       console.error(error)
//       return Promise.reject(new Error("Something went wrong"))
//     }
//   }

//   // Queries
//   const {
//     data: products,
//     error,
//     isLoading
//   } = useQuery<Product[]>({
//     queryKey: ["products"],
//     queryFn: getProduct
//   })

//   if (isLoading) {
//     return <p>Loading...</p>
//   }

//   return (
//     <div className="bg-[#112B3C]">
//       <Carousel className="w-full max-w-xs">
//         <CarouselContent>
//           {products
//             ?.filter((product) => product.stockId)
//             .map((product, index) => (
//               <CarouselItem key={index} isVisible={index === currentIndex}>
//                 <Card>
//                   <CardContent className="flex aspect-square items-center justify-center p-6">
//                     <img src={product.image} alt={product.name} />
//                   </CardContent>
//                 </Card>
//               </CarouselItem>
//             ))}
//         </CarouselContent>
//         <CarouselPrevious
//           onClick={() =>
//             setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
//           }
//         />
//         <CarouselNext
//           onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)}
//         />
//       </Carousel>
//     </div>
//   )
// }

// import * as React from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import {
//   Carousel,
//   CarouselApi,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious
// } from "@/components/ui/carousel"
// import { Product } from "@/types"
// import { useParams } from "react-router-dom"
// import { useQuery } from "@tanstack/react-query"
// import api from "@/api"

// export function ProductDetails() {
//   const [currentIndex, setCurrentIndex] = React.useState(0)

//   const [slider, setSlider] = React.useState<CarouselApi>()

//   const params = useParams()

//   const getProduct = async () => {
//     try {
//       const res = await api.get(`/products/`)
//       return res.data
//     } catch (error) {
//       console.error(error)
//       return Promise.reject(new Error("Something went wrong"))
//     }
//   }

//   // Queries
//   const {
//     data: products,
//     error,
//     isLoading
//   } = useQuery<Product>({
//     queryKey: ["product"],
//     queryFn: getProduct
//   })

//   React.useEffect(() => {
//     if (!slider || !products) {
//       return
//     }

//     const current = products.findIndex((product) => product.id === params.productId)
//     if (current !== -1) {
//       slider.scrollTo(current, true)
//     }
//   }, [slider, params.productId, products])

//   if (isLoading) {
//     return <p>Loading...</p>
//   }

//   return (
//     <div className="bg-[#112B3C]">
//       <Carousel className="w-full max-w-xs">
//         <CarouselContent>
//           {products?.map((product, index) => (
//             <CarouselItem key={index}>
//               <Card>
//                 <CardContent className="flex aspect-square items-center justify-center p-6">
//                   <img src={product.image} alt={product.name} />
//                 </CardContent>
//               </Card>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious
//           onClick={() =>
//             setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
//           }
//         />
//         <CarouselNext
//           onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)}
//         />
//       </Carousel>
//     </div>
//   )
// }
