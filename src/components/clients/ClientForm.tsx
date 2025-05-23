import * as React from 'react'
import styles from './ClientForm.module.css'
import type { Client, ClientSegment } from '../../types/client'
import { useProductStore } from '../../hooks/useProductStore'

interface ClientFormProps {
  client?: Client
  onSubmit: (clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void
  onCancel: () => void
}

const ClientForm: React.FC<ClientFormProps> = ({ client, onSubmit, onCancel }) => {
  const { products } = useProductStore()
  const [formData, setFormData] = React.useState({
    name: client?.name || '',
    email: client?.email || '',
    phone: client?.phone || '',
    segment: client?.segment || 'Varejo' as ClientSegment,
    birthDate: client?.birthDate || '',
    value: client?.value || '',
    address: client?.address || '',
    notes: client?.notes || '',
    productId: client?.productId || '',
    quantity: client?.quantity || 1
  })

  const selectedProduct = products.find(p => p.id === formData.productId)
  const unitPrice = selectedProduct ? parseFloat(selectedProduct.price) : 0
  const totalValue = unitPrice * (formData.quantity || 0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      value: totalValue.toString()
    })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.formLabel}>Nome / Empresa</label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.formLabel}>Telefone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="segment" className={styles.formLabel}>Segmento</label>
          <select
            id="segment"
            name="segment"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            value={formData.segment}
            onChange={handleChange}
            required
          >
            <option value="Varejo">Varejo</option>
            <option value="Atacado">Atacado</option>
            <option value="Corporativo">Corporativo</option>
          </select>
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="" className={styles.formLabel}>Data de Nascimento</label>
          <input 
            type="date" 
            id="birthDate"
            name="birthDate"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address" className={styles.formLabel}>Endereço</label>
          <input
            type="text"
            id="address"
            name="address"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="notes" className={styles.formLabel}>Observações:</label>
        <textarea
          id="notes"
          name="notes"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          value={formData.notes}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className={styles.formActions}>
        <button 
          type="button" 
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button type="submit" className={styles.submitButton}>
          {client ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
        </button>
      </div>
    </form>
  )
}

export default ClientForm
