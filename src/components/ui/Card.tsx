import * as React from 'react'
import styles from './Card.module.css'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  bordered?: boolean
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
  title?: string
}

interface CardBodyProps {
  children: React.ReactNode
  className?: string
}

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

// Define the compound component type
type CardComponent = React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>
  Body: React.FC<CardBodyProps>
  Footer: React.FC<CardFooterProps>
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '', title }) => {
  return (
    <div className={`${styles.header} ${className}`}>
      {title && <h3 className={styles.headerTitle}>{title}</h3>}
      {children}
    </div>
  )
}

const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => {
  return (
    <div className={`${styles.body} ${className}`}>
      {children}
    </div>
  )
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={`${styles.footer} ${className}`}>
      {children}
    </div>
  )
}

// Create the component with the compound component type
const Card: CardComponent = ({ 
  children, 
  className = '',
  hover = false,
  bordered = false
}) => {
  return (
    <div 
      className={`${styles.card} ${hover ? styles.hover : ''} ${bordered ? styles.bordered : ''} ${className}`.trim()}
    >
      {children}
    </div>
  )
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export default Card
