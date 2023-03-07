// Header

import {HeaderCopy, ClientDimensions} from "../interfaces"
import { m, MotionValue, useTransform } from "framer-motion"
import Image from "next/image"

type Props = {
    headerCopy: HeaderCopy;
    bgMotion?: MotionValue;
    dimensions: ClientDimensions;
}

export default function Header({headerCopy, bgMotion, dimensions}: Props) {
    
    return (
            <div className="section-bg !h-screen md:overflow-hidden md:max-h-screen">
                {dimensions.width > 0 && (dimensions.width > 800 ? <Image alt="" style={{objectFit: 'cover', objectPosition: 'right center'}} className="z-[60]" src={headerCopy.img.desktop} blurDataURL={headerCopy.img.desktop_blur} priority placeholder='blur' fill/> : <Image alt="" style={{objectFit: 'cover', objectPosition: 'right center'}} className="z-[60]" src={headerCopy.img.mobile} blurDataURL={headerCopy.img.mobile_blur} priority placeholder='blur' fill/>)}
                <div className="absolute !bg-[transparent] z-[100] pt-8 top-0 left-0 w-full h-full">
                    <div className="default-padding relative text-center md:text-left bg-[transparent] h-full flex flex-col justify-center text-white">
                        <h1 className="text-4xl md:text-6xl 2xl:text-8xl font-[500]">{headerCopy.h1_1}</h1>
                        <h1 className="text-5xl md:text-7xl 2xl:text-9xl font-[600] mt-2 mb-20">{headerCopy.h1_2}</h1>
                        <h2 className="md:text-lg xl:text-xl 2xl:text-3xl font-[300] md:max-w-[600px] 2xl:max-w-[1000px] mb-10">{headerCopy.h2}</h2>
                        <div className="flex flex-col md:flex-row gap-5 text-lg">
                            <a className="border w-full md:w-fit border-white bg-transparent md:p-1 cursor-pointer group transition-all hover:bg-white hover:scale-105">
                                <button onClick={(e) => {e.preventDefault(); headerCopy.btn1_fn()}} className="block flex w-full flex-row items-center bg-white text-black py-3 px-2 md:p-4">
                                {headerCopy.btn1}
                                </button>
                            </a>
                            <button onClick={(e) => {e.preventDefault(); headerCopy.btn2_fn();}}className="border items-center flex flex-row border-white bg-transparent py-3 px-2 md:p-4 cursor-pointer group transition-all hover:border-4 hover:font hover:scale-105 w-full md:w-fit">
                                {headerCopy.btn2}
                                <img src="/static/img/right-arrow.png" className="h-[30px] invert grayscale pl-3 transition-all group-hover:translate-x-[5px]"/>
                            </button>
                        </div>
                        
                    </div>
                    <m.div initial={{opacity: 0, y:50}} animate={{opacity: 1, y: 0}} transition={{duration: 1.3, repeat: Infinity, repeatType: "mirror"}} className="absolute w-full pb-8 gap-3 flex items-center justify-center bottom-0">
                        <img className="max-h-[20px] rotate-90 invert" src="/static/img/right-arrow.png"/>
                        <h1 className="font-[200] md:text-xl">SCROLL</h1>
                        <img className="max-h-[20px] rotate-90 invert" src="/static/img/right-arrow.png"/>
                    </m.div>
                </div>
            </div>
    )
}
