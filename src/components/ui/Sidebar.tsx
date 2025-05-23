import * as React from 'react'
import { Link } from '@tanstack/react-router'
import styles from './Sidebar.module.css'
import Icon from '../common/Icon'
import { 
  TableCellsIcon,
  DocumentTextIcon,
  ArchiveBoxIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen = true,
}) => {
  const navigation = [
    { name: 'Dashboard', path: '/', icon: TableCellsIcon },
    { name: 'Produtos', path: '/produtos', icon: ArchiveBoxIcon },
    { name: 'Usuários', path: '/usuarios', icon: UserGroupIcon },
    { name: 'Relatórios', path: '/relatorios', icon: DocumentTextIcon },
  ]

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : styles.sidebarClosed} h-screen flex flex-col`}>
      <div className={styles.header}>
        {isOpen ? (
          <h1 className={styles.title}>ERP System</h1>
        ) : (
          <span className={styles.title}>ERP</span>
        )}
        
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
                <Icon icon={item.icon} className={styles.navIcon} />
                {isOpen && <span className={styles.navText}>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.footer}>
        {isOpen && (
          <>
            <div className={styles.helpText}>Precisa de ajuda? Entre em contato com o suporte.</div>
            <div className={styles.version}>v1.0.0</div>
          </>
        )}
      </div>
    </div>
  )
}

export default Sidebar
