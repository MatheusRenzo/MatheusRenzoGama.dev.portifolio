import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import { Insights } from '../components/Insights'
import { SpeedInsightsTest } from '../components/SpeedInsightsTest'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <Insights />
      <SpeedInsightsTest />
    </>
  )
}