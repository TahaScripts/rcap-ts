import {m} from "framer-motion"

type Props = {
    text: string,
    className: string,
    duration: number,
    delay: number,
    initialDelay?: number
}

export default function LoadText({text, className, duration, delay, initialDelay}: Props) {

    return (
        <a className="text-center">
            {text.split("").map((char, key) => (
                <m.a viewport={{once: true}} key={key} initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: duration, delay: initialDelay + (delay*key)}} className={className + (key == 0 ? 'md:py-2 md:pl-5' : key + 1 == text.length ? 'md:py-2  md:pr-5' : 'md:py-2')}>{char}</m.a>
            ))}
        </a>
    )
}