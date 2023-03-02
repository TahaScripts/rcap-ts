export default function ISS() {

    return (
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
    )
}