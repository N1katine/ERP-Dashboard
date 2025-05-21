import * as React from 'react'
import styles from './Vendas.module.css'
import Table from '../common/Table'
import Modal from '../modals/Modal'
import { formatCurrency } from '../../lib/formatters'
import { useSellStore } from '../../hooks/useSellStore'
import { useProductStore } from '../../hooks/useProductStore'
import SellForm from '../sells/SellForm'
import ConfirmationModal from '../modals/ConfirmationModal'
import type { Sell } from '../../types/sell'

// Helper component for table rows
const SellTableRow: React.FC<{
  sell: Sell
  onEdit: (sell: Sell) => void
  onDelete: (sell: Sell) => void
  isLast: boolean
}> = ({ sell, onEdit, onDelete, isLast }) => {
  return (
    <Table.Row isLast={isLast}>
      <Table.Cell>{sell.name}</Table.Cell>
      <Table.Cell>{sell.stock} unidades</Table.Cell>
      <Table.Cell>{formatCurrency(sell.price)}</Table.Cell>
      <Table.Cell>Cliente</Table.Cell>
      <Table.Cell isActions>
        <Table.EditButton onClick={() => onEdit(sell)}>
          Editar
        </Table.EditButton>
        <Table.DeleteButton onClick={() => onDelete(sell)}>
          Excluir
        </Table.DeleteButton>
      </Table.Cell>
    </Table.Row>
  )
}

const Vendas: React.FC = () => {
  const { sells, addSell, updateSell, deleteSell } =
    useSellStore()
  const { products, updateProduct } = useProductStore()

  // State for modals
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [selectedSell, setSelectedSell] = React.useState<Sell | null>(
    null,
  )

  // Handlers for sell actions
  const handleAddSell = (sellData: Omit<Sell, 'id'>) => {
    // Update product stock
    const product = products.find(p => p.id === sellData.productId)
    if (product) {
      const newStock = product.stock - sellData.stock
      updateProduct(product.id, {
        ...product,
        stock: newStock
      })
    }
    
    addSell(sellData)
    setIsAddModalOpen(false)
  }

  const handleUpdateSell = (sellData: Omit<Sell, 'id'>) => {
    if (selectedSell) {
      // Calculate stock difference
      const stockDifference = selectedSell.stock - sellData.stock
      
      // Update product stock
      const product = products.find(p => p.id === sellData.productId)
      if (product) {
        const newStock = product.stock + stockDifference
        updateProduct(product.id, {
          ...product,
          stock: newStock
        })
      }

      updateSell(selectedSell.id, sellData)
      setIsEditModalOpen(false)
      setSelectedSell(null)
    }
  }

  const handleDeleteConfirm = () => {
    if (selectedSell) {
      // Restore product stock
      const product = products.find(p => p.id === selectedSell.productId)
      if (product) {
        const newStock = product.stock + selectedSell.stock
        updateProduct(product.id, {
          ...product,
          stock: newStock
        })
      }

      deleteSell(selectedSell.id)
      setSelectedSell(null)
    }
  }

  // Open edit modal with selected sell
  const openEditModal = (sell: Sell) => {
    setSelectedSell(sell)
    setIsEditModalOpen(true)
  }

  // Open delete confirmation modal
  const openDeleteModal = (sell: Sell) => {
    setSelectedSell(sell)
    setIsDeleteModalOpen(true)
  }

  const metrics = [
    { title: 'Vendas do Mês', value: 'R$ 45.678,00', change: '+15%', trend: 'up' },
    { title: 'Produtos em Estoque', value: '342', change: '-5%', trend: 'down' }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h2 className={styles.title}>Vendas</h2>
        <p className={styles.subtitle}>Aqui você pode gerenciar e visualizar as vendas da empresa.</p>
      </div>

      {/* Metrics Cards */}
      <div className={styles.metricsGrid}>
        {metrics.map((metric, index) => (
          <div key={index} className={styles.metricCard}>
            <h3 className={styles.metricTitle}>{metric.title}</h3>
            <div className={styles.metricValue}>
              <p className={styles.metricNumber}>{metric.value}</p>
              <span className={`${styles.metricChange} ${metric.trend === 'up' ? styles.metricUp : styles.metricDown}`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <div className={styles.addButtonContainer}>
          <button
            className={styles.addButton}
            onClick={() => setIsAddModalOpen(true)}
          >
            Adicionar Venda
          </button>
        </div>

      {/* Sells Table */}
      <div className="mt-6">
        <Table>
          <Table.Head>
            <tr>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>Quantidade</Table.HeaderCell>
              <Table.HeaderCell>Preço</Table.HeaderCell>
              <Table.HeaderCell>Cliente</Table.HeaderCell>
              <Table.HeaderCell>Ações</Table.HeaderCell>
            </tr>
          </Table.Head>
          <Table.Body>
            {sells.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  Nenhuma venda registrada. Clique em "Adicionar Venda" para
                  começar.
                </td>
              </tr>
            ) : (
              sells.map((sell, index) => (
                <SellTableRow
                  key={sell.id}
                  sell={sell}
                  onEdit={openEditModal}
                  onDelete={openDeleteModal}
                  isLast={index === sells.length - 1}
                />
              ))
            )}
          </Table.Body>
        </Table>
      </div>

      {/* Add Sell Modal */}
      <Modal
        isOpen={isAddModalOpen}
        size="lg"
        onClose={() => setIsAddModalOpen(false)}
        title="Adicionar Nova Venda"
      >
        <SellForm
          onSubmit={handleAddSell}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Sell Modal */}
      {selectedSell && (
        <Modal
          size="lg"
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedSell(null)
          }}
          title="Editar Venda"
        >
          <SellForm
            sell={selectedSell}
            onSubmit={handleUpdateSell}
            onCancel={() => {
              setIsEditModalOpen(false)
              setSelectedSell(null)
            }}
          />
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir a venda "${selectedSell?.name}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
      />
    </div>
  )
}

export default Vendas
