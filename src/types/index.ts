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

export type Cart = Pick<Product, 'id' | 'name'> & {itemQuantity: number}

export type Category = {
  id: string
  name: string
}