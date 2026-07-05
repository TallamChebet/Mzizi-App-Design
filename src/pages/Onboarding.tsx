import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeviceFrame from '../components/DeviceFrame'
import StatusBar from '../components/StatusBar'
import styles from './Onboarding.module.css'

const TOTAL = 3

export default function Onboarding() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const startX = useRef(0)

  const go = (i: number) => setIndex(Math.max(0, Math.min(TOTAL - 1, i)))

  const next = () => {
    if (index < TOTAL - 1) go(index + 1)
    else navigate('/home')
  }

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startX.current
    if (Math.abs(dx) < 50) return
    go(dx < 0 ? index + 1 : index - 1)
  }

  return (
    <DeviceFrame>
      <StatusBar color="#14121a" />
      <div
        className={styles.viewport}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className={styles.track}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {/* Slide 1 */}
          <section className={styles.slide}>
            <div className={`${styles.bg} ${styles.bg1}`} />
            <img className={styles.art} src="/img/onboarding-1.png" alt="" />
            <div className={styles.content}>
              <div className={styles.head}>
                <h1 className={styles.title}>You left home.</h1>
                <p className={styles.sub}>
                  But your roots will
                  <br />
                  never leave you.
                </p>
              </div>
              <div className={styles.collage} />
              <div className={styles.foot}>
                <p className={styles.desc}>
                  Mzizi helps you send money back to what matters — fast, easy,
                  and always secure.
                </p>
                <Dots index={index} />
                <button className={styles.btn} onClick={next}>
                  Continue
                </button>
              </div>
            </div>
          </section>

          {/* Slide 2 */}
          <section className={styles.slide}>
            <div className={`${styles.bg} ${styles.bg2}`} />
            <img className={styles.art} src="/img/onboarding-2.png" alt="" />
            <div className={styles.content}>
              <div className={styles.head}>
                <h1 className={styles.title}>Send Money</h1>
              </div>
              <div className={styles.collage} />
              <div className={styles.foot}>
                <p className={styles.desc}>
                  No hidden fees. No stress. Just a clear, seamless way to support
                  your people — wherever they are.
                </p>
                <Dots index={index} />
                <button className={styles.btn} onClick={next}>
                  Continue
                </button>
              </div>
            </div>
          </section>

          {/* Slide 3 */}
          <section className={styles.slide}>
            <div className={`${styles.bg} ${styles.bg3}`} />
            <img className={styles.art} src="/img/onboarding-3.png" alt="" />
            <div className={styles.content}>
              <div className={styles.head}>
                <h1 className={styles.title}>One Family</h1>
                <p className={styles.sub}>One Transfer. One tap</p>
              </div>
              <div className={styles.collage} />
              <div className={styles.foot}>
                <p className={styles.desc}>
                  Send money your way—Mzizi connects effortlessly to M-Pesa,
                  T-Kash, Airtel Money, and every bank in Kenya, with transfers
                  happening in near real-time.
                </p>
                <Dots index={index} />
                <button className={styles.btn} onClick={next}>
                  Continue
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DeviceFrame>
  )
}

function Dots({ index }: { index: number }) {
  return (
    <div className={styles.dots}>
      {Array.from({ length: TOTAL }).map((_, i) => (
        <span
          key={i}
          className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
        />
      ))}
    </div>
  )
}
