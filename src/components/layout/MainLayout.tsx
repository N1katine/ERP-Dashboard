import * as React from 'react'
import { Link, Outlet } from '@tanstack/react-router'
import {
  TableCellsIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  // ShoppingCartIcon,
  // WrenchScrewdriverIcon,
  // CalculatorIcon,
  // ClockIcon,
  ArchiveBoxIcon,
  BanknotesIcon,
  // BuildingOfficeIcon,
  UserGroupIcon,
  Bars3Icon,
  BellIcon,
} from '@heroicons/react/24/outline'
import styles from './MainLayout.module.css'
import Icon from '../common/Icon'

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev)
  }
  
  const navigation = [
    { name: 'Dashboard', path: '/', icon: TableCellsIcon },
    { name: 'Vendas', path: '/vendas', icon: BanknotesIcon },
    { name: 'Produtos', path: '/produtos', icon: ArchiveBoxIcon },
    { name : 'Clientes', path: '/clientes', icon: ClipboardDocumentListIcon},
    { name: 'Usuários', path: '/usuarios', icon: UserGroupIcon },
    { name: 'Relatórios', path: '/relatorios', icon: DocumentTextIcon },
  ]

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        <div className={styles.sidebarHeader}>
          {sidebarOpen ? (
            <h1 className={styles.sidebarTitle}>ERP System</h1>
          ) : (
            <span className={styles.sidebarTitle}>ERP</span>
          )}
          <button 
            onClick={toggleSidebar}
            className={styles.sidebarToggle}
          >
            <Bars3Icon className={`${styles.toggleIcon} ${sidebarOpen ? styles.rotateIcon : ''}`} />
          </button>
        </div>
        <nav className={styles.navContainer}>
          <ul>
            {navigation.map((item) => (
              <li key={item.name} className={styles.navItem}>
                <Link
                  to={item.path}
                  className={styles.navLink}
                  activeProps={{
                    className: styles.navLinkActive
                  }}
                >
                  <Icon icon={item.icon} size="md" />
                  {sidebarOpen && <span className={styles.navText}>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerContainer}>
            <div className={styles.headerTitle}>
              <h2 className={styles.headerText}>Sistema ERP</h2>
            </div>
            <div className={styles.headerActions}>
              <div className={styles.notificationContainer}>
                <button className={styles.notificationButton}>
                  <BellIcon className={`${styles.toggleIcon}`} />
                </button>
                <span className={styles.notificationBadge}></span>
              </div>
              <div className={styles.userProfile}>
                <span className={styles.userName}>Admin</span>
                <div className={styles.userAvatar}>
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout 