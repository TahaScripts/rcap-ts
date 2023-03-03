import { RefObject } from "react"
import Image from "next/image"
import { useScroll, m, useTransform, MotionValue } from "framer-motion"

type Props = {
    subheader: string,
    header: string,
    p: string,
    p2: string,
    parallax: MotionValue,
    img: string[],
    reduceMotion?: boolean,
}

export default function Sputnik({reduceMotion = false, subheader = '', header = '', p = '', parallax, p2 ='', img}: Props) {

    return (
        <m.div style={{y: parallax}} className="default-padding text-center h-full flex flex-col items-center justify-center gap-10">
          <m.div className="flex flex-col items-center pb-10">
            <div className="mb-5">
              <h1 className="font-[700] text-2xl md:text-3xl">{subheader}</h1>
            </div>
            <h1 className="font-[900] text-4xl md:text-5xl">{header}</h1>
          </m.div>
          <m.div className="flex text-justify md:max-w-[800px] lg:max-w-[1000px] flex-col items-center p-4 md:p-10 bg-[transparent] border border-white">
            <p className="" dangerouslySetInnerHTML={{__html: p}}/>
          </m.div>
          <div className="lg:flex flex-row justify-between items-center gap-5 w-full md:max-w-[800px] lg:max-w-[1000px]">
            <div className="mb-5 lg:mb-0 border p-2 h-fit flex items-center justify-center italic gap-2 flex-col border-white max-w-full md:min-w-[500px]">
              <div className="w-full relative aspect-[1.5] border border-white"><Image src={img[1] + ".webp"} blurDataURL={img[1] + "_blur.webp"} alt='' className="" fill/></div>
              {img[0]}
            </div>
            <div className="border h-fit text-justify p-4 md:p-10 flex items-center justify-center gap-2 flex-col border-white">
              <p className="" dangerouslySetInnerHTML={{__html: p2}}/>
            </div>
          </div>
        </m.div>
    )
}