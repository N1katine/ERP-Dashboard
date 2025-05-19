import * as React from 'react'
import { useUserStore } from '../../hooks/useUserStore'
import type { User } from '../../types/user'
import Table from '../common/Table'
import ConfirmationModal from '../modals/ConfirmationModal'
import Modal from '../modals/Modal'
import UserForm from '../users/UserForm'
import styles from './Usuarios.module.css'

// Helper component for table rows
const UserTableRow: React.FC<{
  user: User
  onEdit: (user: User) => void
  onDelete: (user: User) => void
  isLast: boolean
}> = ({ user, onEdit, onDelete, isLast }) => {
  // Format role for display
  const formatRole = (role: string) => {
    const roles = {
      admin: 'Administrador',
      manager: 'Gerente',
      user: 'Usuário',
    }
    return roles[role as keyof typeof roles] || role
  }

  return (
    <Table.Row isLast={isLast}>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{formatRole(user.role)}</Table.Cell>
      <Table.Cell isActions>
        <Table.EditButton onClick={() => onEdit(user)}>Editar</Table.EditButton>
        <Table.DeleteButton onClick={() => onDelete(user)}>
          Excluir
        </Table.DeleteButton>
      </Table.Cell>
    </Table.Row>
  )
}

const Usuarios: React.FC = () => {
  const { users, addUser, updateUser, deleteUser } = useUserStore()

  // State for modals
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null)

  // Handlers for user actions
  const handleAddUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    addUser(userData)
    setIsAddModalOpen(false)
  }

  const handleUpdateUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    if (selectedUser) {
      updateUser(selectedUser.id, userData)
      setIsEditModalOpen(false)
      setSelectedUser(null)
    }
  }

  const handleDeleteConfirm = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id)
      setIsDeleteModalOpen(false)
      setSelectedUser(null)
    }
  }

  // Open edit modal with selected user
  const openEditModal = (user: User) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  // Open delete confirmation modal
  const openDeleteModal = (user: User) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gerenciar Usuários</h2>
      <p className={styles.subtitle}>Aqui você pode gerenciar e visualizar seus produtos.</p>
      <div className={styles.addButtonContainer}>
        <button
          className={styles.addButton}
          onClick={() => setIsAddModalOpen(true)}
        >
          Adicionar Usuário
        </button>
      </div>

      {/* Users Table */}
      <div className="mt-6">
        <Table>
          <Table.Head>
            <tr>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Função</Table.HeaderCell>
              <Table.HeaderCell>Ações</Table.HeaderCell>
            </tr>
          </Table.Head>
          <Table.Body>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  Nenhum usuário cadastrado. Clique em "Adicionar Usuário" para
                  começar.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <UserTableRow
                  key={user.id}
                  user={user}
                  onEdit={openEditModal}
                  onDelete={openDeleteModal}
                  isLast={index === users.length - 1}
                />
              ))
            )}
          </Table.Body>
        </Table>
      </div>

      {/* Add User Modal */}
      <Modal
        size="lg"
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Adicionar Novo Usuário"
      >
        <UserForm
          onSubmit={handleAddUser}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit User Modal */}
      {selectedUser && (
        <Modal
          size="lg"
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedUser(null)
          }}
          title="Editar Usuário"
        >
          <UserForm
            user={selectedUser}
            onSubmit={handleUpdateUser}
            onCancel={() => {
              setIsEditModalOpen(false)
              setSelectedUser(null)
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
        message={`Tem certeza que deseja excluir o usuário "${selectedUser?.name}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
      />
    </div>
  )
}

export default Usuarios
