import styles from './StatusBar.module.css'

type Props = {
  /** icon + text color */
  color?: string
}

export default function StatusBar({ color = '#fff' }: Props) {
  return (
    <div className={styles.statusbar} style={{ color }}>
      <span>9:41</span>
      <span className={styles.icons}>
        {/* signal */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill={color}>
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="7" rx="1" />
          <rect x="10" y="2" width="3" height="10" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        {/* wifi */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <path d="M8.5 2C11.5 2 14.2 3.2 16 5" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M3 6.5C4.5 5 6.4 4.2 8.5 4.2C10.6 4.2 12.5 5 14 6.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M5.8 9C6.5 8.3 7.5 7.9 8.5 7.9C9.5 7.9 10.5 8.3 11.2 9" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <circle cx="8.5" cy="11" r="1" fill={color} />
        </svg>
        {/* battery */}
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
          <rect x="1" y="1" width="21" height="11" rx="3" stroke={color} strokeWidth="1.2" />
          <rect x="3" y="3" width="17" height="7" rx="1.5" fill={color} />
          <rect x="23.5" y="4" width="1.8" height="5" rx="0.9" fill={color} />
        </svg>
      </span>
    </div>
  )
}
