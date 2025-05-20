import { useState, type FC, type FormEvent } from 'react'
import {
  formatAsBrazilianCurrency,
} from '../../lib/formatters'
import type { Sell } from '../../types/sell'
import { useProductStore } from '../../hooks/useProductStore'

interface SellFormProps {
  sell?: Sell
  onSubmit: (data: Omit<Sell, 'id'>) => void
  onCancel: () => void
}

const SellForm: FC<SellFormProps> = ({ sell, onSubmit, onCancel }) => {
  const { products } = useProductStore()
  const [quantity, setQuantity] = useState(sell?.stock?.toString() || '')
  const [description, setDescription] = useState(sell?.description || '')
  const [selectedProductId, setSelectedProductId] = useState(sell?.productId || '')

  const selectedProduct = products.find(p => p.id === selectedProductId)
  const maxQuantity = selectedProduct?.stock || 0
  const unitPrice = selectedProduct ? parseFloat(selectedProduct.price) : 0
  const totalPrice = unitPrice * (parseInt(quantity) || 0)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const quantityNum = parseInt(quantity) || 0
    if (quantityNum > maxQuantity) {
      alert('A quantidade não pode ser maior que o estoque disponível')
      return
    }
    onSubmit({
      name: selectedProduct?.name || '',
      price: totalPrice.toString(),
      description,
      stock: quantityNum,
      productId: selectedProductId,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="product"
          className="block text-sm font-medium text-gray-700"
        >
          Produto
        </label>
        <select
          id="product"
          value={selectedProductId}
          onChange={(e) => {
            setSelectedProductId(e.target.value)
            setQuantity('') // Reset quantity when product changes
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          required
        >
          <option value="">Selecione um produto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} (Estoque: {product.stock} - Preço: {formatAsBrazilianCurrency(product.price, true)})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700"
        >
          Quantidade
        </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          max={maxQuantity}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          required
        />
        {selectedProduct && (
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-500">
              Estoque disponível: {maxQuantity} unidades
            </p>
            <p className="text-sm text-gray-500">
              Preço unitário: {formatAsBrazilianCurrency(unitPrice, true)}
            </p>
            <p className="text-sm font-medium text-gray-700">
              Valor total: {formatAsBrazilianCurrency(totalPrice, true)}
            </p>
          </div>
        )}
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
          {sell ? 'Atualizar' : 'Criar'}
        </button>
      </div>
    </form>
  )
}

export default SellForm
