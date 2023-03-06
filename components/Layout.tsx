import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Navbar from './Navbar'
import { MotionValue } from 'framer-motion'
import { NavLink } from "../interfaces";

type Props = {
  children?: ReactNode
  title?: string,
  scroll: MotionValue,
  ctaOpen?: () => void,
  style: string,
}

const navURL: NavLink = {url: '/', label: 'Portfolio'}


const Layout = ({ children, style = '', title, scroll, ctaOpen = () => {}}: Props) => (
  <div className={style}>
    <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#000000"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&display=swap" rel="stylesheet"/>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className={style}>
      <Navbar ctaOpen={ctaOpen} scroll={scroll}/>
    </header>
    {children}
    <footer className='!z-[40] relative !text-white py-10'>
      <div className="default-padding !py-[0] flex flex-col gap-10 lg:flex-row">
      <div className="w-full lg:w-fit">
                    <a className="block underline text-3xl font-[400]" href="https://twitter.com/_rcapital_" target='_blank' rel="noreferrer">Twitter</a>
                    <a className="block underline text-3xl font-[400] mt-2" href="https://www.linkedin.com/company/republic-capital" target='_blank' rel="noreferrer">LinkedIn</a>
                </div>
                <div className="w-fit">
                    <a className="block text-sm uppercase mb-6">About</a>
                    <a href="republiccapital.co/team" target='_blank' rel="noreferrer" className="block text-sm">Team</a>
                    <a href="republiccapital.co/privacy" target='_blank' rel="noreferrer" className="block text-sm">Privacy Policy</a>
                    <a href="republiccapital.co/disclaimer" target='_blank' rel="noreferrer" className="block text-sm">Disclaimer</a>
                    <a href="republiccapital.co/cookie" target='_blank' rel="noreferrer" className="block text-sm">Cookie</a>
                    <a href="republiccapital.co/terms-of-service" target='_blank' rel="noreferrer" className="block text-sm">Terms of Service</a>
                </div>
                <div className="w-fit">
                    <a className="block text-sm uppercase mb-6">Our Family</a>
                    <a href="group.republic.com" target='_blank' rel="noreferrer" className="block text-sm">Republic</a>
                    <a href="republic.com" target='_blank' rel="noreferrer" className="block text-sm">Republic Retail</a>
                    <a href="republiccrypto.com" target='_blank' rel="noreferrer" className="block text-sm">Republic Crypto</a>
                </div>
                <div className="w-fit">
                    <a className="block text-sm uppercase mb-6">Subscribe</a>
                    <a href="https://dashboard.mailerlite.com/forms/180980/69594835142575855/share" target='_blank' rel="noreferrer" className="block text-sm">Subscribe</a>
                </div>
        
      </div>
    </footer>
  </div>
)

export default Layout
