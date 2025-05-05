import * as React from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  className = '',
  variant = 'primary',
  size = 'md',
  fullWidth = false
}) => {
  const variantClass = styles[variant] || styles.primary
  const sizeClass = styles[size] || styles.md
  
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${variantClass} ${sizeClass} ${fullWidth ? styles.fullWidth : ''} ${className}`.trim()}
    >
      {children}
    </button>
  )
}

export default Button
