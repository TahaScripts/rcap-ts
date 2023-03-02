import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layout'
import Header from '../components/HeaderCTA'
import { HeaderCopy, ClientDimensions, NavLink, NextImage } from '../interfaces'
import { useState, useEffect, useRef } from 'react'
import { m, useScroll, useTransform, useInView } from "framer-motion"
import LoadText from '../components/LoadText'
import ReactCompareImage from "react-compare-image";
import VideoBG from '../components/VideoBG'
import ReportCTA from '../components/ReportCTA'

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
        <m.div style={{y:v2Parallax}} className="default-padding min-h-screen flex items-center justify-start">
          <div className="text-block shadow-2xl shadow-gray-300 md:max-w-[650px]">
            <h1 className="header">{v2Copy.header}</h1>
            <p dangerouslySetInnerHTML={{__html: v2Copy.paragraph}} className="paragraph !text-justify"></p>
          </div>
        </m.div>
      </section>

      <section ref={sputnikRef}>
        <m.div style={{y: sputnikParallax}} className="default-padding text-center h-full flex flex-col items-center justify-center gap-10">
          <m.div className="flex flex-col items-center pb-10">
            <div className="mb-5">
              <h1 className="font-[700] text-2xl md:text-3xl">{sputnikCopy.subheader}</h1>
            </div>
            <h1 className="font-[900] text-4xl md:text-5xl">{sputnikCopy.header}</h1>
          </m.div>
          <m.div className="flex text-justify md:max-w-[800px] lg:max-w-[1000px] flex-col items-center p-4 md:p-10 bg-[transparent] border border-white">
            <p className="" dangerouslySetInnerHTML={{__html: sputnikCopy.p}}/>
          </m.div>
          <div className="lg:flex flex-row justify-between items-center gap-5 w-full md:max-w-[800px] lg:max-w-[1000px]">
            <div className="mb-5 lg:mb-0 border p-2 h-fit flex items-center justify-center italic gap-2 flex-col border-white max-w-full md:min-w-[500px]">
              <div className="w-full relative aspect-[1.5] border border-white"><Image src={sputnikCopy.img[1] + ".webp"} blurDataURL={sputnikCopy.img[1] + "_blur.webp"} alt='' className="" fill/></div>
              {sputnikCopy.img[0]}
            </div>
            <div className="border h-fit text-justify p-4 md:p-10 flex items-center justify-center gap-2 flex-col border-white">
              <p className="" dangerouslySetInnerHTML={{__html: sputnikCopy.p2}}/>
            </div>
          </div>
        </m.div>
      </section>

      <section ref={apolloRef} className="!bg-[transparent]">
        <div className="default-padding min-h-[screen]">
          <div className="text-block !bg-[transparent] relative mb-[50vh]">
            <m.div style={{scaleX: apolloUnroll}} className="absolute z-[38] md:origin-top-left w-full h-full top-[20px] left-[20px] bg-white bg-opacity-[0.5]"/>
            <m.div style={{scaleX: apolloUnroll}} className="absolute z-[38] md:origin-top-left w-full h-full top-0 left-0 bg-black bg-opacity-[0.9]"/>
            <h1 className="header z-[40] relative">The<br/>Apollo<br/>Program</h1>
          </div>
          <div className="w-full flex flex-wrap gap-4 z-[40] relative">
            {apolloCopy.data.map((block, k) => {
              return block[0] == 'gap' ? <div className="grow"/> : 
              block[0] == 'divide' ? <div className="w-full !min-w-full block relative h-[20vh] bg[red]"/>:
              <m.div className="text-block apollo my-auto" key={k} style={dimensions.width > 999 ? {y: k - 1 > 0 && apolloCopy.data[k - 1][0] == 'gap' ? apolloParallax : apolloReverse} : {}}>
                {block.map((item: any, k2: any) => {
                  return item.type == 'subheader' ? <h1 key={k2} className="subheader">{item.item}</h1> :
                  item.type == 'img' ? <div key={k2} className={`relative w-full ${item.aspect}`}>{dimensions.width < 800 ? <Image alt="" placeholder="blur" fill blurDataURL={item.blur} src={item.url}/> : apolloView && <Image alt="" placeholder="blur" fill blurDataURL={item.blur} src={item.url}/>}</div> : 
                  item.type == 'p' ? <p dangerouslySetInnerHTML={{__html: item.item}} key={k2} className=""></p> : 
                  item.type == 'caption' ? <p dangerouslySetInnerHTML={{__html: item.item}} key={k2} className="caption !text-center"></p> : ''
                })}
              </m.div>
            })}
          </div>

        </div>
      </section>

      <section ref={stationRef} className="">
        <div className="default-padding min-h-screen">
          <h1 className="font-[800] text-3xl md:text-5xl text-center md:mb-20">Early Orbiting Infrastructure</h1>
          <div className="w-full h-full flex flex-col items-center justify-center md:flex-row gap-8">
            <m.div style={{y: stationParallax}} className="text-justify md:text-right w-full p-3 border border-white flex flex-col gap-4 md:p-0 md:border-none md:max-w-[200px] text-left">
              <div className="w-full flex flex-row items-center justify-center">
                <h2 className="font-[500] text-lg">1986 - 2001</h2>
                <div className="grow"/>
                <img src="/static/img/soviet.png" className="max-w-[80px]"/>
              </div>
              <h2 className="font-[700] text-lg">Mir</h2>
              <p className="">was the first continuously inhabited, long-term research station in orbit and was occupied for 12.5 years. Mir was deorbited in March 2001 after funding was cut.</p>
              {dimensions.width < 1000 && 
              <div className="aspect-square w-full relative"><Image alt="" src="/static/img/mir.jpeg" fill/></div>}
            </m.div>
            {dimensions.width > 999 && <div className="grow aspect-square relative">
              <ReactCompareImage leftImage="/static/img/mir.jpeg" rightImage="/static/img/skylab.jpeg" />
            </div>}
            <m.div style={{y: stationParallax}} className="text-justify md:text-left w-full p-3 border border-white flex flex-col gap-4 md:p-0 md:border-none md:max-w-[200px] text-left">
              <div className="w-full flex flex-row items-center justify-center">
                <img src="/static/img/usa.png" className="max-w-[80px]"/>
                <div className="grow"/>
                <h2 className="font-[500] text-lg">1973 - 1974</h2>
              </div>
              <h2 className="font-[700] text-lg">Skylab</h2>
              <p className="">was the first and only space station operated exclusively by the United States. Skylab‘s orbit eventually decayed, and it disintegrated in the atmosphere.</p>
              {dimensions.width < 1000 && 
              <div className="aspect-square w-full relative"><Image alt="" src="/static/img/skylab.jpeg" fill/></div>}
            </m.div>
          </div>
        </div>
      </section>

      <section ref={issRef} className="!bg-[transparent]">
        <div className="default-padding min-h-screen flex flex-col items-center justify-center">
          <div className="text-block backdrop-blur-md !w-fit mb-10">
            <h1 className="subheader text-center">The International Space Station</h1>
          </div>
          <div className="max-w-[800px]">
            <div className="text-block backdrop-blur-md mb-8">
              <p className="text-justify">The ISS has been orbiting Earth since 1999 and has been continuously inhabited by astronauts since 2000.<br/><br/>The permanently crewed orbital laboratory has served as a base for astronauts, a waypoint for exploration, a platform for Earth observation, and a base for microgravity research and manufacturing.<br/><br/>As the treaty between the governing nations comes to an end and as the ISS reaches the end of its useful life, the platform will be decommissioned, leaving a significant gap in the Western world&lsquo;s ability to operate in space.<br/><br/>Despite the retirement of the ISS, the U.S. is committed to sending national astronauts to low Earth orbit (LEO), codified by a 2020 congressional directive to sustain human presence in LEO.</p>
            </div>
            <div className="text-block text-center backdrop-blur-md max-w-[800px]">
              <div className='w-full flex flex-wrap items-center gap-8 justify-center mb-5'>
              {[['nasa', 'USA', 47],['esa', 'Europe', 10], ['roscosmos', 'Russia', 40], ['java', 'Japan', 6], ['csa', 'Canada', 3]].map((i, k) => {
                return <div key={k} className="flex flex-col w-[80px] transition-all hover:scale-[1.1] items-center justify-center"><div className="w-full flex items-center justify-center aspect-square"><img className="w-[90%] invert brightness-[50%] grayscale mb-2" src={`/static/img/iss/` + i[0] + '.svg'}/></div>{i[1]}<br/><div className="flex items-center justify-center gap-2">{i[2]}<img src="/static/img/iss/astronaut.png" className="inline-block grayscale invert max-h-[12px]"/></div></div>
              })}
              </div>
              <div className="flex items-center justify-center gap-1 italic mb-2 text-sm"><img src="/static/img/iss/astronaut.png" className="max-h-[12px] inline-block invert grayscale"/>= Respective agencies' astronauts deployed to ISS, 1999 - Feb 2023</div>
              <p className="!text-center">5 agencies have cooperated for more than a decade to launch and maintain the ISS. </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={shuttleRef} className="!bg-transparent !text-black mt-[10vh]">
        <div className="default-padding min-h-screen flex flex-col items-center justify-center">
          <h1 className="font-[800] text-3xl md:text-7xl text-center">THE SPACE SHUTTLE</h1>
          <h1 className="font-[600] text-xl md:text-4xl text-center">World's First Reusable Rocket</h1>
          <div className="mt-[15vh] w-full shuttle grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-y-[20vh]">
            <div className="relative col col-span-1 aspect-[1.186]">
              
              <Image fill src="/static/img/shuttle/shuttle.webp" blurDataURL="/static/img/shuttle/shuttle_blur.webp" alt=''/>
              <m.div style={{y: shuttleParallax}} className="text-block w-full md:w-fit absolute bottom-0 md:bottom-[-10px] right-0 md:right-[-10px]">
                <h1 className="miniheader mb-2">First Launch</h1>
                <h1 className="subheader !normal-case">April 12th, 1981</h1>
              </m.div>
            </div>
            <div className="col md:pl-8 col-span-1 h-full flex items-center justify-center">
              <m.div style={{y: shuttleParallax}} className="text-block alter relative">
                
                <p>The Shuttle was originally billed as a spacecraft that would be able to launch once a week and maintain low launch costs through amortization over a significant launch cadence.<br/><br/>The Shuttle's incremental per-kg launch costs turned out to be considerably higher than those of expendable launchers. The final cost was estimated to be about $2.1 B per launch and the total program costs are estimated to be $238B (inflation adi.)<br/><br/>NASA launched the shuttle for 135 missions between its 1981 unveiling and its 2011 decommissioning. The vehicle was plagued with safety issues. Two out of the five spacecraft were destroyed in accidents (Challenger & Columbia), killing 14 astronauts, the largest loss of life in space exploration.<br/><br/>The Shuttle was an ultimate reflection of the bloated political infrastructure that resulted in a highly inefficient NASA decision making process.</p>
              </m.div>
            </div>
              
          </div>
        </div>
      </section>

      <section ref={satRef} className="!bg-transparent !text-black">
        <div className="default-padding min-h-screen z-[41] relative flex flex-col items-center">
          <m.div style={{x: satHeader}} className="md:w-fit md:flex flex-row relative">
            <h1 className="font-[700] text-4xl bg-white text-black py-8 px-6">1990s</h1>
            <h1 className="font-[700] text-right md:text-center text-4xl bg-black text-white py-8 px-6">Satellite Internet & Communications</h1>
          </m.div>
          <div className="mt-10 md:mt-[20vh] w-full grid grid-cols-1 lg:grid-cols-2 gap-10 gap-y-20 md:gap-y-[20vh]">
              <div className="col col-span-1 h-full flex items-center justify-center">
                <m.div style={{y: satParallax}} className="relative bg-white bg-opacity-[0.5] p-8">
                  <div className="corner corner-tl"/>
                  <div className="corner corner-bl"/>
                  <div className="corner corner-tr"/>
                  <div className="corner corner-br"/>
                  <p className="text-lg font-[500]">Satellite internet upstarts emerged in the mid to late-90s as space became accessible thanks to the Shuttle and cheap capital of the Dot-com Bubble.<br/><br/>The significant losses that most investors experienced while investing in satellite companies like Iridium or Teledesic were attributable to a few common factors including: (1) high upfront capex, (2) market risk, and (3) innovation in terrestrial networks.<br/><br/>For example, Iridium is a global satellite phone company that was backed by Motorola. The Iridium constellation of 66 satellites to provide global wireless service cost $5B. It filed for bankruptcy in 1999 after defaulting on $1.5B in debt.</p>
                </m.div>
              </div>
              <div className="col col-span-1 relative aspect-[1.5]">
                <Image alt='' src="/static/img/shuttle/iridium.webp" blurDataURL="/static/img/shuttle/iridium_blur.webp" fill/>
                <m.div style={{y: satParallax}} className="text-block !py-5 w-fit !text-center !bg-white !text-black absolute bottom-0 right-0">
                  <h1 className="caption">Model of first-generation satellite from Iridium</h1>
                </m.div>
              </div>
              <div className="col col-span-1 flex items-center justify-center lg:col-span-2">
                <m.div style={{y: satParallax}} className="w-full bg-white bg-opacity-[0.5] md:max-w-[800px] p-8 relative">
                  <div className="corner shorter corner-tl"/>
                    <div className="corner shorter corner-bl"/>
                    <div className="corner shorter corner-tr"/>
                    <div className="corner shorter corner-br"/>
                  <p className="text-lg text-justify font-[500]">Despite aggressive marketing efforts, the company experienced a significant shortfall in subscriber additions - 20K one year after launch, vs. its original 500K forecast. Innovation in terrestrial cellular networks massively shrunk their potential market.<br/><br/>Iridium wasn't the only company giving satellite internet a try in the 90s - most went bankrupt, requiring the businesses to pivot.</p>
                </m.div>
              </div>
              <div className="col col-span-1 lg:col-span-2">
                <m.div style={{y:satParallax}} className="w-full h-full overflow-scroll max-w-full md:overflow-visible md:flex items-center justify-center ">
                <div className="w-[1000px] md:w-full md:max-w-[1000px] bg-white bg-opacity-[0.5] backdrop-blur-sm">
                  <div className="w-full bg-black text-white grid grid-cols-10 py-10 px-10">
                    <div className="sat-header sat-status">
                      Status
                    </div>
                    <div className="sat-header sat-company">
                      Company
                    </div>
                    <div className="sat-header sat-desc">
                      Result
                    </div>
                  </div>
                  {satCopy[0].map((r) => 
                  <div className="w-full grid grid-cols-10 px-6 transition-all md:hover:scale-[1.1]">
                    <div className="sat-status flex items-center justify-center">
                      {r[0] ? 'true' : 'false'}
                    </div>
                    <div className="sat-company flex items-center p-10 flex items-center justify-center">
                      <img className="max-h-[50px] grayscale invert brightness-[400%] max-w-[200px]" src={'/static/img/shuttle/' + r[1] + '.webp'}/>
                    </div>
                    <div className="sat-desc flex items-center justify-center">
                      {r[2]}
                    </div>
                  </div>)}
                </div>
                </m.div>
              </div>
          </div>
        </div>
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