export interface Sell {
    id: string
    name: string
    price: string
    description: string
    stock: number
    productId: string
    clientId?: string
    createdAt?: Date
    updatedAt?: Date
  }
  