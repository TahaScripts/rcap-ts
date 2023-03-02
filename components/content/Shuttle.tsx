import {m, MotionValue} from "framer-motion"
import Image from "next/image"

type Props = {
    parallax: MotionValue;
}
export default function Shuttle({parallax} : Props) {

    return (
        <div className="default-padding min-h-screen flex flex-col items-center justify-center">
        <h1 className="font-[800] text-3xl md:text-7xl text-center">THE SPACE SHUTTLE</h1>
        <h1 className="font-[600] text-xl md:text-4xl text-center">World's First Reusable Rocket</h1>
        <div className="mt-[15vh] w-full shuttle grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-y-[20vh]">
          <div className="relative col col-span-1 aspect-[1.186]">
            
            <Image fill src="/static/img/shuttle/shuttle.webp" blurDataURL="/static/img/shuttle/shuttle_blur.webp" alt=''/>
            <m.div style={{y: parallax}} className="text-block w-full md:w-fit absolute bottom-0 md:bottom-[-10px] right-0 md:right-[-10px]">
              <h1 className="miniheader mb-2">First Launch</h1>
              <h1 className="subheader !normal-case">April 12th, 1981</h1>
            </m.div>
          </div>
          <div className="col md:pl-8 col-span-1 h-full flex items-center justify-center">
            <m.div style={{y: parallax}} className="text-block alter relative">
              
              <p>The Shuttle was originally billed as a spacecraft that would be able to launch once a week and maintain low launch costs through amortization over a significant launch cadence.<br/><br/>The Shuttle's incremental per-kg launch costs turned out to be considerably higher than those of expendable launchers. The final cost was estimated to be about $2.1 B per launch and the total program costs are estimated to be $238B (inflation adi.)<br/><br/>NASA launched the shuttle for 135 missions between its 1981 unveiling and its 2011 decommissioning. The vehicle was plagued with safety issues. Two out of the five spacecraft were destroyed in accidents (Challenger & Columbia), killing 14 astronauts, the largest loss of life in space exploration.<br/><br/>The Shuttle was an ultimate reflection of the bloated political infrastructure that resulted in a highly inefficient NASA decision making process.</p>
            </m.div>
          </div>
            
        </div>
      </div>
    )
}