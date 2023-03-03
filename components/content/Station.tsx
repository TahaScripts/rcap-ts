import { RefObject } from "react"
import Image from "next/image"
import { ClientDimensions } from "../../interfaces"
import { useScroll, m, useTransform, MotionValue } from "framer-motion"
import ReactCompareImage from "react-compare-image"

type Props = {
    dimensions: ClientDimensions,
    parallax: MotionValue,
    reduceMotion?: boolean,
}

export default function Station({parallax, reduceMotion = false, dimensions}: Props) {

    return (
      <div className="default-padding min-h-screen">
          <h1 className="font-[800] text-3xl md:text-5xl text-center md:mb-20">Early Orbiting Infrastructure</h1>
          <div className="w-full h-full flex flex-col items-center justify-center md:flex-row gap-8">
            {!reduceMotion ? 
            <m.div style={{y: parallax}} className="text-justify md:text-right w-full p-3 border border-white flex flex-col gap-4 md:p-0 md:border-none md:max-w-[200px] text-left">
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
            :
            <div className="text-justify md:text-right w-full p-3 border border-white flex flex-col gap-4 md:p-0 md:border-none md:max-w-[200px] text-left">
              <div className="w-full flex flex-row items-center justify-center">
                <h2 className="font-[500] text-lg">1986 - 2001</h2>
                <div className="grow"/>
                <img src="/static/img/soviet.png" className="max-w-[80px]"/>
              </div>
              <h2 className="font-[700] text-lg">Mir</h2>
              <p className="">was the first continuously inhabited, long-term research station in orbit and was occupied for 12.5 years. Mir was deorbited in March 2001 after funding was cut.</p>
              {dimensions.width < 1000 && 
              <div className="aspect-square w-full relative"><Image alt="" src="/static/img/mir.jpeg" fill/></div>}
            </div>
            }
            {dimensions.width > 999 && <div className="grow aspect-square relative">
              <ReactCompareImage leftImage="/static/img/mir.jpeg" rightImage="/static/img/skylab.jpeg" />
            </div>}
            {!reduceMotion ? 
            <m.div style={{y: parallax}} className="text-justify md:text-left w-full p-3 border border-white flex flex-col gap-4 md:p-0 md:border-none md:max-w-[200px] text-left">
              <div className="w-full flex flex-row items-center justify-center">
                <img src="/static/img/usa.png" className="max-w-[80px]"/>
                <div className="grow"/>
                <h2 className="font-[500] text-lg">1973 - 1974</h2>
              </div>
              <h2 className="font-[700] text-lg">Skylab</h2>
              <p className="">was the first and only space station operated exclusively by the United States. Skylab&apos;s orbit eventually decayed, and it disintegrated in the atmosphere.</p>
              {dimensions.width < 1000 && 
              <div className="aspect-square w-full relative"><Image alt="" src="/static/img/skylab.jpeg" fill/></div>}
            </m.div>
            :
            <div className="text-justify md:text-left w-full p-3 border border-white flex flex-col gap-4 md:p-0 md:border-none md:max-w-[200px] text-left">
              <div className="w-full flex flex-row items-center justify-center">
                <img src="/static/img/usa.png" className="max-w-[80px]"/>
                <div className="grow"/>
                <h2 className="font-[500] text-lg">1973 - 1974</h2>
              </div>
              <h2 className="font-[700] text-lg">Skylab</h2>
              <p className="">was the first and only space station operated exclusively by the United States. Skylab&apos;s orbit eventually decayed, and it disintegrated in the atmosphere.</p>
              {dimensions.width < 1000 && 
              <div className="aspect-square w-full relative"><Image alt="" src="/static/img/skylab.jpeg" fill/></div>}
            </div>
            }
          </div>
        </div>
    )
}