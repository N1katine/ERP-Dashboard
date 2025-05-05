import * as React from 'react'
import styles from './Relatorios.module.css'

const Relatorios: React.FC = () => {
  // Sample report types
  const reportTypes = [
    { id: 'vendas', name: 'Relatório de Vendas' },
    { id: 'estoque', name: 'Relatório de Estoque' },
    { id: 'financeiro', name: 'Relatório Financeiro' },
    { id: 'clientes', name: 'Relatório de Clientes' }
  ]

  const [selectedReport, setSelectedReport] = React.useState('vendas')

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Relatórios</h2>
      <p className={styles.subtitle}>Aqui você pode gerar e visualizar relatórios da empresa.</p>
      
      <div className={styles.reportGrid}>
        {/* Report Selection */}
        <div className={styles.sidebarCol}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.sectionTitle}>Tipo de Relatório</h3>
            <div className={styles.filterGroup}>
              {reportTypes.map(report => (
                <button
                  key={report.id}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedReport === report.id 
                      ? 'bg-primary-100 text-primary-800 font-medium' 
                      : 'bg-gray-50 hover:bg-gray-100 text-dark-600'
                  }`}
                  onClick={() => setSelectedReport(report.id)}
                >
                  {report.name}
                </button>
              ))}
            </div>
            
            <div className={styles.periodSection}>
              <h4 className={styles.periodTitle}>Período</h4>
              <div className={styles.fieldGroup}>
                <div>
                  <label className={styles.fieldLabel}>Data Inicial</label>
                  <input 
                    type="date" 
                    className={styles.dateInput}
                  />
                </div>
                <div>
                  <label className={styles.fieldLabel}>Data Final</label>
                  <input 
                    type="date" 
                    className={styles.dateInput}
                  />
                </div>
              </div>
              
              <button className={styles.generateButton}>
                Gerar Relatório
              </button>
            </div>
          </div>
        </div>
        
        {/* Report Preview */}
        <div className={styles.contentCol}>
          <div className={styles.contentCard}>
            <div className={styles.headerRow}>
              <h3 className={styles.reportTitle}>
                {reportTypes.find(r => r.id === selectedReport)?.name}
              </h3>
              <div className={styles.actionButtons}>
                <button className={styles.actionButton}>
                  Imprimir
                </button>
                <button className={styles.actionButton}>
                  Exportar PDF
                </button>
                <button className={styles.actionButton}>
                  Exportar Excel
                </button>
              </div>
            </div>
            
            {/* Mock Report Content - would be dynamic based on selectedReport */}
            <div className={styles.reportContent}>
              {selectedReport === 'vendas' && (
                <div>
                  <div className={styles.summaryRow}>
                    <h4 className={styles.summaryItem}>Total de Vendas: <span className={styles.summaryValue}>R$ 125.430,00</span></h4>
                    <h4 className={styles.summaryItem}>Período: <span className={styles.summaryText}>01/04/2025 - 30/04/2025</span></h4>
                  </div>
                  
                  <div className={styles.chartContainer}>
                    <div className={styles.chartPlaceholder}>
                      <p className={styles.placeholderText}>Gráfico de vendas seria exibido aqui</p>
                    </div>
                  </div>
                  
                  <div className={styles.tableWrapper}>
                    <table className={styles.dataTable}>
                      <thead className={styles.tableHead}>
                        <tr>
                          <th className={styles.tableHeaderCell}>Data</th>
                          <th className={styles.tableHeaderCell}>ID</th>
                          <th className={styles.tableHeaderCell}>Cliente</th>
                          <th className={styles.tableHeaderCell}>Valor</th>
                          <th className={styles.tableHeaderCell}>Status</th>
                        </tr>
                      </thead>
                      <tbody className={styles.tableBody}>
                        <tr>
                          <td className={styles.tableCell}>05/04/2025</td>
                          <td className={styles.tableCell}>#1001</td>
                          <td className={styles.tableCell}>Cliente ABC Ltda</td>
                          <td className={styles.tableCell}>R$ 1.250,00</td>
                          <td className={styles.tableCell}>
                            <span className={`${styles.statusBadge} ${styles.paidBadge}`}>Pago</span>
                          </td>
                        </tr>
                        <tr>
                          <td className={styles.tableCell}>12/04/2025</td>
                          <td className={styles.tableCell}>#1002</td>
                          <td className={styles.tableCell}>Cliente XYZ S.A.</td>
                          <td className={styles.tableCell}>R$ 3.750,00</td>
                          <td className={styles.tableCell}>
                            <span className={`${styles.statusBadge} ${styles.paidBadge}`}>Pago</span>
                          </td>
                        </tr>
                        <tr>
                          <td className={styles.tableCell}>18/04/2025</td>
                          <td className={styles.tableCell}>#1003</td>
                          <td className={styles.tableCell}>Cliente DEF ME</td>
                          <td className={styles.tableCell}>R$ 850,00</td>
                          <td className={styles.tableCell}>
                            <span className={`${styles.statusBadge} ${styles.pendingBadge}`}>Pendente</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {selectedReport !== 'vendas' && (
                <div className={styles.emptyState}>
                  <p className={styles.emptyStateText}>Selecione um relatório e clique em "Gerar Relatório" para visualizar os dados.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Relatorios
