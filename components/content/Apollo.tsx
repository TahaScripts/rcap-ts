import { RefObject } from "react"
import Image from "next/image"
import { ClientDimensions } from "../../interfaces"
import { useScroll, m, useTransform, MotionValue } from "framer-motion"

type Props = {
    data: any,
    dimensions: ClientDimensions,
    unroll: MotionValue,
    parallax: MotionValue,
    reverse: MotionValue,
    view: boolean,
    reduceMotion?: boolean,
}

export default function Apollo({unroll, parallax, reduceMotion = false, reverse, dimensions, data, view}: Props) {

    return (
      <div className="default-padding min-h-[screen]">
          <div className="text-block !bg-[transparent] relative mb-[50vh]">
            {!reduceMotion ? 
            <div className="w-full">
              <m.div style={{scaleX: unroll}} className="absolute z-[38] md:origin-top-left w-full h-full top-[20px] left-[20px] bg-white bg-opacity-[0.5]"/>
              <m.div style={{scaleX: unroll}} className="absolute z-[38] md:origin-top-left w-full h-full top-0 left-0 bg-black bg-opacity-[0.9]"/>
            </div>
            :
            <div className="w-full">
              <div className="absolute z-[38] md:origin-top-left w-full h-full top-[20px] left-[20px] bg-white bg-opacity-[0.5]"/>
              <div className="absolute z-[38] md:origin-top-left w-full h-full top-0 left-0 bg-black bg-opacity-[0.9]"/>
            </div>}
            
            <h1 className="header z-[40] relative">The<br/>Apollo<br/>Program</h1>
          </div>
          <div className="w-full flex flex-wrap gap-4 z-[40] relative">
            {data.map((block, k) => {
              return block[0] == 'gap' ? <div className="grow"/> : 
              block[0] == 'divide' ? <div className="w-full !min-w-full block relative h-[20vh] bg[red]"/>:
              <m.div className="text-block apollo my-auto" key={k} style={dimensions.width > 999 ? {y: k - 1 > 0 && data[k - 1][0] == 'gap' ? parallax : reverse} : {}}>
                {block.map((item: any, k2: any) => {
                  return item.type == 'subheader' ? <h1 key={k2} className="subheader">{item.item}</h1> :
                  item.type == 'img' ? <div key={k2} className={`relative w-full ${item.aspect}`}>{dimensions.width < 800 ? <Image alt="" placeholder="blur" fill blurDataURL={item.blur} src={item.url}/> : view && <Image alt="" placeholder="blur" fill blurDataURL={item.blur} src={item.url}/>}</div> : 
                  item.type == 'p' ? <p dangerouslySetInnerHTML={{__html: item.item}} key={k2} className=""></p> : 
                  item.type == 'caption' ? <p dangerouslySetInnerHTML={{__html: item.item}} key={k2} className="caption !text-center"></p> : ''
                })}
              </m.div>
            })}
          </div>

        </div>
    )
}