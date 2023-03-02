// Header

import {HeaderCopy, ClientDimensions} from "../interfaces"
import { m, MotionValue } from "framer-motion"
import Image from "next/image"

type Props = {
    headerCopy: HeaderCopy;
    bgMotion?: MotionValue;
    dimensions: ClientDimensions;
}

export default function Header({headerCopy, bgMotion, dimensions}: Props) {
    return (
        <section className="!h-[screen]">
            <div className="section-bg !h-[screen]">
                {dimensions.width > 0 && (dimensions.width > 800 ? <Image alt="" style={{objectFit: 'cover', objectPosition: 'right center'}} className="z-[60]" src={headerCopy.img.desktop} blurDataURL={headerCopy.img.desktop_blur} priority placeholder='blur' fill/> : <Image alt="" style={{objectFit: 'cover', objectPosition: 'right center'}} className="z-[60]" src={headerCopy.img.mobile} blurDataURL={headerCopy.img.mobile_blur} priority placeholder='blur' fill/>)}
                <div className="absolute !bg-[transparent] z-[100] pt-8 top-0 left-0 w-full h-full">
                    <div className="default-padding relative text-center md:text-left bg-[transparent] h-full flex flex-col justify-center text-white">
                        <h1 className="text-4xl md:text-6xl font-[500]">{headerCopy.h1_1}</h1>
                        <h1 className="text-5xl md:text-7xl font-[600] mt-2 mb-20">{headerCopy.h1_2}</h1>
                        <h2 className="text-lg font-[300] max-w-[600px] mb-10">{headerCopy.h2}</h2>
                        <div className="flex flex-col md:flex-row gap-5 text-lg">
                            <a className="border w-full md:w-fit border-white bg-transparent md:p-1 cursor-pointer group transition-all hover:bg-white hover:scale-105">
                                <button onClick={(e) => {e.preventDefault(); headerCopy.btn1_fn()}} className="block flex w-full flex-row items-center bg-white text-black py-3 px-2 md:p-4">
                                {headerCopy.btn1}
                                </button>
                            </a>
                            <button onClick={(e) => {e.preventDefault(); headerCopy.btn2_fn();}}className="border items-center flex flex-row border-white bg-transparent py-3 px-2 md:p-4 cursor-pointer group transition-all hover:scale-105 w-full md:w-fit">
                                {headerCopy.btn2}
                                <img src="/static/img/right-arrow.png" className="h-[30px] invert grayscale pl-8 transition-all group-hover:translate-x-[10px]"/>
                            </button>
                        </div>
                        <div className="absolute w-[fit] text-center  left-0 lg:left-auto bottom-0 right-0 flex flex-col items-center justify-center font-[200] mb-10 lg:m-[100px]">
                            <img src="/static/img/right-arrow.png" className="h-[30px] floating mb-2 invert grayscale  transition-all group-hover:translate-x-[10px] rotate-[90deg]"/>
                            SCROLL
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}
