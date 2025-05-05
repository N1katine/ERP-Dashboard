import * as React from 'react'
import styles from './Navbar.module.css'
import Icon from '../common/Icon'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface NavbarProps {
  userName?: string;
  avatarText?: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  userName = 'Admin',
  avatarText = 'A'
}) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <h1 className={styles.brandName}>Sistema ERP</h1>
      </div>
      
      <div className={styles.actions}>
        <div className={styles.searchContainer}>
          <Icon icon={MagnifyingGlassIcon} className={styles.searchIcon} size="sm" />
          <input
            type="text"
            placeholder="Pesquisar..."
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.userSection}>
          <div className={styles.notifications}>
            <button className={styles.notificationButton}>
              🔔
            </button>
            <span className={styles.notificationBadge}></span>
          </div>
          
          <div className={styles.userInfo}>
            <span className={styles.userName}>{userName}</span>
            <div className={styles.userAvatar}>
              {avatarText}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
