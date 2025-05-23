import * as React from 'react'
import styles from './ClientTableRow.module.css'
import Table from '../common/Table'
import { 
  ArrowDownTrayIcon,
  ChartBarIcon,
  DocumentTextIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  TagIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'
import Icon from '../common/Icon'
import type { Client } from '../../types/client'
import { formatDateToBrazilian } from '../../utils'
import { useSellStore } from '../../hooks/useSellStore'
import { formatCurrency } from '../../lib/formatters'

interface ClientTableRowProps {
  client: Client
  onEdit: (client: Client) => void
  onDelete: (client: Client) => void
  onDataSale: (clientId: string) => void
  isLast: boolean
  isSelected: boolean
  onToggleDetails: () => void
  clientSegmentName: string
}

const ClientTableRow: React.FC<ClientTableRowProps> = ({ 
  client, 
  onEdit, 
  onDelete, 
  onDataSale,
  isLast,
  isSelected,
  onToggleDetails,
  clientSegmentName
}) => {
  const { sells } = useSellStore()
  
  // Calculate total value of sales for this client
  const totalValue = sells
    .filter(sell => sell.clientId === client.id)
    .reduce((sum, sell) => sum + parseFloat(sell.price), 0)

  return (
    <React.Fragment>
      <Table.Row 
        isLast={isLast} 
        isSelected={isSelected}
        onClick={onToggleDetails}
      >
        <Table.Cell>{client.name}</Table.Cell>
        <Table.Cell>
          <span className={`${styles.segmentBadge} ${styles[`segment${client.segment.charAt(0).toUpperCase() + client.segment.slice(1)}`]}`}>
            {clientSegmentName}
          </span>
        </Table.Cell>
        <Table.Cell>{formatCurrency(totalValue)}</Table.Cell>
        <Table.Cell isActions>
          <Table.ActionButton 
            onClick={(e) => {
              e.stopPropagation();
              onToggleDetails();
            }}
          >
            {isSelected ? 'Ocultar' : 'Detalhes'}
          </Table.ActionButton>
        </Table.Cell>
      </Table.Row>
      
      {isSelected && (
        <tr className={styles.detailsRow}>
          <td colSpan={5}>
            <div className={styles.clientDetails}>
              <div className={styles.detailsGrid}>
                {client.email && (
                  <div className={styles.detailItem}>
                    <Icon icon={DocumentTextIcon} className={styles.detailIcon} />
                    <div>
                      <span className={styles.detailLabel}>Email</span>
                      <span className={styles.detailValue}>{client.email}</span>
                    </div>
                  </div>
                )}
                {client.phone && (
                  <div className={styles.detailItem}>
                    <Icon icon={PhoneIcon} className={styles.detailIcon} />
                    <div>
                      <span className={styles.detailLabel}>Telefone</span>
                      <span className={styles.detailValue}>{client.phone}</span>
                    </div>
                  </div>
                )}
                {client.birthDate && (
                  <div className={styles.detailItem}>
                    <Icon icon={CalendarIcon} className={styles.detailIcon} />
                    <div>
                      <span className={styles.detailLabel}>Data de Nascimento</span>
                      <span className={styles.detailValue}>{formatDateToBrazilian(client.birthDate)}</span>
                    </div>
                  </div>
                )}
                {client.address && (
                  <div className={styles.detailItem}>
                    <Icon icon={BuildingOfficeIcon} className={styles.detailIcon} />
                    <div>
                      <span className={styles.detailLabel}>Endereço</span>
                      <span className={styles.detailValue}>{client.address}</span>
                    </div>
                  </div>
                )}
                {client.notes && (
                  <div className={styles.detailItem}>
                    <Icon icon={TagIcon} className={styles.detailIcon} />
                    <div>
                      <span className={styles.detailLabel}>Observações</span>
                      <span className={styles.detailValue}>{client.notes}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.detailsActions}>
                <button className={styles.detailActionButton}>
                  <Icon icon={DocumentTextIcon} className={styles.actionIcon} />
                  <span>Histórico</span>
                </button>
                <button className={styles.detailActionButton}>
                  <Icon icon={ChartBarIcon} className={styles.actionIcon} />
                  <span>Análise</span>
                </button>
                <button 
                  className={styles.detailActionButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDataSale(client.id);
                  }}
                >
                  <Icon icon={ArrowDownTrayIcon} className={styles.actionIcon} />
                  <span>Baixar Dados</span>
                </button>
                <Table.EditButton onClick={(e) => {
                    e.stopPropagation();
                    onEdit(client);
                  }}>
                    Editar
                  </Table.EditButton>
                  <Table.DeleteButton onClick={(e) => {
                    e.stopPropagation();
                    onDelete(client);
                  }}>
                    Excluir
                  </Table.DeleteButton>
              </div>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  )
}

export default ClientTableRow
