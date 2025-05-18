import { useState, type FC, type FormEvent } from 'react'
import {
  extractNumericValueFromCurrency,
  formatAsBrazilianCurrency,
} from '../../lib/formatters'
import type { Product } from '../../types/product'

interface ProductFormProps {
  product?: Product
  onSubmit: (data: Omit<Product, 'id'>) => void
  onCancel: () => void
}

const ProductForm: FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const [name, setName] = useState(product?.name || '')
  // Format the initial price value if a product is provided
  // Use isDecimal=true when formatting the product.price from localStorage
  const [price, setPrice] = useState(
    product?.price ? formatAsBrazilianCurrency(product.price, true) : '',
  )
  const [description, setDescription] = useState(product?.description || '')
  const [stock, setStock] = useState(product?.stock?.toString() || '')

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // When user is typing, use default isDecimal=false
    const formattedValue = formatAsBrazilianCurrency(e.target.value)
    setPrice(formattedValue)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({
      name,
      price: extractNumericValueFromCurrency(price),
      description,
      stock: parseInt(stock) || 0,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nome do Produto
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Preço (R$)
        </label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={handlePriceChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="stock"
          className="block text-sm font-medium text-gray-700"
        >
          Estoque
        </label>
        <input
          type="number"
          id="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Descrição
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700"
        >
          {product ? 'Atualizar' : 'Criar'}
        </button>
      </div>
    </form>
  )
}

export default ProductForm
