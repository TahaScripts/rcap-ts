import {m, MotionValue} from "framer-motion"
import Image from "next/image"
import { PropsWithChildren, useState, useRef, useEffect } from "react"

type Props = {
    url: string,
    poster?: String,
    mobileURL?: String,
    className?: String,
    motionStyle: MotionValue
}

export default function VideoBG(props: PropsWithChildren<Props>) {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        const firstPlay = () => {
            setPlaying(true);
            if (videoRef && videoRef.current) {
                videoRef.current.removeEventListener("play", firstPlay)
                videoRef.current.removeEventListener("playing", firstPlay)
            }
        }
        videoRef.current.addEventListener("play", firstPlay)
        videoRef.current.addEventListener("playing", firstPlay)
    }, [])

    return (
        <m.div style={{opacity: props.motionStyle}} className={`w-full h-full max-w-full max-h-full overflow-hidden relative z-[35] ${props.className}`}>
            { props.poster && !playing && 
            <div className={`w-full h-full z-[37] relative`}>
                <Image src={props.poster + ".webp"} blurDataURL={props.poster + "_blur.webp"} alt='' fill/>
            </div>
            }
            
            <video ref={videoRef}
            onError={(e) => {console.log(e);}}
            autoPlay muted loop playsInline className="object-cover h-full w-full z-[35] absolute top-0 left-0">
                <source src={props.url} type="video/mp4"/>
            </video>
        </m.div>
    )
}