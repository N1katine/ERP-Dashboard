import * as React from 'react';
import styles from './Relatorios.module.css';
import { useSellStore } from '../../hooks/useSellStore';
import { useClientStore } from '../../hooks/useClientStore';
import { useProductStore } from '../../hooks/useProductStore';
import { formatCurrency, formatDate } from '../../lib/formatters';
import type { Sell } from '../../types/sell';
import type { Client } from '../../types/client';
import type { Product } from '../../types/product';

interface SalesReportData {
  totalValue: number;
  filteredSells: Sell[];
}

interface StockReportData {
  totalValue: number;
  products: Product[];
}

interface ClientReportData {
  clients: Client[];
}
type ReportData = SalesReportData | StockReportData | ClientReportData | null;

const Relatorios: React.FC = () => {
  const { sells } = useSellStore();
  const { clients } = useClientStore();
  const { products } = useProductStore();

  const reportTypes = [
    { id: 'vendas', name: 'Relatório de Vendas' },
    { id: 'estoque', name: 'Relatório de Estoque' },
    { id: 'clientes', name: 'Relatório de Clientes' },
  ];

  const [selectedReport, setSelectedReport] = React.useState('vendas');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [reportData, setReportData] = React.useState<ReportData>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleGenerateReport = () => {
    setIsLoading(true);
    setError(null);
    setReportData(null); // Clear previous report

    // Basic date validation
    const start = startDate ? new Date(startDate + 'T00:00:00') : null;
    const end = endDate ? new Date(endDate + 'T23:59:59') : null;

    if (start && end && start > end) {
      setError('Data inicial não pode ser maior que a data final.');
      setIsLoading(false);
      return;
    }

    try {
      let generatedData: ReportData = null;

      switch (selectedReport) {
        case 'vendas':
          const filteredSells = sells.filter((sell) => {
            if (!sell.createdAt) return false;
            const sellDate = new Date(sell.createdAt);
            const afterStart = start ? sellDate >= start : true;
            const beforeEnd = end ? sellDate <= end : true;
            return afterStart && beforeEnd;
          });
          const totalValue = filteredSells.reduce((sum, sell) => sum + Number(sell.price), 0);
          generatedData = { totalValue, filteredSells };
          break;

        case 'estoque':
          const stockValue = products.reduce((sum, prod) => sum + (Number(prod.price) * prod.stock), 0);
          generatedData = { totalValue: stockValue, products: [...products] }; // Show all products
          break;

        case 'clientes':
          const filteredClients = clients.filter((client) => {
            const clientDate = new Date(client.createdAt); // Assuming createdAt is the relevant date
            const afterStart = start ? clientDate >= start : true;
            const beforeEnd = end ? clientDate <= end : true;
            return afterStart && beforeEnd;
          });
          generatedData = { clients: filteredClients };
          break;

        default:
          setError('Tipo de relatório não suportado.');
      }
      setReportData(generatedData);
    } catch (err) {
      console.error('Error generating report:', err);
      setError('Erro ao gerar relatório. Verifique o console.');
    }

    setIsLoading(false);
  };

  // Helper to render report content
  const renderReportContent = () => {
    if (isLoading) {
      return <p className={styles.loadingText}>Gerando relatório...</p>;
    }
    if (error) {
      return <p className={styles.errorText}>{error}</p>;
    }
    if (!reportData) {
      return (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateText}>
            Selecione um tipo de relatório, defina um período (opcional) e clique em "Gerar Relatório".
          </p>
        </div>
      );
    }

    switch (selectedReport) {
      case 'vendas':
        const salesData = reportData as SalesReportData;
        return (
          <div>
            <div className={styles.summaryRow}>
              <h4 className={styles.summaryItem}>Total de Vendas: <span className={styles.summaryValue}>{formatCurrency(salesData.totalValue)}</span></h4>
              <h4 className={styles.summaryItem}>Período: <span className={styles.summaryText}>{startDate ? formatDate(startDate) : 'Início'} até {endDate ? formatDate(endDate) : 'Fim'}</span></h4>
              <h4 className={styles.summaryItem}>Vendas Encontradas: <span className={styles.summaryValue}>{salesData.filteredSells.length}</span></h4>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.dataTable}>
                <thead className={styles.tableHead}>
                  <tr>
                    <th className={styles.tableHeaderCell}>ID Venda</th>
                    <th className={styles.tableHeaderCell}>Cliente</th>
                    <th className={styles.tableHeaderCell}>Valor Total</th>
                    <th className={styles.tableHeaderCell}>Itens</th>
                    <th className={styles.tableHeaderCell}>Data</th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {salesData.filteredSells.length > 0 ? (
                    salesData.filteredSells.map((sell) => (
                      <tr key={sell.id}>
                        <td className={styles.tableCell}>{sell.id.substring(0, 8)}...</td>
                        <td className={styles.tableCell}>{sell.clientId ? clients.find(c => c.id === sell.clientId)?.name || '-' : '-'}</td>
                        <td className={styles.tableCell}>{formatCurrency(Number(sell.price))}</td>
                        <td className={styles.tableCell}>{sell.stock}</td>
                        <td className={styles.tableCell}>{sell.createdAt ? formatDate(sell.createdAt) : '-'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className={styles.emptyTableCell}>Nenhuma venda encontrada para o período selecionado.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'estoque':
        const stockData = reportData as StockReportData;
        return (
          <div>
            <div className={styles.summaryRow}>
              <h4 className={styles.summaryItem}>Valor Total do Estoque: <span className={styles.summaryValue}>{formatCurrency(stockData.totalValue)}</span></h4>
               <h4 className={styles.summaryItem}>Produtos em Estoque: <span className={styles.summaryValue}>{stockData.products.length}</span></h4>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.dataTable}>
                <thead className={styles.tableHead}>
                  <tr>
                    <th className={styles.tableHeaderCell}>Nome</th>
                    <th className={styles.tableHeaderCell}>Quantidade</th>
                    <th className={styles.tableHeaderCell}>Preço Unitário</th>
                    <th className={styles.tableHeaderCell}>Valor Total</th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {stockData.products.length > 0 ? (
                    stockData.products.map((product) => (
                      <tr key={product.id}>
                        <td className={styles.tableCell}>{product.name}</td>
                        <td className={styles.tableCell}>{product.stock}</td>
                        <td className={styles.tableCell}>{formatCurrency(Number(product.price))}</td>
                        <td className={styles.tableCell}>{formatCurrency(Number(product.price) * product.stock)}</td>
                      </tr>
                    ))
                  ) : (
                     <tr>
                      <td colSpan={4} className={styles.emptyTableCell}>Nenhum produto encontrado.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'clientes':
        const clientData = reportData as ClientReportData;
        return (
          <div>
             <div className={styles.summaryRow}>
               <h4 className={styles.summaryItem}>Clientes Encontrados: <span className={styles.summaryValue}>{clientData.clients.length}</span></h4>
               <h4 className={styles.summaryItem}>Período: <span className={styles.summaryText}>{startDate ? formatDate(startDate) : 'Início'} até {endDate ? formatDate(endDate) : 'Fim'}</span></h4>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.dataTable}>
                <thead className={styles.tableHead}>
                  <tr>
                    <th className={styles.tableHeaderCell}>Nome</th>
                    <th className={styles.tableHeaderCell}>Email</th>
                    <th className={styles.tableHeaderCell}>Telefone</th>
                    <th className={styles.tableHeaderCell}>Segmento</th>
                    <th className={styles.tableHeaderCell}>Data Cadastro</th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {clientData.clients.length > 0 ? (
                    clientData.clients.map((client) => (
                      <tr key={client.id}>
                        <td className={styles.tableCell}>{client.name}</td>
                        <td className={styles.tableCell}>{client.email}</td>
                        <td className={styles.tableCell}>{client.phone}</td>
                        <td className={styles.tableCell}>{client.segment}</td>
                        <td className={styles.tableCell}>{formatDate(client.createdAt)}</td>
                      </tr>
                    ))
                  ) : (
                     <tr>
                      <td colSpan={5} className={styles.emptyTableCell}>Nenhum cliente encontrado para o período selecionado.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return (
          <div className={styles.emptyState}>
            <p className={styles.emptyStateText}>Tipo de relatório selecionado não é suportado ou não há dados.</p>
          </div>
        );
    }
  };

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
              {reportTypes.map((report) => (
                <button
                  key={report.id}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedReport === report.id
                      ? 'bg-primary-100 text-primary-800 font-medium'
                      : 'bg-gray-50 hover:bg-gray-100 text-dark-600'
                  }`}
                  onClick={() => {
                    setSelectedReport(report.id);
                    setReportData(null); // Clear report when type changes
                    setError(null);
                  }}
                >
                  {report.name}
                </button>
              ))}
            </div>

            <div className={styles.periodSection}>
              <h4 className={styles.periodTitle}>Período (Opcional)</h4>
              <div className={styles.fieldGroup}>
                <div>
                  <label className={styles.fieldLabel}>Data Inicial</label>
                  <input
                    type="date"
                    className={styles.dateInput}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className={styles.fieldLabel}>Data Final</label>
                  <input
                    type="date"
                    className={styles.dateInput}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <button
                className={styles.generateButton}
                onClick={handleGenerateReport}
                disabled={isLoading}
              >
                {isLoading ? 'Gerando...' : 'Gerar Relatório'}
              </button>
            </div>
          </div>
        </div>

        {/* Report Preview */}
        <div className={styles.contentCol}>
          <div className={styles.contentCard}>
            <div className={styles.headerRow}>
              <h3 className={styles.reportTitle}>
                {reportTypes.find((r) => r.id === selectedReport)?.name || 'Visualização do Relatório'}
              </h3>
              {/* Action buttons could be enabled when reportData exists */}
              <div className={styles.actionButtons}>
                <button className={styles.actionButton} disabled={!reportData}>Imprimir</button>
                <button className={styles.actionButton} disabled={!reportData}>Exportar PDF</button>
                <button className={styles.actionButton} disabled={!reportData}>Exportar Excel</button>
              </div>
            </div>

            <div className={styles.reportContent}>
              {renderReportContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Relatorios;

