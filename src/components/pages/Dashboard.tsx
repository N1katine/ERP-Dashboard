import * as React from 'react'
import { Link } from '@tanstack/react-router'
import styles from './Dashboard.module.css'
import Icon from '../common/Icon'
import Card from '../ui/Card'
import { ClipboardDocumentListIcon, BanknotesIcon, UserGroupIcon, ArchiveBoxIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { useSellStore } from '../../hooks/useSellStore'
import { useProductStore } from '../../hooks/useProductStore'
import { useClientStore } from '../../hooks/useClientStore'
import { formatCurrency } from '../../lib/formatters'

const Dashboard: React.FC = () => {
  const { sells } = useSellStore()
  const { products } = useProductStore()
  const { clients } = useClientStore()

  // Calculate monthly sales
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  
  const monthlySales = sells
    .filter(sell => {
      const sellDate = new Date(sell.createdAt || '')
      return sellDate.getMonth() === currentMonth && sellDate.getFullYear() === currentYear
    })
    .reduce((sum, sell) => sum + parseFloat(sell.price), 0)

  // Calculate new clients this month
  const newClientsThisMonth = clients.filter(client => {
    const clientDate = new Date(client.createdAt || '')
    return clientDate.getMonth() === currentMonth && clientDate.getFullYear() === currentYear
  }).length


  const metrics = [
    { title: 'Vendas do Mês', value: formatCurrency(monthlySales), change: '+100%', trend: 'up' },
    { title: 'Novos Clientes', value: newClientsThisMonth.toString(), change: '+100%', trend: 'up' },
    { title: 'Produtos em Estoque', value: products.length, trend: 'down' }
  ]
  
  const recentActivities = [
    { id: 1, action: 'Venda finalizada', detail: 'Venda #12345 - R$ 1.250,00', time: '15 min atrás' },
    { id: 2, action: 'Novo produto adicionado', detail: 'Mouse Wireless X45', time: '2 horas atrás' },
    { id: 3, action: 'Novo cliente cadastrado', detail: 'Empresa ABC Ltda', time: '4 horas atrás' },
    { id: 4, action: 'Estoque atualizado', detail: '5 itens adicionados', time: '8 horas atrás' }
  ]

  const quickAccessItems = [
    { name: 'Gerenciar Vendas', path: '/vendas', icon: BanknotesIcon },
    { name: 'Gerenciar Produtos', path: '/produtos', icon: ArchiveBoxIcon },
    { name: 'Gerenciar Clientes', path: '/clientes', icon: ClipboardDocumentListIcon },
    { name: 'Gerenciar Usuários', path: '/usuarios', icon: UserGroupIcon },
    { name: 'Ver Relatórios', path: '/relatorios', icon: DocumentTextIcon }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h2 className={styles.title}>Bem-vindo ao ERP!</h2>
        <p className={styles.subtitle}>Painel de Controle - Visualize e gerencie todos os aspectos da sua empresa.</p>
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

      <div className={styles.contentGrid}>
        {/* Quick Access */}
        <Card className={styles.quickAccessSection}>
          <Card.Header>
            <h3 className={styles.sectionTitle}>Acesso Rápido</h3>
          </Card.Header>
          <Card.Body>
            <ul className={styles.quickAccessList}>
              {quickAccessItems.map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className={styles.quickAccessItem}>
                    <div className={styles.quickAccessContent}>
                      <div className={styles.itemWithIcon}>
                        <Icon icon={item.icon} className={styles.itemIcon} />
                        <span className={styles.itemText}>{item.name}</span>
                      </div>
                      <span className={styles.arrow}>→</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>

        {/* Recent Activities */}
        <Card className={styles.activitiesSection}>
          <Card.Header>
            <h3 className={styles.sectionTitle}>Atividades Recentes</h3>
          </Card.Header>
          <Card.Body>
            <ul className={styles.activitiesList}>
              {recentActivities.map(activity => (
                <li key={activity.id} className={styles.activityItem}>
                  <div className={styles.activityContent}>
                    <span className={styles.activityAction}>{activity.action}</span>
                    <span className={styles.activityDetail}>{activity.detail}</span>
                    <span className={styles.activityTime}>{activity.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Card.Body>
          <Card.Footer className={styles.viewMoreFooter}>
            <button className={styles.viewMoreLink}>
              Ver Todas as Atividades
            </button>
          </Card.Footer>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
