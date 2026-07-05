import type { ReactNode } from 'react'
import styles from './DeviceFrame.module.css'

type Props = {
  children: ReactNode
  /** lighten the home indicator when the bottom of the screen is dark */
  lightIndicator?: boolean
}

export default function DeviceFrame({ children, lightIndicator = false }: Props) {
  return (
    <div className={styles.device}>
      <div className={styles.screen}>
        <div className={styles.island} />
        {children}
        <div
          className={`${styles.homeIndicator} ${lightIndicator ? styles.light : ''}`}
        />
      </div>
    </div>
  )
}
