/*
  /products
*/

export interface Product {
  id: string
  price: number
  name: string
  imageUrl: string
}

export interface GetProductResponse extends Product {}

export type ProductRequest = Omit<Product, 'id'>

export interface PostCartRequest {
  product: Product
}

/*
  /orders
*/

export interface OrderDetail extends Product {
  quantity: number
}

export interface Order {
  id: string
  orderDetails: OrderDetail[]
}

export interface GetOrderResponse extends Order {}

export interface PostOrderResponse {
  orderDetails: OrderDetail[]
}

/*
  /carts
*/
export interface GetCartResponse extends OrderDetail {}
