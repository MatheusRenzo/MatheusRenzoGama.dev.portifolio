import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import { Insights } from '../components/Insights'
import { RouteTracker } from '../components/RouteTracker'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <Insights />
      <RouteTracker />
    </>
  )
}