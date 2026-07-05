import styles from './TabBar.module.css'

export type TabKey = 'home' | 'payment' | 'scan' | 'history' | 'profile'

const tabs: { key: TabKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'payment', label: 'Payment' },
  { key: 'scan', label: 'Scan' },
  { key: 'history', label: 'History' },
  { key: 'profile', label: 'Profile' },
]

type Props = {
  active: TabKey
  onChange?: (key: TabKey) => void
}

export default function TabBar({ active, onChange }: Props) {
  return (
    <nav className={styles.tabbar}>
      {tabs.map((tab) =>
        tab.key === 'scan' ? (
          <div className={styles.scan} key={tab.key} onClick={() => onChange?.('scan')}>
            <div className={styles.scanBtn}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <rect x="5" y="5" width="7" height="7" rx="1" stroke="#fff" strokeWidth="1.8" />
                <rect x="14" y="5" width="7" height="7" rx="1" stroke="#fff" strokeWidth="1.8" />
                <rect x="5" y="14" width="7" height="7" rx="1" stroke="#fff" strokeWidth="1.8" />
                <rect x="15" y="15" width="5" height="5" rx="1" fill="#fff" />
              </svg>
            </div>
            <span className={styles.scanLabel}>Scan</span>
          </div>
        ) : (
          <div
            className={`${styles.tab} ${active === tab.key ? styles.tabActive : ''}`}
            key={tab.key}
            onClick={() => onChange?.(tab.key)}
          >
            <TabIcon tab={tab.key} />
            <span>{tab.label}</span>
          </div>
        )
      )}
    </nav>
  )
}

function TabIcon({ tab }: { tab: TabKey }) {
  switch (tab) {
    case 'home':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M4 11l8-6 8 6v8a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1v-8z" fill="currentColor" />
        </svg>
      )
    case 'payment':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="6" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
          <path d="M7 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case 'history':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
          <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
  }
}
