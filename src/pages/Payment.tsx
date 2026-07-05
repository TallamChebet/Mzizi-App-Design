import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeviceFrame from '../components/DeviceFrame'
import StatusBar from '../components/StatusBar'
import TabBar, { type TabKey } from '../components/TabBar'
import styles from './Payment.module.css'

const recipients = [
  { name: 'Amara', img: 'https://i.pravatar.cc/80?img=45' },
  { name: 'Kevin', img: 'https://i.pravatar.cc/80?img=13' },
  { name: 'Wanjiru', img: 'https://i.pravatar.cc/80?img=32' },
  { name: 'Otieno', img: 'https://i.pravatar.cc/80?img=53' },
  { name: 'Zawadi', img: 'https://i.pravatar.cc/80?img=16' },
]

type Service = { key: string; label: string; tint: string; icon: JSX.Element }

const services: Service[] = [
  {
    key: 'send',
    label: 'Send Money',
    tint: '#EDE4FE',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M20 4L9 15M20 4l-7 16-3.5-6.5L3 10l17-6z" stroke="#6d28d9" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'paybill',
    label: 'Paybill',
    tint: '#E3F0FF',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="3" width="14" height="18" rx="2" stroke="#1E6FE0" strokeWidth="1.8" />
        <path d="M9 8h6M9 12h6M9 16h3" stroke="#1E6FE0" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'goods',
    label: 'Buy Goods',
    tint: '#E4F8EC',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 7h16l-1.2 11a2 2 0 01-2 1.8H7.2a2 2 0 01-2-1.8L4 7z" stroke="#0F9D58" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8.5 7a3.5 3.5 0 017 0" stroke="#0F9D58" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'airtime',
    label: 'Buy Airtime',
    tint: '#FFF0E0',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="7" y="3" width="10" height="18" rx="2.5" stroke="#F08C1E" strokeWidth="1.8" />
        <path d="M11 17.5h2" stroke="#F08C1E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'bank',
    label: 'Bank Transfer',
    tint: '#FDE7F1',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 9l8-5 8 5H4z" stroke="#6d28d9" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M6 10v7M10 10v7M14 10v7M18 10v7M4 20h16" stroke="#6d28d9" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'more',
    label: 'More',
    tint: '#EEF0F4',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="12" r="1.8" fill="#6B7280" />
        <circle cx="12" cy="12" r="1.8" fill="#6B7280" />
        <circle cx="18" cy="12" r="1.8" fill="#6B7280" />
      </svg>
    ),
  },
]

const channels = [
  { name: 'M-Pesa', desc: 'Safaricom mobile money', color: '#1CA64C', short: 'M' },
  { name: 'Airtel Money', desc: 'Airtel mobile wallet', color: '#E4002B', short: 'A' },
  { name: 'T-Kash', desc: 'Telkom Kenya', color: '#0A2A66', short: 'T' },
]

export default function Payment() {
  const navigate = useNavigate()
  const [active, setActive] = useState<TabKey>('payment')

  const onTab = (key: TabKey) => {
    setActive(key)
    if (key === 'home') navigate('/home')
    if (key === 'scan') navigate('/scan')
    if (key === 'history') navigate('/history')
    if (key === 'profile') navigate('/profile')
  }

  return (
    <DeviceFrame>
      <StatusBar color="#14121a" />

      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.title}>Payments</div>
          <button className={styles.searchBtn} aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="#14121a" strokeWidth="1.8" />
              <path d="M14 14L18 18" stroke="#14121a" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className={styles.scroll}>
          {/* recent recipients */}
          <div className={styles.sectionHead}>
            <h2>Recent</h2>
            <span className={styles.seeAll}>See all</span>
          </div>
          <div className={styles.recipients}>
            <div className={styles.recipient}>
              <div className={styles.addRecipient}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 5v12M5 11h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className={styles.recipientName}>Add</span>
            </div>
            {recipients.map((r) => (
              <div className={styles.recipient} key={r.name}>
                <img
                  className={styles.recipientAvatar}
                  src={r.img}
                  alt={r.name}
                  onError={(e) => ((e.target as HTMLImageElement).style.visibility = 'hidden')}
                />
                <span className={styles.recipientName}>{r.name}</span>
              </div>
            ))}
          </div>

          {/* services grid */}
          <div className={styles.sectionHead}>
            <h2>Services</h2>
          </div>
          <div className={styles.grid}>
            {services.map((s) => (
              <div className={styles.tile} key={s.key}>
                <div className={styles.tileIco} style={{ background: s.tint }}>
                  {s.icon}
                </div>
                <span className={styles.tileLabel}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* mobile money channels */}
          <div className={styles.sectionHead}>
            <h2>Mobile Money</h2>
          </div>
          <div className={styles.channels}>
            {channels.map((c) => (
              <div className={styles.channel} key={c.name}>
                <div className={styles.channelLogo} style={{ background: c.color }}>
                  {c.short}
                </div>
                <div className={styles.channelBody}>
                  <div className={styles.channelName}>{c.name}</div>
                  <div className={styles.channelDesc}>{c.desc}</div>
                </div>
                <svg className={styles.channelChevron} width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M6 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        <TabBar active={active} onChange={onTab} />
      </div>
    </DeviceFrame>
  )
}
