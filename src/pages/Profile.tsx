import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeviceFrame from '../components/DeviceFrame'
import StatusBar from '../components/StatusBar'
import TabBar, { type TabKey } from '../components/TabBar'
import styles from './Profile.module.css'

type Row = { key: string; label: string; value?: string; icon: JSX.Element }

const account: Row[] = [
  { key: 'personal', label: 'Personal details', icon: personIcon() },
  { key: 'linked', label: 'Linked accounts', value: 'M-Pesa, Bank', icon: linkIcon() },
  { key: 'cards', label: 'Cards', value: '2 active', icon: cardIcon() },
  { key: 'security', label: 'Security & PIN', icon: shieldIcon() },
]

const prefs: Row[] = [
  { key: 'notif', label: 'Notifications', icon: bellIcon() },
  { key: 'lang', label: 'Language', value: 'English', icon: globeIcon() },
  { key: 'currency', label: 'Currency', value: 'KSh', icon: coinIcon() },
]

const support: Row[] = [
  { key: 'help', label: 'Help center', icon: helpIcon() },
  { key: 'terms', label: 'Terms & Privacy', icon: docIcon() },
]

export default function Profile() {
  const navigate = useNavigate()
  const [active, setActive] = useState<TabKey>('profile')

  const onTab = (key: TabKey) => {
    setActive(key)
    if (key === 'home') navigate('/home')
    if (key === 'payment') navigate('/payment')
    if (key === 'scan') navigate('/scan')
    if (key === 'history') navigate('/history')
  }

  return (
    <DeviceFrame>
      <StatusBar color="#14121a" />

      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.title}>Profile</div>
          <button className={styles.iconBtn} aria-label="Settings">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="2.6" stroke="#14121a" strokeWidth="1.6" />
              <path d="M10 3v2M10 15v2M3 10h2M15 10h2M5 5l1.5 1.5M13.5 13.5L15 15M15 5l-1.5 1.5M6.5 13.5L5 15" stroke="#14121a" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className={styles.scroll}>
          {/* profile card */}
          <div className={styles.card}>
            <img
              className={styles.avatar}
              src="https://i.pravatar.cc/120?img=12"
              alt="Jansen"
              onError={(e) => ((e.target as HTMLImageElement).style.visibility = 'hidden')}
            />
            <div className={styles.info}>
              <div className={styles.name}>Jansen Mwangi</div>
              <div className={styles.email}>jansen.m@gmail.com</div>
              <div className={styles.tier}>
                <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 1l1.4 3.3L11.5 5 8.8 7.4l.8 3.6-3.1-1.9-3.1 1.9.8-3.6L1.5 5l3.6-.7L6.5 1z" fill="#fff" />
                </svg>
                Platinum Member
              </div>
            </div>
            <button className={styles.edit} aria-label="Edit">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M12 3l3 3-8 8H4v-3l8-8z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* stats */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statVal}>KSh 47.7K</div>
              <div className={styles.statLabel}>Balance</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statVal}>128</div>
              <div className={styles.statLabel}>Transfers</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statVal}>14</div>
              <div className={styles.statLabel}>Recipients</div>
            </div>
          </div>

          <Group label="Account" rows={account} />
          <Group label="Preferences" rows={prefs} />
          <Group label="Support" rows={support} />

          <button className={styles.logout} onClick={() => navigate('/')}>
            Log out
          </button>
          <div className={styles.version}>Mzizi Pay · v1.0.0</div>
        </div>

        <TabBar active={active} onChange={onTab} />
      </div>
    </DeviceFrame>
  )
}

function Group({ label, rows }: { label: string; rows: Row[] }) {
  return (
    <>
      <div className={styles.groupLabel}>{label}</div>
      <div className={styles.group}>
        {rows.map((r) => (
          <div className={styles.item} key={r.key}>
            <div className={styles.itemIco}>{r.icon}</div>
            <div className={styles.itemLabel}>{r.label}</div>
            {r.value && <div className={styles.itemValue}>{r.value}</div>}
            <svg className={styles.chevron} width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M6 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ))}
      </div>
    </>
  )
}

/* --- icons --- */
function personIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="7" r="3" stroke="#6d28d9" strokeWidth="1.6" />
      <path d="M4 16c0-3 2.7-5 6-5s6 2 6 5" stroke="#6d28d9" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
function linkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M8 12l4-4M7 13l-1 1a2.5 2.5 0 01-3.5-3.5l2-2M13 7l1-1a2.5 2.5 0 013.5 3.5l-2 2" stroke="#6d28d9" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
function cardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2.5" y="5" width="15" height="10" rx="2" stroke="#6d28d9" strokeWidth="1.6" />
      <path d="M2.5 8h15" stroke="#6d28d9" strokeWidth="1.6" />
    </svg>
  )
}
function shieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2l6 2.5V9c0 4-2.6 6.5-6 8-3.4-1.5-6-4-6-8V4.5L10 2z" stroke="#6d28d9" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7.5 10l1.8 1.8L13 8" stroke="#6d28d9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function bellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 8a5 5 0 0110 0c0 4 1.5 5 1.5 5H3.5S5 12 5 8z" stroke="#6d28d9" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 16a2 2 0 004 0" stroke="#6d28d9" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
function globeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="#6d28d9" strokeWidth="1.6" />
      <path d="M3 10h14M10 3c2 2 2 12 0 14M10 3c-2 2-2 12 0 14" stroke="#6d28d9" strokeWidth="1.4" />
    </svg>
  )
}
function coinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="#6d28d9" strokeWidth="1.6" />
      <path d="M10 6v8M8 8h3a1.5 1.5 0 010 3H8m0 0h3.5" stroke="#6d28d9" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
function helpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="#6d28d9" strokeWidth="1.6" />
      <path d="M8 8a2 2 0 113 1.7c-.6.4-1 .8-1 1.8" stroke="#6d28d9" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="14" r="0.9" fill="#6d28d9" />
    </svg>
  )
}
function docIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 2.5h6l4 4V17a.5.5 0 01-.5.5h-9A.5.5 0 015 17V2.5z" stroke="#6d28d9" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M11 2.5V6.5h4M7.5 11h5M7.5 14h5" stroke="#6d28d9" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
