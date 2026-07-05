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
                  <path d="M6.5 1l1.4 3.3L11.5 5 8.8 7.4l.8 3.6-3.1-1.9-3.1 1.9.8-3.6L1.5 5l3.6-.7L6.5 1z" fill="#6d28d9" />
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

        {/* Afrinet debit card */}
        <div className={styles.cardWrap}>
          <div className={styles.afrinetCard}>
            {/* circuit texture */}
            <svg className={styles.circuit} viewBox="0 0 320 200" fill="none" preserveAspectRatio="none">
              <path d="M20 40h60v30h50M0 100h40v40h80M200 20v40h60v50M240 120h80M180 160h60v30M280 60v90M120 180h40v20" stroke="#fff" strokeWidth="1" opacity="0.1" />
              <circle cx="80" cy="70" r="2" fill="#fff" opacity="0.5" />
              <circle cx="260" cy="110" r="2" fill="#fff" opacity="0.5" />
              <circle cx="200" cy="60" r="2" fill="#fff" opacity="0.5" />
            </svg>

            {/* top row: chip + logo */}
            <div className={styles.cardTop}>
              <div className={styles.chip}>
                <span className={styles.chipLine} />
                <span className={styles.chipLine} />
                <span className={styles.chipLine} />
              </div>
              <div className={styles.afrinetLogo}>
                <img className={styles.cardLogoImg} src="/img/mzizi-wordmark.png" alt="" />
              </div>
            </div>

            {/* balance on card */}
            <div className={styles.cardBalanceRow}>
              <div className={styles.cardBalanceAmt}>KSh 47,693.00</div>
              <button className={styles.cardEye} aria-label="Hide balance">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="#fff" strokeWidth="1.6" />
                  <circle cx="12" cy="12" r="2.6" stroke="#fff" strokeWidth="1.6" />
                </svg>
              </button>
            </div>

            {/* bottom row */}
            <div className={styles.cardBottom}>
              <div>
                <div className={styles.cardHolderLabel}>CARD HOLDER</div>
                <div className={styles.cardHolder}>JANSEN MWANGI</div>
              </div>
              <img className={styles.cardMark} src="/img/mzizi-icon.png" alt="Mzizi" />
            </div>
          </div>
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
                  <rect x="3" y="5" width="16" height="12" rx="2.5" stroke="#6d28d9" strokeWidth="1.6" />
                  <path d="M4 6l7 5 7-5" stroke="#6d28d9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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

function TxIcon({ icon }: { icon: Tx['icon'] }) {
  if (icon === 'withdraw')
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 15V5M6 9l4 5 4-5" stroke="#6d28d9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  if (icon === 'qr')
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="6" height="6" rx="1" stroke="#6d28d9" strokeWidth="1.6" />
        <rect x="11" y="3" width="6" height="6" rx="1" stroke="#6d28d9" strokeWidth="1.6" />
        <rect x="3" y="11" width="6" height="6" rx="1" stroke="#6d28d9" strokeWidth="1.6" />
        <rect x="12" y="12" width="4" height="4" rx="1" fill="#6d28d9" />
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

