import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeviceFrame from '../components/DeviceFrame'
import StatusBar from '../components/StatusBar'
import TabBar, { type TabKey } from '../components/TabBar'
import styles from './Home.module.css'

type Tx = {
  name: string
  time: string
  amount: string
  icon: 'withdraw' | 'qr' | 'netflix'
}

const transactions: Tx[] = [
  { name: 'Withdrawal to ATM', time: 'Today, 11:23 AM', amount: '-KSh 50', icon: 'withdraw' },
  { name: 'QR Pay', time: 'Today, 8:50 AM', amount: '-KSh 16.50', icon: 'qr' },
  { name: 'Netflix Subcription', time: 'Today, 6:00 AM', amount: '-KSh 32.30', icon: 'netflix' },
]

const actions = ['Transfer', 'Receive', 'Add', 'More'] as const

export default function Home() {
  const navigate = useNavigate()
  const [showNotice, setShowNotice] = useState(true)
  const [active, setActive] = useState<TabKey>('home')

  const onTab = (key: TabKey) => {
    setActive(key)
    if (key === 'payment') navigate('/payment')
    if (key === 'scan') navigate('/scan')
    if (key === 'history') navigate('/history')
    if (key === 'profile') navigate('/profile')
  }

  return (
    <DeviceFrame>
      <StatusBar color="#14121a" />

      <div className={styles.top}>
        {/* header */}
        <div className={styles.header}>
          <div className={styles.profile}>
            <img
              className={styles.avatar}
              src="https://i.pravatar.cc/80?img=12"
              alt="Profile"
              onError={(e) => ((e.target as HTMLImageElement).style.visibility = 'hidden')}
            />
            <div className={styles.profileText}>
              <div className={styles.name}>Jansen</div>
              <div className={styles.tier}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 1l1.4 3.3L11.5 5 8.8 7.4l.8 3.6-3.1-1.9-3.1 1.9.8-3.6L1.5 5l3.6-.7L6.5 1z" fill="#8E0050" />
                </svg>
                Platinum
              </div>
            </div>
          </div>
          <button className={styles.bell} aria-label="Notifications">
            <span className={styles.dotRed} />
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 8a5 5 0 0110 0c0 4 1.5 5 1.5 5H3.5S5 12 5 8z" stroke="#14121a" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M8 16a2 2 0 004 0" stroke="#14121a" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* stacked credit cards */}
        <div className={styles.cardStack}>
          <div className={styles.cardBack}>
            <span className={styles.visaBack}>VISA</span>
            <span className={styles.cardBackNo}>**** 1278</span>
          </div>

          <div className={styles.cardFront}>
            <div className={styles.vMark}>V</div>
            <div className={styles.cardLabel}>Total balance</div>
            <div className={styles.cardBalance}>
              KSh 47,693.00
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="#fff" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="2.6" stroke="#fff" strokeWidth="1.6" />
              </svg>
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.cardAcct}>
                <span className={styles.miniCard}>
                  <svg width="26" height="18" viewBox="0 0 26 18" fill="none">
                    <rect x="0.5" y="0.5" width="25" height="17" rx="3.5" fill="#8E0050" />
                    <rect x="3" y="3.5" width="6" height="4.5" rx="1" fill="#FFD84D" />
                    <rect x="3" y="12" width="12" height="1.6" rx="0.8" fill="#fff" opacity="0.85" />
                    <rect x="17" y="12" width="6" height="1.6" rx="0.8" fill="#fff" opacity="0.6" />
                  </svg>
                </span>
                Main Acc
              </div>
              <div className={styles.cardNo}>
                26378 92893 09
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="#fff" strokeWidth="1.3" />
                  <path d="M3 10V4a1.5 1.5 0 011.5-1.5H10" stroke="#fff" strokeWidth="1.3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* actions below card */}
        <div className={styles.actionRow}>
          {actions.map((label) => (
            <div className={styles.action} key={label}>
              <div className={styles.circ}>
                <ActionIcon name={label} />
              </div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* scrollable */}
      <div className={styles.scroll}>
        <div className={styles.section}>
          <h2>Transactions</h2>
          <span className={styles.seeAll}>See all</span>
        </div>

        <div className={styles.txList}>
          {transactions.map((tx) => (
            <div className={styles.tx} key={tx.name}>
              <div className={`${styles.txIco} ${tx.icon === 'netflix' ? styles.txIcoNetflix : ''}`}>
                <TxIcon icon={tx.icon} />
              </div>
              <div className={styles.txBody}>
                <div className={styles.txName}>{tx.name}</div>
                <div className={styles.txTime}>{tx.time}</div>
              </div>
              <div className={styles.txAmt}>{tx.amount}</div>
            </div>
          ))}
        </div>

        {showNotice && (
          <div className={styles.notice}>
            <button className={styles.noticeClose} aria-label="Dismiss" onClick={() => setShowNotice(false)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <div className={styles.noticeHead}>
              <div className={styles.noticeIco}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="3" y="5" width="16" height="12" rx="2.5" stroke="#8E0050" strokeWidth="1.6" />
                  <path d="M4 6l7 5 7-5" stroke="#8E0050" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className={styles.noticeTitle}>Confirm Your Email Address</div>
                <div className={styles.noticeText}>To enjoy more, please confirm your email.</div>
              </div>
            </div>
            <button className={styles.verifyBtn}>Verify my email</button>
          </div>
        )}
      </div>

      <TabBar active={active} onChange={onTab} />
    </DeviceFrame>
  )
}

function ActionIcon({ name }: { name: string }) {
  switch (name) {
    case 'Transfer':
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M6 16L16 6M8 6h8v8" stroke="#14121a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'Receive':
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M6 6l10 10M16 8v8H8" stroke="#14121a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'Add':
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 5v12M5 11h12" stroke="#14121a" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="5" cy="11" r="1.6" fill="#14121a" />
          <circle cx="11" cy="11" r="1.6" fill="#14121a" />
          <circle cx="17" cy="11" r="1.6" fill="#14121a" />
        </svg>
      )
  }
}

function TxIcon({ icon }: { icon: Tx['icon'] }) {
  if (icon === 'withdraw')
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 15V5M6 9l4 5 4-5" stroke="#8E0050" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  if (icon === 'qr')
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="6" height="6" rx="1" stroke="#8E0050" strokeWidth="1.6" />
        <rect x="11" y="3" width="6" height="6" rx="1" stroke="#8E0050" strokeWidth="1.6" />
        <rect x="3" y="11" width="6" height="6" rx="1" stroke="#8E0050" strokeWidth="1.6" />
        <rect x="12" y="12" width="4" height="4" rx="1" fill="#8E0050" />
      </svg>
    )
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
      <path d="M2 1h3l6 18h-3L2 1z" fill="#E50914" />
      <path d="M2 1v18h2.5V7l1 3V1H2z" fill="#B0060F" />
      <path d="M14 19h-3V1h3v18z" fill="#E50914" />
    </svg>
  )
}

