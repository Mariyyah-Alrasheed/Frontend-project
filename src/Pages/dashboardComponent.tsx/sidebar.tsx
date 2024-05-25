// import { Link } from "react-router-dom"
// import {
//   ChevronLeft,
//   Home,
//   LineChart,
//   Package,
//   Package2,
//   PanelLeft,
//   PlusCircle,
//   Search,
//   Settings,
//   ShoppingCart,
//   Upload,
//   Users2
// } from "lucide-react"
// import { Badge } from "../components/ui/badge"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator
// } from "@/components/ui/breadcrumb"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle
// } from "@/components/ui/card"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from "@/components/ui/select"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from "@/components/ui/table"
// import { Textarea } from "@/components/ui/textarea"
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
// import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
// import React, { useState } from "react"
// import api from "@/api"
// import { ProductDataTable } from "@/components/productDataTable"
// import { Navbar } from "@/components/navbar"
// import { Category, Product, Stock, User } from "@/types"
// import { useQuery, useQueryClient } from "@tanstack/react-query"

// export function Sidbar(){
//     return(  <TooltipProvider>
//         <div className="flex min-h-screen w-full flex-col bg-muted/40">
//           <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
//             <nav className="flex flex-col items-center gap-4 px-2 py-4">
//               <Link
//                 to={""}
//                 className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
//               >
//                 <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
//                 <span className="sr-only">Acme Inc</span>
//               </Link>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Link
//                     to={""}
//                     className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
//                   >
//                     <Home className="h-5 w-5" />
//                     <span className="sr-only">Dashboard</span>
//                   </Link>
//                 </TooltipTrigger>
//                 <TooltipContent side="right">Dashboard</TooltipContent>
//               </Tooltip>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Link
//                     to={""}
//                     className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
//                   >
//                     <ShoppingCart className="h-5 w-5" />
//                     <span className="sr-only">Orders</span>
//                   </Link>
//                 </TooltipTrigger>
//                 <TooltipContent side="right">Orders</TooltipContent>
//               </Tooltip>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Link
//                     to={""}
//                     className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foregroundmd:h-8 md:w-8"
//                   >
//                     <Package className="h-5 w-5" />
//                     <span className="sr-only">Products</span>
//                   </Link>
//                 </TooltipTrigger>
//                 <TooltipContent side="right">Products</TooltipContent>
//               </Tooltip>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Link
//                     to={""}
//                     className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
//                   >
//                     <Users2 className="h-5 w-5" />
//                     <span className="sr-only">Customers</span>
//                   </Link>
//                 </TooltipTrigger>
//                 <TooltipContent side="right">Customers</TooltipContent>
//               </Tooltip>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Link
//                     to={""}
//                     className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
//                   >
//                     <LineChart className="h-5 w-5" />
//                     <span className="sr-only">Analytics</span>
//                   </Link>
//                 </TooltipTrigger>
//                 <TooltipContent side="right">Analytics</TooltipContent>
//               </Tooltip>
//             </nav>
//             <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Link
//                     to={""}
//                     className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
//                   >
//                     <Settings className="h-5 w-5" />
//                     <span className="sr-only">Settings</span>
//                   </Link>
//                 </TooltipTrigger>
//                 <TooltipContent side="right">Settings</TooltipContent>
//               </Tooltip>
//             </nav>
//           </aside>
//           <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
//             <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button size="icon" variant="outline" className="sm:hidden">
//                     <PanelLeft className="h-5 w-5" />
//                     <span className="sr-only">Toggle Menu</span>
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="left" className="sm:max-w-xs">
//                   <nav className="grid gap-6 text-lg font-medium">
//                     <Link
//                       to={""}
//                       className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
//                     >
//                       <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
//                       <span className="sr-only">Acme Inc</span>
//                     </Link>
//                     <Link
//                       to={""}
//                       className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//                     >
//                       <Home className="h-5 w-5" />
//                       Dashboard
//                     </Link>
//                     <Link
//                       to={""}
//                       className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//                     >
//                       <ShoppingCart className="h-5 w-5" />
//                       Orders
//                     </Link>
//                     <Link to={""} className="flex items-center gap-4 px-2.5 text-foreground">
//                       <Package className="h-5 w-5" />
//                       Products
//                     </Link>
//                     <Link
//                       to={""}
//                       className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//                     >
//                       <Users2 className="h-5 w-5" />
//                       Customers
//                     </Link>
//                     <Link
//                       to={""}
//                       className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//                     >
//                       <LineChart className="h-5 w-5" />
//                       Settings
//                     </Link>
//                   </nav>
//                 </SheetContent>
//               </Sheet>
//               <Breadcrumb className="hidden md:flex">
//                 <BreadcrumbList>
//                   <BreadcrumbItem>
//                     <BreadcrumbLink asChild>
//                       <Link to={""}>Dashboard</Link>
//                     </BreadcrumbLink>
//                   </BreadcrumbItem>
//                   <BreadcrumbSeparator />
//                   <BreadcrumbItem>
//                     <BreadcrumbLink asChild>
//                       <Link to={""}>Products</Link>
//                     </BreadcrumbLink>
//                   </BreadcrumbItem>
//                   <BreadcrumbSeparator />
//                   <BreadcrumbItem>
//                     <BreadcrumbPage>Edit Product</BreadcrumbPage>
//                   </BreadcrumbItem>
//                 </BreadcrumbList>
//               </Breadcrumb>
//               <div className="relative ml-auto flex-1 md:grow-0">
//                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   className="h-9 w-full pl-9 md:w-64 lg:w-96"
//                   type="search"
//                   placeholder="Search products..."
//                 />
//               </div>
//             </header>
//             <div className="container flex-1">
//               <div className="grid items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Create Product</CardTitle>
//                     <CardDescription>Deploy your new project in one-click.</CardDescription>
//                   </CardHeader>
//                   <CardContent className="grid gap-4">
//                     <form onSubmit={handelSubmit}>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="grid gap-2">
//                           <Label htmlFor="title">Title</Label>
//                           <Input
//                             id="title"
//                             name="name"
//                             placeholder="Name"
//                             value={product.name}
//                             onChange={handelChange}
//                           />
//                         </div>
//                         <div className="grid gap-2">
//                           <Label htmlFor="image">Image</Label>
//                           <Input
//                             id="image"
//                             name="image"
//                             placeholder="Image"
//                             value={product.image}
//                             onChange={handelChange}
//                           />
//                         </div>
//                       </div>
//                       <div className="grid gap-2">
//                         <Label htmlFor="description">Description</Label>
//                         <Textarea
//                           id="description"
//                           name="description"
//                           placeholder="Description of your product"
//                           value={product.description}
//                           onChange={handelChange}
//                         />
//                       </div>
//                       <div className="grid gap-2">
//                         <Label htmlFor="category">Category</Label>

//                         <Select onValueChange={handelSelect}>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select a category" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {categories &&
//                               categories.map((category) => (
//                                 <SelectItem key={category.id} value={category.id}>
//                                   {category.name}
//                                 </SelectItem>
//                               ))}
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <div className="grid grid-cols-2 gap-4"></div>
//                       <Button type="submit" className="ml-auto">
//                         Create
//                       </Button>
//                     </form>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </div>
//       </TooltipProvider>)
// }
