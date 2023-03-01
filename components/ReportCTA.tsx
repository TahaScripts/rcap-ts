import {AnimatePresence, m} from "framer-motion"
import { useState, useRef, createRef } from "react";

type Props = {
    isOpen: boolean,
    onClose?: ()=>void,
}

function Questions() {
    const [questions, setQuestions] = useState([['Invest in the aerospace sector', '/nav/rcaplogo.svg'], ['Work at a space company', '/badge.svg'], ['Raise for a space startup', '/raise.svg'], ['Read the latest space reports', '/read.svg']]) 
    return (
        <div className="w-full ">
            <h1 className="text-lg font-[600] mb-2">Which of the following best describes you?</h1>
            <div className="w-full h-full grid grid-cols-2 gap-1">
                {questions.map((i, key) => {
                    return (
                        <button key={key} className="col-span-1 text-center border border-gray">
                            <div className="w-full flex items-center justify-center py-5">
                                <img className="max-w-[80px] mx-auto" src={'/static/img' + i[1]}/>
                            </div>
                            {i[0]}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default function ReportCTA({isOpen = false, onClose = () => {}}: Props) {
    const [flowState, setFlowState] = useState('initial')
    const [formData, setFormData] = useState({fname: '', lname: '', email: '', org: '', errorText: ''})
    
    const fnameRef = useRef(null);
    const lnameRef = useRef(null);
    const emailRef = useRef(null);
    const orgRef = useRef(null);

    const submitForm = async () => {
        setFlowState('success')
        return true;
    }

    const checkForm = () => {
        if (flowState == 'initial') {
            var tempData = {fname : fnameRef.current.value,
                lname : lnameRef.current.value,
                email : emailRef.current.value,
                org : orgRef.current.value}
            
            console.log(tempData);

            if (tempData.fname.length < 2 || !tempData.fname.match(/^[A-Za-z]+$/)) {
                setFormData({ ...tempData, errorText: 'Your first name must be at least 2 letters, no numbers or special symbols.'})
                console.log(formData);
            } else if (tempData.lname.length > 0 && !tempData.lname.match(/^[A-Za-z]+$/)) {
                setFormData({ ...tempData, errorText: 'Your last name must be only letters, no numbers or special symbols.'})
            } else if (tempData.email.length < 4 || !tempData.email.includes('@') || !tempData.email.includes('.')) {
                setFormData({ ...tempData, errorText: 'Please provide a valid email address.'})
            } else {
                setFormData({...tempData, errorText: ''})
                setFlowState('loading')
                submitForm();
            }
        }
    }

    return isOpen ?
        <div className={`transition-all text-white ${isOpen?'opacity-[1]' : 'opacity-0'} w-screen h-screen !z-[100] font-roboto fixed top-0 left-0 flex p-5 font-roboto items-center bg-black !text-[white] bg-opacity-[0.7] justify-center`}>
            <div className="relative backdrop-blur-md !z-[110] transition-all w-full h-full md:max-w-[600px] md:max-h-[90%] relative border border-white p-4">
                <div className="w-full h-full md:max-w-[600px] !z-[111] md:max-h-[90%] overflow-y-scroll overflow-x-hidden lg:max-w-[800px]">
                <AnimatePresence>
                    {
                        (flowState == 'initial') && (
                        <m.div initial={{opacity:0, x: 500}} animate={{ x: 0, opacity: 1 }} exit={{opacity: 0, x:-500}} transition={{duration: 0.2}} className={`${flowState != 'initial' && 'absolute'} w-full h-full p-10 flex flex-col items-center justify-center`}>
                                <h1 className="text-3xl font-[500]">Your exclusive space report access is almost ready!</h1>
                                <div className="grid grid-cols-1 gap-4 mt-10 mb-4 md:grid-cols-2">
                                    <input type="text" placeholder="First Name*" ref={fnameRef} className="report-input"/>
                                    <input type="text" placeholder="Last Name*" ref={lnameRef} className="report-input"/>
                                    <input type="text" placeholder="Email Address*" ref={emailRef} className="report-input"/>
                                    <input type="text" placeholder="Organization" ref={orgRef} className="report-input"/>
                                </div>
                                <p className="italic text-center mb-10">{formData.errorText != '' ? formData.errorText : 'Boxes marked with * are required.'}</p>
                                <button onClick={(e) => {e.preventDefault(); checkForm();}} className="black-b w-full !border-2 font-[600]">Get Access</button>
                        </m.div>)                       
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {
                        flowState == 'loading' && (<m.div initial={{opacity:0, x: 500}} animate={{ x: 0, opacity: 1 }} exit={{opacity: 0, x:-500}} transition={{duration: 0.2}} className="w-full h-full flex items-center justify-center invert"><img src="/static/img/spinner.png" className="max-w-[50px] rotating"/></m.div>)                       
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {
                        flowState == 'success' && (
                        <m.div initial={{opacity:0, x: 500}} animate={{ x: 0, opacity: 1 }} exit={{opacity: 0, x:-500}} transition={{duration: 0.2}} className="w-full text-center min-h-full flex flex-col gap-5 items-center justify-center !text-white z-[110]">
                            <h1 className="text-3xl font-[600]">You've received a gift from<br/>Republic Capital!</h1>
                            <p className="text-center md:max-w-[80%]">This knowledge is a culmination of our team's close relationship with, and analysis of, the space industry. We're excited for others to join what history books will call the 2nd Space Race.</p>
                            <a href='https://republiccapital.docsend.com/view/s/8c9hhd4uxqs2f4yi' rel="noreferrer" target='_blank' className="fixed white-b bottom-0 right-0 text-xl !border-2 !border-t-4 w-full text-center !px-10 !py-5 font-[600]">OPEN REPORT</a>
                            <Questions/>
                        </m.div>)
                    }
                </AnimatePresence>
                </div>
                <button onClick={onClose} className="fixed right-0 top-0 border z-[120] border-white border-t-0 border-r-0 aspect-square p-2 transition-all group hover:bg-white"><img className="max-w-[20px] transition-all group-hover:invert-0 invert" src="/static/img/close_light.png"/></button>
                
            </div>
        </div>
        : <div/>
}