import * as React from 'react'
import styles from './ClientTableRow.module.css'
import Table from '../common/Table'
import Icon from '../common/Icon'
import { DocumentTextIcon, ChartBarIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import type { Client } from '../../types/client'

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
        <Table.Cell>{client.lastPurchase}</Table.Cell>
        <Table.Cell>{client.value}</Table.Cell>
        <Table.Cell isActions>
          <Table.ActionButton onClick={(e) => {
            e.stopPropagation();
            onToggleDetails();
          }}>
            {isSelected ? 'Ocultar' : 'Detalhes'}
          </Table.ActionButton>
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
        </Table.Cell>
      </Table.Row>
      
      {isSelected && (
        <tr className={styles.detailsRow}>
          <td colSpan={5}>
            <div className={styles.clientDetails}>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <Icon icon={DocumentTextIcon} className={styles.detailIcon} />
                  <div>
                    <span className={styles.detailLabel}>Email</span>
                    <span className={styles.detailValue}>{client.email}</span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <Icon icon={DocumentTextIcon} className={styles.detailIcon} />
                  <div>
                    <span className={styles.detailLabel}>Telefone</span>
                    <span className={styles.detailValue}>{client.phone}</span>
                  </div>
                </div>
                {client.address && (
                  <div className={styles.detailItem}>
                    <Icon icon={DocumentTextIcon} className={styles.detailIcon} />
                    <div>
                      <span className={styles.detailLabel}>Endereço</span>
                      <span className={styles.detailValue}>{client.address}</span>
                    </div>
                  </div>
                )}
                {client.notes && (
                  <div className={styles.detailItem}>
                    <Icon icon={DocumentTextIcon} className={styles.detailIcon} />
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
              </div>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  )
}

export default ClientTableRow
