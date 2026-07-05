import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeviceFrame from '../components/DeviceFrame'
import styles from './Scan.module.css'

export default function Scan() {
  const navigate = useNavigate()
  const [flash, setFlash] = useState(false)

  return (
    <DeviceFrame lightIndicator>
      <div className={styles.page}>
        <div className={styles.camera} />

        {/* top bar */}
        <div className={styles.topbar}>
          <button className={styles.topBtn} aria-label="Close" onClick={() => navigate('/home')}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <div className={styles.topTitle}>Scan to Pay</div>
          <button
            className={`${styles.topBtn} ${flash ? styles.on : ''}`}
            aria-label="Toggle flash"
            onClick={() => setFlash((f) => !f)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M11 2L4 11h5l-1 7 7-9h-5l1-7z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" fill={flash ? '#fff' : 'none'} />
            </svg>
          </button>
        </div>

        {/* scan window */}
        <div className={styles.scanArea}>
          <div className={styles.frame}>
            <span className={`${styles.corner} ${styles.tl}`} />
            <span className={`${styles.corner} ${styles.tr}`} />
            <span className={`${styles.corner} ${styles.bl}`} />
            <span className={`${styles.corner} ${styles.br}`} />
            <span className={styles.scanLine} />
          </div>
          <div className={styles.hint}>
            Align the merchant&apos;s QR code
            <br />
            within the frame to pay
          </div>
        </div>

        {/* bottom sheet */}
        <div className={styles.sheet}>
          <div className={styles.sheetHandle} />
          <div className={styles.sheetRow}>
            <button className={styles.sheetBtn}>
              <span className={styles.ico}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="#6d28d9" strokeWidth="1.8" />
                  <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="#6d28d9" strokeWidth="1.8" />
                  <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="#6d28d9" strokeWidth="1.8" />
                  <rect x="14" y="14" width="5" height="5" rx="1" fill="#6d28d9" />
                </svg>
              </span>
              <span>My QR</span>
            </button>
            <button className={styles.sheetBtn}>
              <span className={styles.ico}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="#6d28d9" strokeWidth="1.8" />
                  <circle cx="8.5" cy="10" r="1.8" stroke="#6d28d9" strokeWidth="1.6" />
                  <path d="M4 17l5-4 4 3 3-2 4 3" stroke="#6d28d9" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              </span>
              <span>Upload</span>
            </button>
            <button className={styles.sheetBtn}>
              <span className={styles.ico}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="3" width="14" height="18" rx="2.5" stroke="#6d28d9" strokeWidth="1.8" />
                  <path d="M8 7h8M8 11h8M8 15h4" stroke="#6d28d9" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <span>Paybill</span>
            </button>
          </div>
          <button className={styles.payManual} onClick={() => navigate('/payment')}>
            Enter amount manually
          </button>
        </div>
      </div>
    </DeviceFrame>
  )
}
