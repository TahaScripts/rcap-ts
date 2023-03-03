import { RefObject } from "react"
import { useScroll, m, useTransform, MotionValue } from "framer-motion"

type Props = {
    header: string,
    p: string,
    parallax: MotionValue,
    reduceMotion?: boolean,
}

export default function V2({header = '', p = '', reduceMotion = false, parallax}: Props) {

    return (
        <div className="w-full h-full">
            <m.div style={{y:parallax}} className="default-padding min-h-screen flex items-center justify-start">
            <div className="text-block md:max-w-[650px]">
                <h1 className="header">{header}</h1>
                <p dangerouslySetInnerHTML={{__html: p}} className="paragraph !text-justify"></p>
            </div>
            </m.div>
        </div>
    )
}