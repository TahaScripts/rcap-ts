import {m, MotionValue} from "framer-motion"
import Image from "next/image"

type Props = {
    parallax: MotionValue,
    header: MotionValue,
    copy: any,
    reduceMotion?: boolean,
}
export default function Satellite({parallax, reduceMotion = false, header, copy} : Props) {
    return (
      <div className="default-padding min-h-screen z-[41] relative flex flex-col items-center">
      {!reduceMotion ? 
      <m.div style={{x: header}} className="md:w-fit md:flex flex-row relative">
        <h1 className="font-[700] text-4xl bg-white text-black py-8 px-6">1990s</h1>
        <h1 className="font-[700] text-right md:text-center text-4xl bg-black text-white py-8 px-6">Satellite Internet & Communications</h1>
      </m.div>
      :
      <div className="md:w-fit md:flex flex-row relative">
        <h1 className="font-[700] text-4xl bg-white text-black py-8 px-6">1990s</h1>
        <h1 className="font-[700] text-right md:text-center text-4xl bg-black text-white py-8 px-6">Satellite Internet & Communications</h1>
      </div>
      }
      <div className="mt-10 md:mt-[20vh] w-full grid grid-cols-1 lg:grid-cols-2 gap-10 gap-y-20 font-[500] md:gap-y-[20vh]">
          <div className="col col-span-1 h-full flex items-center justify-center">
            {!reduceMotion ? 
            <m.div style={{y: parallax}} className="relative bg-white bg-opacity-[0.5] p-8">
              <div className="corner corner-tl"/>
              <div className="corner corner-bl"/>
              <div className="corner corner-tr"/>
              <div className="corner corner-br"/>
              <p className="text-lg font-[500]">Satellite internet upstarts emerged in the mid to late-90s as space became accessible thanks to the Shuttle and cheap capital of the Dot-com Bubble.<br/><br/>The significant losses that most investors experienced while investing in satellite companies like Iridium or Teledesic were attributable to a few common factors including: (1) high upfront capex, (2) market risk, and (3) innovation in terrestrial networks.<br/><br/>For example, Iridium is a global satellite phone company that was backed by Motorola. The Iridium constellation of 66 satellites to provide global wireless service cost $5B. It filed for bankruptcy in 1999 after defaulting on $1.5B in debt.</p>
            </m.div>
            :
            <div className="relative bg-white bg-opacity-[0.5] p-8">
              <div className="corner corner-tl"/>
              <div className="corner corner-bl"/>
              <div className="corner corner-tr"/>
              <div className="corner corner-br"/>
              <p className="text-lg font-[500]">Satellite internet upstarts emerged in the mid to late-90s as space became accessible thanks to the Shuttle and cheap capital of the Dot-com Bubble.<br/><br/>The significant losses that most investors experienced while investing in satellite companies like Iridium or Teledesic were attributable to a few common factors including: (1) high upfront capex, (2) market risk, and (3) innovation in terrestrial networks.<br/><br/>For example, Iridium is a global satellite phone company that was backed by Motorola. The Iridium constellation of 66 satellites to provide global wireless service cost $5B. It filed for bankruptcy in 1999 after defaulting on $1.5B in debt.</p>
            </div>
            }
          </div>
          <div className="col col-span-1 relative aspect-[1.5]">
            <Image alt='' src="/static/img/shuttle/iridium.webp" blurDataURL="/static/img/shuttle/iridium_blur.webp" fill/>
            {!reduceMotion ? 
            <m.div style={{y: parallax}} className="text-block !py-5 w-fit !text-center !bg-white !text-black absolute bottom-0 right-0">
              <h1 className="caption">Model of first-generation satellite from Iridium</h1>
            </m.div>
            : 
            <div className="text-block !py-5 w-fit !text-center !bg-white !text-black absolute bottom-0 right-0">
              <h1 className="caption">Model of first-generation satellite from Iridium</h1>
            </div>
            }
          </div>
          <div className="col col-span-1 flex items-center justify-center lg:col-span-2">
            <m.div style={{y: parallax}} className="w-full bg-white bg-opacity-[0.5] md:max-w-[800px] p-8 relative">
              <div className="corner shorter corner-tl"/>
                <div className="corner shorter corner-bl"/>
                <div className="corner shorter corner-tr"/>
                <div className="corner shorter corner-br"/>
              <p className="text-lg text-justify font-[500]">Despite aggressive marketing efforts, the company experienced a significant shortfall in subscriber additions - 20K one year after launch, vs. its original 500K forecast. Innovation in terrestrial cellular networks massively shrunk their potential market.<br/><br/>Iridium wasn't the only company giving satellite internet a try in the 90s - most went bankrupt, requiring the businesses to pivot.</p>
            </m.div>
          </div>
          <div className="col col-span-1 lg:col-span-2">
            <div className="w-full h-full group overflow-scroll max-w-full md:overflow-visible md:flex items-center justify-center">
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
                {copy[0].map((r, k) => 
                <div key={k} className="w-full grid grid-cols-10 px-6 transition-all md:hover:scale-[1.1]">
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
            </div>
          </div>
      </div>
    </div>
    )
}