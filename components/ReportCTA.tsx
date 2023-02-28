import {AnimatePresence, m} from "framer-motion"
import { useState, useRef, createRef } from "react";

type Props = {
    isOpen: boolean,
    onClose?: ()=>void,
}

export default function ReportCTA({isOpen = false, onClose = () => {}}: Props) {
    const [flowState, setFlowState] = useState('initial')
    const [formData, setFormData] = useState({fname: '', lname: '', email: '', org: '', errorText: ''})
    
    const fnameRef = useRef(null);
    const lnameRef = useRef(null);
    const emailRef = useRef(null);
    const orgRef = useRef(null);

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
            }
        }
    }

    return isOpen ?
        <div className={`transition-all text-white ${isOpen?'opacity-[1]' : 'opacity-0'} w-screen h-screen !z-[100] font-roboto fixed top-0 left-0 flex p-5 items-center bg-black bg-opacity-[0.7] justify-center`}>
            <div className="relative overflow-hidden backdrop-blur-md !z-[110] transition-all w-fit h-fit relative border border-white p-4">
                <button onClick={onClose} className="absolute right-0 top-0 border z-[120] border-white border-t-0 border-r-0 aspect-square p-2 transition-all group hover:bg-white"><img className="max-w-[20px] transition-all group-hover:invert-0 invert" src="/static/img/close_light.png"/></button>
                <AnimatePresence>
                    {
                        (flowState == 'initial') && (
                        <m.div initial={{opacity:0}} animate={{ opacity: 1 }} exit={{opacity: 0}} transition={{duration: 0.2}} className={`${flowState != 'initial' && 'absolute'} w-full h-full p-10 flex flex-col items-center justify-center`}>
                            <div className="w-fit">
                                <h1 className="text-3xl font-[500]">Your exclusive space report access is almost ready!</h1>
                                <div className="grid grid-cols-1 gap-4 mt-10 mb-4 md:grid-cols-2">
                                    <input type="text" placeholder="First Name*" ref={fnameRef} className="report-input"/>
                                    <input type="text" placeholder="Last Name*" ref={lnameRef} className="report-input"/>
                                    <input type="text" placeholder="Email Address*" ref={emailRef} className="report-input"/>
                                    <input type="text" placeholder="Organization" ref={orgRef} className="report-input"/>
                                </div>
                                <p className="italic text-center mb-10">{formData.errorText != '' ? formData.errorText : 'Boxes marked with * are required.'}</p>
                                <button onClick={(e) => {e.preventDefault(); checkForm();}} className="black-b w-full !border-2 font-[600]">Get Access</button>
                            </div>
                        </m.div>)                       
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {
                        flowState == 'loading' && (<m.div initial={{opacity:0}} animate={{ opacity: 1 }} exit={{opacity: 0}} transition={{duration: 0.2}} className="min-w-[500px] min-h-[400px] flex items-center justify-center invert"><img src="/static/img/spinner.png" className="max-w-[50px] rotating"/></m.div>)                       
                    }
                </AnimatePresence>
            </div>
        </div>
        : <div/>
}