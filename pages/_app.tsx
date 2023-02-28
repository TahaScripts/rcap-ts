import type { AppProps } from 'next/app'
import {LazyMotion} from 'framer-motion'
import {domAnimation} from 'framer-motion'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <LazyMotion strict features={domAnimation}><Component {...pageProps} /></LazyMotion>
}