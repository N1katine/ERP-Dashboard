import * as React from 'react'
import styles from './Clientes.module.css'

const Clientes: React.FC = () => {

  const metrics = [
    { title: 'Total de Clientes', value: '78'},
    { title: 'Novos Clientes', value: '24', change: '+8%', trend: 'up' },
  ]

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
              <span className={`${styles.metricChange} ${metric.trend === 'up' ? styles.metricUp : styles.metricDown}`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Clientes
