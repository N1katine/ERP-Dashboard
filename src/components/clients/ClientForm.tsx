import * as React from 'react'
import styles from './ClientForm.module.css'
import type { Client, ClientSegment } from '../../types/client'

interface ClientFormProps {
  client?: Client
  onSubmit: (clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void
  onCancel: () => void
}

const ClientForm: React.FC<ClientFormProps> = ({ client, onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState({
    name: client?.name || '',
    email: client?.email || '',
    phone: client?.phone || '',
    segment: client?.segment || 'retail' as ClientSegment,
    lastPurchase: client?.lastPurchase || '',
    value: client?.value || '',
    address: client?.address || '',
    notes: client?.notes || ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
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
            className={styles.formInput}
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
            className={styles.formInput}
            value={formData.email}
            onChange={handleChange}
            required
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
            className={styles.formInput}
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="segment" className={styles.formLabel}>Segmento</label>
          <select
            id="segment"
            name="segment"
            className={styles.formSelect}
            value={formData.segment}
            onChange={handleChange}
            required
          >
            <option value="retail">Varejo</option>
            <option value="wholesale">Atacado</option>
            <option value="corporate">Corporativo</option>
          </select>
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="lastPurchase" className={styles.formLabel}>Última Compra</label>
          <input
            type="text"
            id="lastPurchase"
            name="lastPurchase"
            className={styles.formInput}
            value={formData.lastPurchase}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="value" className={styles.formLabel}>Valor</label>
          <input
            type="text"
            id="value"
            name="value"
            className={styles.formInput}
            value={formData.value}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="address" className={styles.formLabel}>Endereço</label>
        <input
          type="text"
          id="address"
          name="address"
          className={styles.formInput}
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="notes" className={styles.formLabel}>Observações</label>
        <textarea
          id="notes"
          name="notes"
          className={styles.formTextarea}
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
