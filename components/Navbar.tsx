import {m, MotionValue} from "framer-motion";
import {useTransform} from "framer-motion";
import { NavLink } from "../interfaces";

type Props = {
    scroll: MotionValue,
    navLinks?: NavLink[],
    current?: string,
    ctaOpen?: () => void;
}

export default function Navbar({scroll, navLinks, current, ctaOpen = () => {}}: Props){
    const scrollYProgress = scroll;
    const bgOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])
    const mobileBG = useTransform(scrollYProgress, [0.025, 0.05], [0, 1])
    const backgroundColor = useTransform(bgOpacity, v => `rgba(0, 0, 0, ${v})`);
    const bgLogoSize = useTransform(scrollYProgress, [0.05, 0.1], [100, 50]);
  
    const ctaWidth = useTransform(scrollYProgress, [0, 0.2], [200, 0])
    const ctaTranslate = useTransform(scrollYProgress, [0.1, 0.2], [0, 1])
  
  return (
    <m.div className="nav-container" style={{backgroundColor}} initial={{opacity: 0, y:-10}} animate={{opacity: 1, y: 0}} transition={{duration: 0.25}}>
        <div className="default-padding flex flex-row justify-center items-center !py-6">
            <img src="/static/img/nav/rcaplogo.svg" className="logo"/>
            <div className="hidden md:block grow"/>
            <m.div style={{translateX: ctaWidth}} className="hidden md:flex flex-row gap-8 justify-center items-center h-full">
                <a rel="noreferrer" target="_blank" href="https://www.republiccapital.co/ " className="text-white">
                    Portfolio
                </a>
                <a className="text-white underline">
                    Space Report
                </a>
                <m.button onClick={(e) => {e.preventDefault(); ctaOpen();}} style={{opacity: ctaTranslate}} className="bg-transparent border border-white w-[200px] text-center text-white uppercase py-2 font-[500] transition-all hover:text-black hover:bg-[white]">
                    Get Access
                </m.button>
            </m.div>
            <m.button onClick={(e) => {e.preventDefault(); ctaOpen();}} style={{opacity: mobileBG}} className="w-screen absolute left-0 bottom-0 bg-white text-black py-2 translate-y-[100%] md:hidden">
                Access the full space report today!
                <img src="/static/img/right-arrow.png" className="h-[25px] pl-2 inline-block"/>
            </m.button>
        </div>
    </m.div>
  )
}