import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeviceFrame from '../components/DeviceFrame'
import StatusBar from '../components/StatusBar'
import TabBar, { type TabKey } from '../components/TabBar'
import styles from './History.module.css'

type Dir = 'out' | 'in' | 'bill'
type Item = {
  name: string
  meta: string
  amount: string
  dir: Dir
  status: 'ok' | 'pending'
}
type Group = { date: string; items: Item[] }

const groups: Group[] = [
  {
    date: 'Today',
    items: [
      { name: 'Wanjiru Kamau', meta: 'M-Pesa · Sent', amount: '-KSh 2,500', dir: 'out', status: 'ok' },
      { name: 'Salary — Acme Ltd', meta: 'Bank · Received', amount: '+KSh 85,000', dir: 'in', status: 'ok' },
      { name: 'KPLC Prepaid', meta: 'Paybill · 888880', amount: '-KSh 1,000', dir: 'bill', status: 'pending' },
    ],
  },
  {
    date: 'Yesterday',
    items: [
      { name: 'Otieno Ochieng', meta: 'Airtel · Sent', amount: '-KSh 1,200', dir: 'out', status: 'ok' },
      { name: 'Amara Njeri', meta: 'M-Pesa · Received', amount: '+KSh 3,400', dir: 'in', status: 'ok' },
    ],
  },
  {
    date: 'Jul 2, 2026',
    items: [
      { name: 'Naivas Supermarket', meta: 'Buy Goods · Till 5050', amount: '-KSh 4,780', dir: 'bill', status: 'ok' },
      { name: 'Airtime Top-up', meta: 'Self · Safaricom', amount: '-KSh 500', dir: 'bill', status: 'ok' },
    ],
  },
]

const filters = ['All', 'Sent', 'Received', 'Bills'] as const

export default function History() {
  const navigate = useNavigate()
  const [active, setActive] = useState<TabKey>('history')
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')

  const onTab = (key: TabKey) => {
    setActive(key)
    if (key === 'home') navigate('/home')
    if (key === 'payment') navigate('/payment')
    if (key === 'scan') navigate('/scan')
    if (key === 'profile') navigate('/profile')
  }

  const match = (dir: Dir) =>
    filter === 'All' ||
    (filter === 'Sent' && dir === 'out') ||
    (filter === 'Received' && dir === 'in') ||
    (filter === 'Bills' && dir === 'bill')

  return (
    <DeviceFrame>
      <StatusBar color="#14121a" />

      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.title}>History</div>
          <button className={styles.iconBtn} aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="#14121a" strokeWidth="1.8" />
              <path d="M14 14L18 18" stroke="#14121a" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className={styles.filters}>
          {filters.map((f) => (
            <button
              key={f}
              className={`${styles.pill} ${filter === f ? styles.pillActive : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className={styles.scroll}>
          {groups.map((g) => {
            const visible = g.items.filter((i) => match(i.dir))
            if (visible.length === 0) return null
            return (
              <div key={g.date}>
                <div className={styles.dateLabel}>{g.date}</div>
                <div className={styles.list}>
                  {visible.map((i) => (
                    <div className={styles.row} key={i.name + i.meta}>
                      <div
                        className={`${styles.ico} ${
                          i.dir === 'in' ? styles.icoIn : i.dir === 'bill' ? styles.icoBill : styles.icoOut
                        }`}
                      >
                        <DirIcon dir={i.dir} />
                      </div>
                      <div className={styles.body}>
                        <div className={styles.name}>{i.name}</div>
                        <div className={styles.meta}>{i.meta}</div>
                      </div>
                      <div className={styles.right}>
                        <div className={`${styles.amt} ${i.dir === 'in' ? styles.amtIn : styles.amtOut}`}>
                          {i.amount}
                        </div>
                        <div className={`${styles.status} ${i.status === 'ok' ? styles.ok : styles.pending}`}>
                          {i.status === 'ok' ? 'Completed' : 'Pending'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <TabBar active={active} onChange={onTab} />
      </div>
    </DeviceFrame>
  )
}

function DirIcon({ dir }: { dir: Dir }) {
  if (dir === 'in')
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M6 6l10 10M16 8v8H8" stroke="#0F9D58" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  if (dir === 'bill')
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="5" y="3" width="12" height="16" rx="2" stroke="#8E0050" strokeWidth="1.8" />
        <path d="M8 7h6M8 11h6M8 15h3" stroke="#8E0050" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M16 16L6 6M6 14V6h8" stroke="#8E0050" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
