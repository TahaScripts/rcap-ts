import Image from 'next/image'
import Layout from '../components/Layout'
import Header from '../components/HeaderCTA'
import { HeaderCopy, ClientDimensions, NavLink, NextImage } from '../interfaces'
import { useState, useEffect, useRef } from 'react'
import { m, useScroll, useTransform, useInView } from "framer-motion"
import ReactCompareImage from "react-compare-image";
import VideoBG from '../components/VideoBG'
import ReportCTA from '../components/ReportCTA'
import V2 from "../components/content/V2"
import Sputnik from '../components/content/Sputnik'
import Apollo from '../components/content/Apollo'
import Station from '../components/content/Station'
import ISS from '../components/content/ISS'
import Shuttle from '../components/content/Shuttle'
import Satellite from '../components/content/Satellite'

export default function IndexPage(){
  // initialState
  const globalScroll = useScroll();
  const [navLinks, setNavLinks] = useState<Array<NavLink>>([{url: 'https://www.republiccapital.co/portfolio', label: "Portfolio"}, {url: 'https://www.republiccapital.co/space', label: "Space Report"}])
  
  // Copy State
  const [hCopy, setHCopy] = useState<HeaderCopy>({
    img: 
    {
      desktop: "/static/img/header.webp",
      desktop_blur: "/static/img/header_blur.webp",
      mobile: "/static/img/header_m.webp",
      mobile_blur: "/static/img/header_m_blur.webp",
    },
    h1_1: "Republic Capital",
    h1_2: "Space Report",
    h2: "More than just rockets. A comprehensive & sector-wide review of space and aeronautics, from seed level to orbit.",
    btn1: "A brief history of the space industry",
    btn1_fn: () => {scrollTo({behavior: 'smooth',left: 0, top: introRef.current.getBoundingClientRect().top})},
    btn2: "Access full report",
    btn2_fn: () => {setReportState(true);},
  })

  const [v2Copy, setv2Copy] = useState({
    header: 'The V2 Rocket',
    paragraph: '<strong>Seventy-eight years ago, humankind saw the launch of its first artificial object into space.</strong><br/><br/>The V2 rocket was the world&apos;s first large-scale liquid-propellant rocket, developed between 1936 and 1942 in Nazi Germany. Each V2 was 46 ft high and carried 900 kg of explosives.<br/><br/>Although there is no exact figure, estimates suggest that several thousand people were killed by weaponized V2s during WWII.<br/><br/>After the war, von Braun shared his knowledge of the V2 rocket with the U.S. and eventually accepted the role of Director (some say not by choice) at NASA&apos;s Marshall Space Flight Center.'
  })

  const [sputnikCopy, setSputnikCopy] = useState({
    subheader: "October 4th, 1957",
    header: "Soviet Union launches Sputnik",
    p: "Sputnik was an aluminum sphere (about the size of a beach ball) with four thin legs. The satellite was entirely full with communications equipment. It orbited space for three months emitting a regular pattern of beeps.<br/><br/>The launch surprised and concerned many Americans, including politicians who criticized President Eisenhower for failing to take the space race seriously. It shattered the perception created by American propaganda of the United States as the technological superpower, and the Soviet Union as a backward country.",
    p2: "The satellite's development and success demonstrated how space and aeronautics research would reach critical milestones. A Soviet engineer involved in developing the military proposal for Sputnik stated that &quot;the satellite is an inevitable stage on the path of the rocket development, which would make possible interplanetary travel.&quot; His proposal reflected how each the knowledge learned to achieve each goal by a national space program is immediately relevant to achieving the next one. First satellite, first animal, first human...<br/><br/>1957's launch kicked off the Cold War's space race. An American satellite was finally launched from Cape Canaveral in 1958.",
    img: ["Soviet-Union technician inspecting Sputnik 1", "/static/img/sputnik/tech"]
  })

  const [apolloCopy, setApolloCopy] = useState({
    data: [
      [
        {type: 'subheader', item: 'APOLLO 8',},
        {type: 'img', url:"/static/img/apollo/a8_crew.webp",blur: "/static/img/apollo/a8_crew_blur.webp",aspect: 'aspect-[1.38]'},
        {type: 'caption', item: 'Crew members (left to right):<br/>Frank F. Borman II, James A. Lovell Jr., William A. Anders'}
      ],
      ['gap'],
      [{
        type: 'p',
        item: "The Apollo program was the third United States human spaceflight program carried out by NASA, which succeeded in landing the first humans on the Moon in 1969. The United States spent approximately $260B (inflation adjusted) on the Apollo program."
      }],
      
      [
        {type: 'p', item: "Apollo 8 was also significant for its role in preparing for the later moon landing missions. The mission tested the lunar module in orbit and provided valuable data for future missions. The successful completion of the Apollo 8 mission boosted public and political support for the space program and helped to pave the way for the Apollo 11 mission, which saw the first moon landing in July 1969.<br/><br/>Overall, the Apollo 8 mission marked a turning point in the history of space exploration and was a triumph for the United States in the midst of the Cold War."}
      ],
      ['gap'],
      [
        {type: 'img', url:"/static/img/apollo/a8_earth.webp",blur: "/static/img/apollo/a8_earth_blur.webp",aspect: 'aspect-square'},
        {type: 'p', item: "The highlight of the mission was the famous 'Earthrise' photograph, taken by Anders, which showed the Earth rising above the moon's horizon. This photo became an iconic image of the 1960s and helped to popularize the idea of space exploration."}
      ],
      ['divide'],
      [
        {type: 'img', url:"/static/img/apollo/a11_nyt.webp",blur: "/static/img/apollo/a11_nyt_blur.webp",aspect: 'aspect-square'},
        {type: 'caption', item: 'New York Times, Monday, July 21, 1969'}
      ],
      ['gap'],
      [
        {type: 'subheader', item: 'APOLLO 11'},
        {
          type: 'p',
          item: 'Apollo 11 was the first mission in which humans landed on the moon and returned safely to Earth. The mission was launched on July 16, 1969 and consisted of three astronauts: Neil Armstrong, Buzz Aldrin, and Michael Collins. Armstrong and Aldrin became the first humans to walk on the moon while Collins orbited above.<br/><br/>The moon landing marked a major milestone in space exploration and was seen as a victory for the United States in the "Space Race" with the Soviet Union. The Apollo 11 mission remains one of the most significant events in human history and has inspired countless generations to explore and push the boundaries of space exploration.'
        }
      ],
      [{type: 'img', url:"/static/img/apollo/apollo11_moon.webp",blur: "/static/img/apollo/apollo11_moon_blur.webp",aspect: 'aspect-[1.5]'},],
      ['gap'],
      [{type: 'img', url:"/static/img/apollo/apollo11_moon2.webp",blur: "/static/img/apollo/apollo11_moon2_blur.webp",aspect: 'aspect-[1.6]'},],
      ['divide'],
      [
        {type: 'subheader', item: 'APOLLO 17'},
        {
          type: 'p',
          item: 'The Apollo 17 mission was the final manned mission to the moon as part of the Apollo program. Launched on December 7, 1972, the mission was crewed by Commander Gene Cernan, Lunar Module Pilot Harrison Schmitt, and Command Module Pilot Ronald Evans. This mission marked the end of the U.S. manned moon landing program and was the longest and most scientifically significant of all the Apollo missions.'
        }
      ],
      ['gap'],
      [{type: 'img', url:"/static/img/apollo/a17.webp",blur: "/static/img/apollo/a17_blur.webp",aspect: 'aspect-[0.95]'},],
    ]
  })

  const [reportState, setReportState] = useState(false);


  const landingRef = useRef(null);
  const landingProgress = useScroll({ offset: ["start start", "end start"]})
  
  const introRef = useRef(null);
  const introProgress = useScroll({target: introRef, offset: ["start start", "end start"]})
  const introParallax = useTransform(introProgress.scrollYProgress, [0, 1], [200, -200])

  const v2Ref = useRef(null);
  const v2Progress = useScroll({target: v2Ref, offset: ["start end", "end start"]})
  const v2Parallax = useTransform(v2Progress.scrollYProgress, [0, 1], [200, -200])
  const v2Opacity = useTransform(v2Progress.scrollYProgress, [0.1, 0.3, 0.7, 1], [0, 1, 1, 0])
  const v2View = useInView(v2Ref, {
    margin: "-100px 0px 100px 0px"
  })

  const sputnikRef = useRef(null);
  const sputnikProgress = useScroll({target: sputnikRef, offset: ["start end", "end start"]})
  const sputnikParallax = useTransform(sputnikProgress.scrollYProgress, [0, 1], [100, -100])

  const apolloRef = useRef(null);
  const apolloProgress = useScroll({target: apolloRef, offset: ["start end", "end start"]})
  const apolloParallax = useTransform(apolloProgress.scrollYProgress, [0, 1], [100, -100])
  const apolloReverse = useTransform(apolloProgress.scrollYProgress, [0, 1], [-100, 100])
  const apolloOpacity = useTransform(apolloProgress.scrollYProgress, [0.15, 0.3, 0.5, 0.8], [0, 1, 1, 0])
  const apolloView = useInView(apolloRef, {
    margin: "-100px 0px 100px 0px"
  })
  const apolloUnroll = useTransform(apolloProgress.scrollYProgress, [0, 0.2], [0, 1])

  const stationRef = useRef(null);
  const stationProgress = useScroll({target: stationRef, offset: ["start end", "end start"]})
  const stationParallax = useTransform(stationProgress.scrollYProgress, [0, 1], [100, -100])
  const stationView = useInView(stationRef, {
    margin: "-50px 0px 50px 0px"
  })

  const issRef = useRef(null);
  const issProgress = useScroll({target: issRef, offset: ["start end", "end start"]})
  const issOpacity = useTransform(issProgress.scrollYProgress, [0.25, 0.4, 0.7, 1], [0, 1, 1, 0])
  const issParallax = useTransform(issProgress.scrollYProgress, [0, 1], [200, -200])
  const issView = useInView(issRef, {
    margin: "-50px 0px 50px 0px"
  })

  const shuttleRef = useRef(null);
  const shuttleProgress = useScroll({target:shuttleRef, offset: ["start end", "end start"]})
  const shuttleParallax = useTransform(shuttleProgress.scrollYProgress, [0, 1], [200, -200])

  const satRef = useRef(null);
  const satProgress = useScroll({target:satRef, offset: ["start end", "end start"]})
  const satParallax = useTransform(satProgress.scrollYProgress, [0, 1], [200, -200])
  const satHeader = useTransform(satProgress.scrollYProgress, [0, 0.2], [-200, 0])
  const satCopy = useState([[true, 'iridium_logo', 'The original Iridium constellation still operates with 66 satellites in orbit today. While the company did not enjoy the success it set out for, it did survive bankruptcy, unlike other competitors'], [true, 'globalstar', "Globalstar was operating a $1.8B, 48 satellite LEO constellation at $1.79 / minute pricing before filing Chapter 11 in 2001. Today, it's partnered with Apple to provide emergency service for the iPhone 14"], [false, 'tele', '  Teledesic was a Bill Gates-backed, $9B, 840 satellite LEO constellation aiming to provide 700 Mbit/s downlinks. Bankruptcy protection filings suspended development in October 2002'], [false, 'trw', '  TRW abandoned its $3.2B Odyssey satellite communications project in 1997, instead opting to acquire an equity interest in the London-based ICO satellite constellation group']])  
  
  const endRef = useRef(null);
  const endProgress = useScroll({target: endRef, offset: ["start end", "end start"]})
  const endBGOpacity = useTransform(endProgress.scrollYProgress, [0, 0.3], [1, 0])
  const endParallax = useTransform(endProgress.scrollYProgress, [0, 1], [-200, 200])

  // State-update with client browser dimensions
  const [dimensions, setDimensions] = useState<ClientDimensions>({height: 0, width: 0});
  useEffect(() => {
    setDimensions({width: window.innerWidth, height: window.innerHeight});
    const resize = () => {setDimensions({width: window.innerWidth, height: window.innerHeight});}
    window.addEventListener('resize', resize);
    return () => {window.removeEventListener('resize', resize);}
  }, [])

  useEffect(() => {
    let windowPos = window.scrollY
    reportState ? document.body.classList.add('overlay-no-scroll') : document.body.classList.remove('overlay-no-scroll')
    document.body.style.top = String(windowPos) + 'px'
  }, [reportState])

  return (
    <Layout title="Space Report | Republic Capital" scroll={globalScroll.scrollYProgress} ctaOpen={() => {setReportState(true)}}>
      {reportState && <ReportCTA isOpen={reportState} onClose={() => {setReportState(false);}}/>}
      <m.div style={{opacity: endBGOpacity}} className="fixed w-screen max-w-screen max-h-screen overflow-hidden h-screen top-0 left-0 z-[30]">
        <Image className={`z-[30] transition-all`} src="/static/img/bg_.webp" priority blurDataURL='/static/img/bg_blur.webp' placeholder='blur' layout="fill" alt="BG"/>
        {v2View && <VideoBG dimensions={dimensions} poster='/static/img/bg_' motionStyle={v2Opacity} url="/static/vid/v2.mp4" mobileURL="/static/vid/v2_m.mp4"/>}
        {apolloView && <VideoBG dimensions={dimensions} motionStyle={apolloOpacity} url="/static/vid/apollo11.mp4"/>}
        {issView && <VideoBG dimensions={dimensions} motionStyle={issOpacity} url="/static/vid/iss.mp4"/>}
      </m.div>

      <Header headerCopy={hCopy} dimensions={dimensions} bgMotion={landingProgress.scrollYProgress}/>
      
      <section ref={introRef} className="!bg-[transparent]">
        <m.div style={{y: introParallax}} className="default-padding h-full flex flex-col items-center justify-center !text-black">
          <m.h1 initial={{opacity: 0}} animate={{opacity:1}} transition={{duration:0.7, delay: 0.3}} className="font-roboto text-3xl md:text-6xl font-[700]">Welcome to the</m.h1>
          <m.h1 initial={{opacity: 0}} animate={{opacity:1}} transition={{duration:0.7, delay: 0.6}} className="font-roboto text-5xl md:text-7xl font-[700] mt-4">next frontier</m.h1>
        </m.div>
      </section>

      <section ref={v2Ref} className="!bg-[transparent]">
        <V2 header={v2Copy.header} p={v2Copy.paragraph} parallax={v2Parallax}/>
      </section>

      <section ref={sputnikRef}>
        <Sputnik parallax={sputnikParallax} subheader={sputnikCopy.subheader} header={sputnikCopy.header} p={sputnikCopy.p} p2={sputnikCopy.p2} img={sputnikCopy.img}/>
      </section>

      <section ref={apolloRef} className="!bg-[transparent]">
        <Apollo view={apolloView} parallax={apolloParallax} reverse={apolloReverse} unroll={apolloUnroll} dimensions={dimensions} data={apolloCopy.data}/>
      </section>

      <section ref={stationRef} className="">
        <Station parallax={stationParallax} dimensions={dimensions}/>
      </section>

      <section ref={issRef} className="!bg-[transparent]">
        <ISS/>
      </section>

      <section ref={shuttleRef} className="!bg-transparent !text-black mt-[10vh]">
        <Shuttle parallax={shuttleParallax}/>
      </section>

      <section ref={satRef} className="!bg-transparent !text-black">
        <Satellite parallax={satParallax} header={satHeader} copy={satCopy}/>
      </section>

      <section ref={endRef} className="!bg-[transparent] !mb-[0]">
        <div className="default-padding min-h-screen text-center flex flex-col items-center justify-center">
          <m.div style={{y:endParallax}} className="max-w-[900px]">
            <h1 className="text-2xl">However, the demand for space and aeronautics technology has grown exponentially, leaving room for a new breed of private space corporations to fulfill contracts and push humanity closer to the stars.</h1>
            <h1 className="text-4xl bg-white p-3 text-black font-[700] my-24">We think it's the investment opportunity of a lifetime.</h1>
            
            <div className="w-fit mx-auto">
              <h1 className="text-2xl font-[600] italic mb-10">Learn why Republic Capital is all-in on deep space tech.</h1>
              <button onClick={(e) => {e.preventDefault(); setReportState(true);}} className="transition-all hover:bg-white hover:text-black text-xl bg-transparent w-full border-2 border-white px-3 py-4 text-center font-[800] uppercase">Access Space Report</button>
            </div>
          </m.div>
        </div>
      </section>
    </Layout>
  )
}

/**
 * 
•
•
•

Iridium wasn't the only company giving satellite internet a try in the 90s - most went bankrupt, requiring the businesses to pivot
Status
Company
Result
• iridium
Globalstar®
Teledesic
 */