import * as React from 'react'
import { useProductStore } from '../../hooks/useProductStore'
import { formatCurrency } from '../../lib/formatters'
import type { Product } from '../../types/product'
import Table from '../common/Table'
import ConfirmationModal from '../modals/ConfirmationModal'
import Modal from '../modals/Modal'
import ProductForm from '../products/ProductForm'
import styles from './Produtos.module.css'

// Helper component for table rows
const ProductTableRow: React.FC<{
  product: Product
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
  isLast: boolean
}> = ({ product, onEdit, onDelete, isLast }) => {
  return (
    <Table.Row isLast={isLast}>
      <Table.Cell>{product.name}</Table.Cell>
      <Table.Cell>{formatCurrency(product.price)}</Table.Cell>
      <Table.Cell>{product.stock}</Table.Cell>
      <Table.Cell isActions>
        <Table.EditButton onClick={() => onEdit(product)}>
          Editar
        </Table.EditButton>
        <Table.DeleteButton onClick={() => onDelete(product)}>
          Excluir
        </Table.DeleteButton>
      </Table.Cell>
    </Table.Row>
  )
}

const Produtos: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } =
    useProductStore()

  // State for modals
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null,
  )

  // Handlers for product actions
  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    addProduct(productData)
    setIsAddModalOpen(false)
  }

  const handleUpdateProduct = (productData: Omit<Product, 'id'>) => {
    if (selectedProduct) {
      updateProduct(selectedProduct.id, productData)
      setIsEditModalOpen(false)
      setSelectedProduct(null)
    }
  }

  const handleDeleteConfirm = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct.id)
      setSelectedProduct(null)
    }
  }

  // Open edit modal with selected product
  const openEditModal = (product: Product) => {
    setSelectedProduct(product)
    setIsEditModalOpen(true)
  }

  // Open delete confirmation modal
  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product)
    setIsDeleteModalOpen(true)
  }

  const metrics = [
    {
      title: 'Produtos em Estoque',
      value: products.length,
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h2 className={styles.title}>Gerenciar Produtos</h2>
        <p className={styles.subtitle}>
          Aqui você pode gerenciar e visualizar seus produtos.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className={styles.metricsGrid}>
        {metrics.map((metric, index) => (
          <div key={index} className={styles.metricCard}>
            <h3 className={styles.metricTitle}>{metric.title}</h3>
            <div className={styles.metricValue}>
              <p className={styles.metricNumber}>{metric.value}</p>
              <span
                className={`${styles.metricChange} ${metric.trend === 'up' ? styles.metricUp : styles.metricDown}`}
              >
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.addButtonContainer}>
        <button
          className={styles.addButton}
          onClick={() => setIsAddModalOpen(true)}
        >
          Adicionar Produto
        </button>
      </div>

      {/* Products Table */}
      <div className="mt-6">
        <Table>
          <Table.Head>
            <tr>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>Preço</Table.HeaderCell>
              <Table.HeaderCell>Estoque</Table.HeaderCell>
              <Table.HeaderCell>Ações</Table.HeaderCell>
            </tr>
          </Table.Head>
          <Table.Body>
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  Nenhum produto cadastrado. Clique em "Adicionar Produto" para
                  começar.
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <ProductTableRow
                  key={product.id}
                  product={product}
                  onEdit={openEditModal}
                  onDelete={openDeleteModal}
                  isLast={index === products.length - 1}
                />
              ))
            )}
          </Table.Body>
        </Table>
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        size="lg"
        onClose={() => setIsAddModalOpen(false)}
        title="Adicionar Novo Produto"
      >
        <ProductForm
          onSubmit={handleAddProduct}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Product Modal */}
      {selectedProduct && (
        <Modal
          size="lg"
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedProduct(null)
          }}
          title="Editar Produto"
        >
          <ProductForm
            product={selectedProduct}
            onSubmit={handleUpdateProduct}
            onCancel={() => {
              setIsEditModalOpen(false)
              setSelectedProduct(null)
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
        message={`Tem certeza que deseja excluir o produto "${selectedProduct?.name}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
      />
    </div>
  )
}

export default Produtos
