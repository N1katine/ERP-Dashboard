import * as React from 'react'
import styles from './Icon.module.css'

interface IconProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Icon: React.FC<IconProps> = ({ icon, className = '', size = 'md' }) => {
  const sizeClass = styles[size] || styles.md;
  
  return React.createElement(icon, {
    className: `${styles.icon} ${sizeClass} ${className}`.trim()
  });
};

export default Icon; 