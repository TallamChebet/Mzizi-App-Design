import { useNavigate } from 'react-router-dom'
import DeviceFrame from '../components/DeviceFrame'
import styles from './Splash.module.css'

export default function Splash() {
  const navigate = useNavigate()
  return (
    <DeviceFrame lightIndicator>
      <div className={styles.splash} onClick={() => navigate('/onboarding')}>
        <img className={styles.wordmark} src="/img/mzizi-wordmark.png" alt="MZIZI" />
        <div className={styles.tagline}>Rooted in you</div>
        <img className={styles.swoosh} src="/img/mzizi-icon.png" alt="" />
      </div>
    </DeviceFrame>
  )
}
