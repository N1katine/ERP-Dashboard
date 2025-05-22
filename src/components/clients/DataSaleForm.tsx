import * as React from 'react'
import styles from './DataSaleForm.module.css'
import type { Client } from '../../types/client'

export interface DataSaleFormData {
  clientId: string
  dataType: 'basic' | 'advanced' | 'complete'
  purpose: string
  duration: string
  price: string
  consentGiven: boolean
  termsAccepted: boolean
}

interface DataSaleFormProps {
  initialClientId?: string
  clients: Client[]
  onSubmit: (data: DataSaleFormData) => void
  onCancel: () => void
}

const DataSaleForm: React.FC<DataSaleFormProps> = ({ 
  initialClientId = '', 
  clients, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = React.useState<DataSaleFormData>({
    clientId: initialClientId,
    dataType: 'basic',
    purpose: '',
    duration: '6',
    price: '',
    consentGiven: false,
    termsAccepted: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="clientId" className={styles.formLabel}>Cliente</label>
        <select
          id="clientId"
          name="clientId"
           className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          value={formData.clientId}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um cliente</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="dataType" className={styles.formLabel}>Tipo de Dados</label>
        <select
          id="dataType"
          name="dataType"
           className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          value={formData.dataType}
          onChange={handleChange}
          required
        >
          <option value="basic">Dados Básicos (Nome, Email, Telefone)</option>
          <option value="advanced">Dados Avançados (Inclui Histórico de Compras)</option>
          <option value="complete">Dados Completos (Inclui Comportamento e Preferências)</option>
        </select>
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
          Confirmar
        </button>
      </div>
    </form>
  )
}

export default DataSaleForm
