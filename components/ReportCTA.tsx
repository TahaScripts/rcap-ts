import {AnimatePresence, m} from "framer-motion"
import { useState, useRef, createRef, useEffect } from "react";
import JSConfetti from 'js-confetti'

type Props = {
    isOpen: boolean,
    onClose?: ()=>void,
}

function Questions({onState = () => {}, onClick = (result: any) => {}, disabled = false}) {
    const [questions, setQuestions] = useState([['Invest in the aerospace sector', '/nav/rcaplogo.svg', '', 'group-hover:invert'], ['Work at a space company', '/badge.svg', 'invert', 'group-hover:invert-0'], ['Raise for a space startup', '/raise.svg', 'invert', 'group-hover:invert-0'], ['Read the latest space reports',  '/read.svg', '', 'group-hover:invert']]) 
    const [qState, setqState] = useState(Array(questions.length).fill(false))


    const keyConfig = (key: number) => {
        let tempState = [...qState];
        tempState[key] = !qState[key]
        setqState(tempState);
    }

    const returnResult = () => {
        let returnState = questions.map((i, k) => {
            return [i[0], qState[k]]
        })
        console.log(returnState);
        onClick(returnState);
    }

    return (
        <div className="w-full max-w-[400px] pt-10 pb-20">
            
            <h1 className="text-lg font-[600] mb-2">Which of the following best describes you?</h1>
            <p className="italic text-sm opacity-[0.8] mb-10">Select all that apply.</p>
            <div className="w-full h-full grid grid-cols-2 gap-5">
                {questions.map((i, key) => {
                    return (
                        <button disabled={disabled} onClick={(e) => {e.preventDefault(); keyConfig(key)}} key={key} className={`transition-all hover:scale-[1.05] col-span-1 text-center border hover:border-2 border-gray p-5 ${qState[key] ? '!bg-white !text-black !hover:scale-[1] font-[600]' : 'group font-[500]'} disabled:pointer-events-none`}>
                            <div className="w-full flex items-center justify-center aspect-[1.3]">
                                <img className={`max-w-[60px] transition-all group-hover:scale-[1.1] md:max-w-[80px] lg:max-w-[60px] mx-auto ${i[2] + (qState[key] ? 'scale-[1.3]  ' + (i[2].includes("invert") ? '!invert-0' : 'invert') : '')}`} src={'/static/img' + i[1]}/>
                            </div>
                            {i[0]}
                        </button>
                    )
                })}
            </div>
            <m.button onClick={(e) => {e.preventDefault(); returnResult();}} initial={{opacity:0}} animate={{opacity:1, transition: {duration: 0.1, delay:0.1}}} className="fixed z-[120] white-b bottom-0 right-0 text-xl !border-2 !border-t-4 w-full text-center font-[600] group"><img className="max-w-[40px] mx-auto transition-all group-hover:invert" src="/static/img/right-arrow.png"/></m.button>
        </div>
    )
}

export default function ReportCTA({isOpen = false, onClose = () => {}}: Props) {
    const [flowState, setFlowState] = useState('questions')
    const [formData, setFormData] = useState({fname: '', lname: '', email: '', org: '', errorText: '', submit: ''})
    const [questionData, setQuestionData] = useState([])
    const [termsAgreedByUser, setTermsAgreedByUser] = useState(false);

    const canvasRef = useRef(null);
    
    useEffect(() => {
        if (flowState == 'success') {
            const jsConfetti = new JSConfetti({ canvas: canvasRef.current })
            jsConfetti.addConfetti({
                emojis: ['🚀', '🧑‍🚀', '💥', '✨', '💫', '🧑🏻‍🚀', '🧑🏿‍🚀', '👩🏽‍🚀', '👾', '☄️', '🔭', '☀️', ''],
            })
        }
    }, [flowState])
    
    const fnameRef = useRef(null);
    const lnameRef = useRef(null);
    const emailRef = useRef(null);
    const orgRef = useRef(null);

    const submitForm = async () => {
        console.log(termsAgreedByUser);
        if (flowState == 'loading' && termsAgreedByUser) {
            await new Promise(() => setTimeout(() => {setFlowState('success');}, 1000));
            return true;
        }
    }

    const checkForm = () => {
        if (flowState == 'form') {
            var tempData = {fname : fnameRef.current.value,
                lname : lnameRef.current.value,
                email : emailRef.current.value,
                org : orgRef.current.value}
            
            console.log(tempData);

            if (tempData.fname.length < 2 || !tempData.fname.match(/^[A-Za-z]+$/)) {
                setFormData({ ...tempData, submit: 'validating', errorText: 'Your first name must be at least 2 letters, no numbers or special symbols.'})
                console.log(formData);
            } else if (tempData.lname.length > 0 && !tempData.lname.match(/^[A-Za-z]+$/)) {
                setFormData({ ...tempData, submit: 'validating', errorText: 'Your last name must be only letters, no numbers or special symbols.'})
            } else if (tempData.email.length < 4 || !tempData.email.includes('@') || !tempData.email.includes('.')) {
                setFormData({ ...tempData, submit: 'validating', errorText: 'Please provide a valid email address.'})
            } else if (!termsAgreedByUser) {
                setFormData({ ...tempData, submit: 'validating', errorText: 'Please agree to the ToS & Disclaimer to proceed.'})
            } else {
                
                setFormData({...tempData, submit: 'fetch', errorText: ''})
                setFlowState('loading')
                submitForm();
            }
        }
    }

    return isOpen ?
        <div className={`transition-all text-white ${isOpen?'opacity-[1]' : 'opacity-0'} w-screen h-screen !z-[100] font-roboto fixed top-0 left-0 flex p-5 font-roboto items-center bg-black !text-[white] bg-opacity-[0.7] justify-center`}>
            <div className="w-full absolute h-full !z-[109]" onClick={onClose}/>
            <div className=" backdrop-blur-md !z-[110] transition-all w-full h-full md:max-w-[600px] md:max-h-[90%] relative border border-white p-4 !relative">
                <div className="w-full h-full max-w-full !z-[111] max-h-full overflow-y-scroll overflow-x-hidden no-scroll-ui lg:max-w-[800px]">
                <AnimatePresence>
                    {
                        (flowState == 'form') && (
                        <m.div initial={{opacity:0, x: 500}} animate={{ x: 0, opacity: 1 }} exit={{opacity: 0, x:-500}} transition={{duration: 0.2}} className={`${flowState != 'form' && 'absolute'} w-full h-full md:p-10 flex flex-col items-center justify-center`}>
                                <h1 className="text-3xl text-center font-[500]">Your exclusive space report access is almost ready!</h1>
                                <div className="w-full grid grid-cols-1 gap-4 mt-10 md:grid-cols-2">
                                    <input type="text" placeholder="First Name*" ref={fnameRef} className="report-input"/>
                                    <input type="text" placeholder="Last Name*" ref={lnameRef} className="report-input"/>
                                    <input type="text" placeholder="Email Address*" ref={emailRef} className="report-input"/>
                                    <input type="text" placeholder="Organization" ref={orgRef} className="report-input"/>
                                    <div className="col-span-1 md:col-span-2 flex flex-row mb-4 items-center justify-center mt-5 gap-4"><button onClick={(e) => {e.preventDefault();setTermsAgreedByUser(!termsAgreedByUser)}} className={`checkbox`}>{termsAgreedByUser && <div className="checked"/>}</button><p className="text-sm">By clicking this box, you agree to the Terms of Service and Disclaimers.</p></div>
                                    <a className="col-span-1 text-sm opacity-[0.8] text-center underline" rel="noreferrer" target='_blank' href="https://republiccapital.co/terms-of-service">Terms of Service</a>
                                    <a className="col-span-1 text-sm opacity-0.8] text-center underline" rel="noreferrer" target='_blank' href="https://republiccapital.co/disclaimer">Disclaimer</a>
                                </div>
                                <p className="italic text-center mt-10">{formData.errorText != '' ? formData.errorText : 'Boxes marked with * are required.'}</p>
                                <m.button initial={{opacity:0}} animate={{opacity:1, transition: {duration: 0.1, delay:0.1}}} onClick={(e) => {e.preventDefault(); checkForm();}} className="fixed z-[120] white-b bottom-0 right-0 text-xl !border-2 !border-t-4 w-full text-center !px-10 !py-5 font-[600]">Get Access</m.button>
                        </m.div>)                       
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {flowState == 'questions' && (
                        <m.div initial={{opacity:0, x: 500}} animate={{ x: 0, opacity: 1 }} exit={{opacity: 0, x:-500}} transition={{duration: 0.2}} className="w-full text-center min-h-full flex flex-col gap-5 items-center justify-center !text-white z-[110]">
                            <Questions onClick={(r) => {setFlowState('form');setQuestionData(r)}}/>
                        </m.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {
                        flowState == 'loading' && (<m.div initial={{opacity:0, x: 500}} animate={{ x: 0, opacity: 1, transition: {duration:0.2}}} exit={{opacity: 0, x:100, transition: {duration:0.2, delay: 1}}} className="w-full h-full flex items-center justify-center"><m.h1 initial={{opacity:0, y: 100}} exit={{opacity: [0, 1, 1, 1, 0], y: [100, 50, 50, 50, 100], transition:{duration: 1.5}}} className="absolute">Access Requested!</m.h1><img src="/static/img/spinner.png" className="max-w-[50px] invert rotating"/></m.div>)                       
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {
                        flowState == 'success' && (
                        <m.div initial={{opacity:0, x: 500}} animate={{ x: 0, opacity: 1 }} exit={{opacity: 0, x:-500}} transition={{duration: 0.2}} className="w-full text-center min-h-full py-[10vh] flex flex-col gap-5 items-center justify-center !text-white z-[110]">
                            <h1 className="text-3xl font-[600]"><span className="capitalize">{formData.fname}</span>, you've received a gift from<br/>Republic Capital!</h1>
                            <p className="text-center md:max-w-[80%]">This knowledge is a culmination of our team's close relationship with, and analysis of, the space industry. We're excited for others to join what history books will call the 2nd Space Race.</p>
                            <m.a initial={{opacity:0}} animate={{opacity:1, transition: {duration: 0.1, delay:0.2}}} href='https://republiccapital.docsend.com/view/s/8c9hhd4uxqs2f4yi' rel="noreferrer" target='_blank' className="fixed z-[120] white-b bottom-0 right-0 text-xl !border-2 !border-t-4 w-full text-center !px-10 !py-5 font-[600]">OPEN REPORT</m.a>
                        </m.div>)
                    }
                </AnimatePresence>
                </div>
                <button disabled={flowState == 'loading'} onClick={onClose} className="fixed right-0 top-0 border z-[120] border-white border-t-0 border-r-0 aspect-square p-2 transition-all group hover:bg-white disabled:pointer-events-none disabled:opacity-0"><img className="max-w-[20px] transition-all group-hover:invert-0 invert" src="/static/img/close_light.png"/></button>
                
            </div>
            {flowState == 'success' && 
                <div className="w-screen h-screen absolute z-[109]">
                    <canvas ref={canvasRef} className="w-full h-full"/>
                </div>
                }
        </div>
        : <div/>
}