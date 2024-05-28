export type Product = {
  id: string
  name: string
  categoryId: string
  description: string
  image:string
  stockId:string
  quantity: number
  price:number
  color:string
  size:string
}

export type Cart = Pick<Product, 'id' | 'name' | 'image' | 'price'> & { itemQuantity: number };

export type Category = {
  id: string
  name: string
}
export type User = {
  id: string
  fullName: string,
  email: string,
  countryCode: string,
  phone: string,
  role:string
}
export type Order = {
  addressId: string
  userId: string,
  totalAmount: number,
  orderDate: string,
  paymentId: string
}
export type Stock = {
  
  productId: string
  stockQuantity: number
  price: number
  color: string
  size: string
}
export const ROLE = {
  Admin: "Admin",
  Customer: "Customer"
} as const

export type DecodedUser = {
  aud: string
  emailaddress: string
  exp: number
  iss: string
  name: string
  nameidentifier: string
  role: keyof typeof ROLE
}

export type Address = {
  country: string
  city: string
  streetName: string
  postalCode: number
  zipCode: number
}


