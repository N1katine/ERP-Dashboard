import type { Product } from '../types/product'
import { useLocalStorage } from './useLocalStorage'

export function useProductStore() {
  const [products, setProducts] = useLocalStorage<Product[]>('products', [])

  // Add a new product
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setProducts([...products, newProduct])
    return newProduct
  }

  // Update an existing product
  const updateProduct = (id: string, updatedProduct: Omit<Product, 'id'>) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          ...updatedProduct,
          updatedAt: new Date(),
        }
      }
      return product
    })
    setProducts(updatedProducts)
  }

  // Delete a product
  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter((product) => product.id !== id)
    setProducts(updatedProducts)
  }

  // Get a single product by ID
  const getProduct = (id: string) => {
    return products.find((product) => product.id === id)
  }

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
  }
}
