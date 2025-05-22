import * as React from 'react'
import styles from './Clientes.module.css'
import Table from '../common/Table'
import Modal from '../modals/Modal'
import ConfirmationModal from '../modals/ConfirmationModal'
import { useClientStore } from '../../hooks/useClientStore'
import ClientForm from '../clients/ClientForm'
import DataSaleForm from '../clients/DataSaleForm'
import ClientTableRow from '../clients/ClientTableRow'
import Card from '../ui/Card'
import type { Client } from '../../types/client'
import type { DataSaleFormData } from '../clients/DataSaleForm'
import { 
  UserPlusIcon, 
  MagnifyingGlassIcon, 
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline'
import Icon from '../common/Icon'

const Clientes: React.FC = () => {
  const { clients, addClient, updateClient, deleteClient, getClientSegments } = useClientStore()
  const clientSegments = getClientSegments()

  // State for search
  const [searchTerm, setSearchTerm] = React.useState('')

  // State for modals
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [isDataSaleModalOpen, setIsDataSaleModalOpen] = React.useState(false)
  const [selectedClient, setSelectedClient] = React.useState<Client | null>(null)
  const [selectedClientId, setSelectedClientId] = React.useState<string | null>(null)
  const [expandedClientId, setExpandedClientId] = React.useState<string | null>(null)

  // Sample data for metrics and interactions
  const metrics = [
    { title: 'Total de Clientes', value: clients.length.toString() },
    { title: 'Novos Clientes', value: '24', change: '+8%', trend: 'up' },
    { title: 'Clientes Ativos', value: '65', change: '+5%', trend: 'up' },
    { title: 'Valor Médio', value: 'R$ 1.250', change: '+12%', trend: 'up' }
  ]

  const recentInteractions = [
    { id: 1, client: 'Empresa ABC Ltda', type: 'Venda', date: '15/04/2025', details: 'Pedido #12345 - R$ 12.500' },
    { id: 2, client: 'Comércio XYZ', type: 'Suporte', date: '12/04/2025', details: 'Chamado #5678 - Dúvida sobre produto' },
    { id: 3, client: 'Distribuidora 123', type: 'Reunião', date: '08/04/2025', details: 'Apresentação de novos produtos' }
  ]

  // Filter clients based on search term
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  )

  // Handlers for client actions
  const handleAddClient = (clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    addClient(clientData)
    setIsAddModalOpen(false)
  }

  const handleUpdateClient = (clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedClient) {
      updateClient(selectedClient.id, clientData)
      setIsEditModalOpen(false)
      setSelectedClient(null)
    }
  }

  const handleDeleteConfirm = () => {
    if (selectedClient) {
      deleteClient(selectedClient.id)
      setIsDeleteModalOpen(false)
      setSelectedClient(null)
      if (expandedClientId === selectedClient.id) {
        setExpandedClientId(null)
      }
    }
  }

  const handleDataSaleSubmit = (data: DataSaleFormData) => {
    console.log('Data sale submitted:', data)
    alert('Formulário enviado com sucesso!')
    setIsDataSaleModalOpen(false)
    setSelectedClientId(null)
  }

  // Open edit modal with selected client
  const openEditModal = (client: Client) => {
    setSelectedClient(client)
    setIsEditModalOpen(true)
  }

  // Open delete confirmation modal
  const openDeleteModal = (client: Client) => {
    setSelectedClient(client)
    setIsDeleteModalOpen(true)
  }

  // Open data sale modal
  const openDataSaleModal = (clientId: string) => {
    setSelectedClientId(clientId)
    setIsDataSaleModalOpen(true)
  }

  // Toggle client details view
  const toggleClientDetails = (clientId: string) => {
    setExpandedClientId(expandedClientId === clientId ? null : clientId)
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h2 className={styles.title}>Clientes</h2>
        <p className={styles.subtitle}>Aqui você pode gerenciar e visualizar seus clientes.</p>
      </div>

      {/* Metrics Cards */}
      <div className={styles.metricsGrid}>
        {metrics.map((metric, index) => (
          <div key={index} className={styles.metricCard}>
            <h3 className={styles.metricTitle}>{metric.title}</h3>
            <div className={styles.metricValue}>
              <p className={styles.metricNumber}>{metric.value}</p>
              {metric.change && (
                <span className={`${styles.metricChange} ${metric.trend === 'up' ? styles.metricUp : styles.metricDown}`}>
                  {metric.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <div className={styles.actionButtons}>
        <button 
          className={`${styles.actionButton} ${styles.primaryButton}`}
          onClick={() => setIsAddModalOpen(true)}
        >
          <UserPlusIcon className={styles.buttonIcon} />
          <span>Adicionar Cliente</span>
        </button>
        <button 
          className={`${styles.actionButton} ${styles.secondaryButton}`}
          onClick={() => setIsDataSaleModalOpen(true)}
        >
          <ArrowDownTrayIcon className={styles.buttonIcon} />
          <span>Baixar Dados</span>
        </button>
      </div>

      <div className={styles.contentGrid}>
        {/* Client List Section */}
        <div className={styles.clientListSection}>
          <div className={styles.listHeader}>
            <h3 className={styles.sectionTitle}>Lista de Clientes</h3>
            <div className={styles.searchContainer}>
              <div className={styles.searchInputWrapper}>
                <Icon icon={MagnifyingGlassIcon} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Buscar cliente..."
                  className={styles.searchInput}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>

          {/* Clients Table */}
          <Table>
            <Table.Head>
              <tr>
                <Table.HeaderCell>Nome</Table.HeaderCell>
                <Table.HeaderCell>Segmento</Table.HeaderCell>
                <Table.HeaderCell>Data</Table.HeaderCell>
                <Table.HeaderCell>Produto</Table.HeaderCell>
                <Table.HeaderCell>Quantidade</Table.HeaderCell>
                <Table.HeaderCell>Valor</Table.HeaderCell>
                <Table.HeaderCell>Ações</Table.HeaderCell>
              </tr>
            </Table.Head>
            <Table.Body>
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    {searchTerm ? `Nenhum cliente encontrado com o termo "${searchTerm}"` : 'Nenhum cliente cadastrado.'}
                  </td>
                </tr>
              ) : (
                filteredClients.map((client, index) => {
                  const segmentName = clientSegments.find(seg => seg.id === client.segment)?.name || client.segment;
                  return (
                    <ClientTableRow
                      key={client.id}
                      client={client}
                      onEdit={openEditModal}
                      onDelete={openDeleteModal}
                      onDataSale={openDataSaleModal}
                      isLast={index === filteredClients.length - 1}
                      isSelected={expandedClientId === client.id}
                      onToggleDetails={() => toggleClientDetails(client.id)}
                      clientSegmentName={segmentName}
                    />
                  );
                })
              )}
            </Table.Body>
          </Table>
        </div>

        {/* Client Segments and Recent Interactions */}
        <div className={styles.sidebarContainer}>
          {/* Client Segments */}
          <Card className={styles.segmentsSection}>
            <Card.Header>
              <h3 className={styles.sectionTitle}>Segmentos de Clientes</h3>
            </Card.Header>
            <Card.Body>
              <div className={styles.segmentsList}>
                {clientSegments.map(segment => (
                  <div key={segment.id} className={styles.segmentItem}>
                    <div className={styles.segmentInfo}>
                      <span className={`${styles.segmentBadge} ${styles[`segment${segment.id.charAt(0).toUpperCase() + segment.id.slice(1)}`]}`}>
                        {segment.name}
                      </span>
                      <span className={styles.segmentCount}>{segment.count} clientes</span>
                    </div>
                    <div className={styles.segmentBar}>
                      <div 
                        className={`${styles.segmentProgress} ${styles[`progress${segment.id.charAt(0).toUpperCase() + segment.id.slice(1)}`]}`}
                        style={{ width: `${(segment.count / clients.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>

          {/* Recent Interactions */}
          <Card className={styles.interactionsSection}>
            <Card.Header>
              <h3 className={styles.sectionTitle}>Interações Recentes</h3>
            </Card.Header>
            <Card.Body>
              <ul className={styles.interactionsList}>
                {recentInteractions.map(interaction => (
                  <li key={interaction.id} className={styles.interactionItem}>
                    <div className={styles.interactionContent}>
                      <span className={styles.interactionClient}>{interaction.client}</span>
                      <span className={styles.interactionType}>{interaction.type}</span>
                      <span className={styles.interactionDetail}>{interaction.details}</span>
                      <span className={styles.interactionDate}>{interaction.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Card.Body>
            <Card.Footer className={styles.viewMoreFooter}>
              <button className={styles.viewMoreLink}>
                Ver Todas as Interações
              </button>
            </Card.Footer>
          </Card>
        </div>
      </div>

      {/* Add Client Modal */}
      <Modal
        isOpen={isAddModalOpen}
        size="lg"
        onClose={() => setIsAddModalOpen(false)}
        title="Adicionar Novo Cliente"
      >
        <ClientForm
          onSubmit={handleAddClient}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Client Modal */}
      {selectedClient && (
        <Modal
          size="lg"
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedClient(null)
          }}
          title="Editar Cliente"
        >
          <ClientForm
            client={selectedClient}
            onSubmit={handleUpdateClient}
            onCancel={() => {
              setIsEditModalOpen(false)
              setSelectedClient(null)
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
        message={`Tem certeza que deseja excluir o cliente "${selectedClient?.name}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
        
      />

      {/* Data Sale Modal */}
      <Modal
        isOpen={isDataSaleModalOpen}
        size="lg"
        onClose={() => {
          setIsDataSaleModalOpen(false)
          setSelectedClientId(null)
        }}
        title="Formulário de Dados"
      >
        <DataSaleForm
          initialClientId={selectedClientId || ''}
          clients={clients}
          onSubmit={handleDataSaleSubmit}
          onCancel={() => {
            setIsDataSaleModalOpen(false)
            setSelectedClientId(null)
          }}
        />
      </Modal>
    </div>
  )
}

export default Clientes
