import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { any } from 'zod';
import IcT from './icons';
import { useState, FormEvent, ChangeEvent, useRef } from 'react';
import { text } from 'stream/consumers';

// ******************************************************
// * Lazy Loading for client side document method.
// ******************************************************
const ClientOnlyComponent = dynamic(() => import('./client-only'), {
    ssr: false,
})

// lazy loading of 'document' needs this validator if statement
function toggleDarkBtn() {
    if (typeof window !== 'undefined') {
        const toggleDiv = document.getElementById('toggleDarkDiv')
        toggleDiv?.classList.toggle('dark')
    }
}
// _____________________________________________________

// *************************************************
// * Copy text to clip board
// *************************************************
async function copyToClipboard(text: any) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        console.error('Failed to copy to clipboard', error);
    }

    const notificationEl = document.createElement('div');

    notificationEl.className = 'fixed item-center top-4 z-20 bg-slate-800 rounded-full py-4 px-20 text-white';
    notificationEl.innerHTML = `Color <b> ${text} </b> is copied to the clipboard`
    document.body.appendChild(notificationEl);

    setTimeout(() => {
        notificationEl.remove();
    }, 3000)
}
// _____________________________________________________

// ******************************************************
// * Generate a random HEX color 
// ******************************************************
function generateColor() {
    const hexArray = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
    let color ='#';
    for (let i = 0; i < 6; i++) {
        color += hexArray[Math.floor(Math.random() * hexArray.length)];
    }
    return color;
}
// _____________________________________________________

// ******************************************************
// * REGEX for testing email
// ******************************************************
function isEmail(email: string) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}


type FormTypes = {
    username: string;
    email: string;
    day: number |  undefined;
    month: number | undefined;
    year: number | undefined;
}
type FormErrors = {
    // needed line below for:
    //        const remainingErrors = Object.keys(formErrors || {}).filter((key) => formErrors?.[key] !== null && formErrors?.[key] !== '');
    // this allows any string key to be used to access the properties of the object.
    [key: string]: string | null;
    username: string | null;
    email: string | null;
    day: string | null;
    month: string | null;
    year: string | null;
}

function ICodeThis() {
    // ================ STATE ================
    const initialConditions: FormTypes = { username: "", email: "", day: undefined, month: undefined, year: undefined };
    const [formValues, setFormValues] = useState<FormTypes>(initialConditions);
    const [formErrors, setFormErrors] = useState<FormErrors | null>(null);  // the | null allows for an initial state where there are no errors
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const formControlRef = useRef<HTMLDivElement>(null);

    // ================ HELPERS ================
    function handleChange(el: ChangeEvent<HTMLInputElement>) {
        // id and value are the attributes on the <input> tag
        const { id, value } = el.target;
        let parsedValue: string | number | null = value;

        if (id === "day" || id === "month" || id === "year") {
            parsedValue = parseInt(value, 10);

            if (isNaN(parsedValue)) {
                parsedValue = null;
            }
        }

        setFormValues({...formValues, [id]: parsedValue})
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

    function validate(text2validate: FormTypes): FormErrors {
        const errors: FormErrors = { username: "", email: "", day: null, month: null, year: null };
        if (!text2validate.username) {
            errors.username = "Username is required!";
        }

        if (!text2validate.email) {
            errors.email = "Email is required!";
        } else if (!isEmail(text2validate.email)) {
            errors.email = "Must follow format: name@company.com"
        }

        if (!text2validate.day) {
            errors.day = "Must enter a day"
        } else if (typeof text2validate.day !== "number") {
            errors.day = "Day must be a number"
        } else if (
            text2validate.month &&
            typeof text2validate.month === "number" &&
            text2validate.day &&
            typeof text2validate.day === "number"
        ) {
            let year: number | string = new Date().getFullYear();
            // if year is entered, use it to determine num of days in month.  if none, use current year
            if (text2validate.year && typeof year === "number") {
                year = text2validate.year;
            }
            const maxDaysInMonth = new Date(year, text2validate.month, 0).getDate();
            const month = text2validate.month;
            const day = text2validate.day;

            if (day < 1 || day > maxDaysInMonth) {
                errors.day = "Not valid day for given month"
            } else if (month === 2 && day === 29 && !isLeapYear(year)) {
                // this never executes because the above captures it
                errors.day = "Must enter valid day for non-leap year";
            }
        } 

        if (
            (typeof text2validate.month === "number") && 
            (text2validate.month < 1 || text2validate.month > 12)
        ) {
            errors.month = "Select a valid month between 1 and 12";
        } else if (!text2validate.month) {
            errors.month = "Must enter a month (between 1 and 12)";
        }

        if (typeof text2validate.year !== "number") {
            errors.year = "Select a valid year";
        }

        return errors;
    }

    // ================ LIFECYCLE ================
    useEffect(() => {
        console.log("useEffect -> FormErrors: ", Object.keys(formErrors || {}).length, formErrors)
        const remainingErrors = Object.keys(formErrors || {}).filter((key) => formErrors?.[key] !== null && formErrors?.[key] !== '');

        console.log(remainingErrors.length)

        if (remainingErrors.length === 0 && isSubmit){
            console.log("*** SUBMITTED SUCCESSFULLY WITH: ", formValues)
        }
    }, [formErrors, isSubmit])


    // ================ RETURN ================
    return (
      <div id="toggleDarkDiv" className="dark">
        <div id="bodyDiv" className="bg-[#262747] min-h-screen flex justify-center items-center selection:bg-[#DDBBFF] selection:text-black">
  
            <div ref={formControlRef} className="bg-[#2F3056] w-80 h-[26rem] flex flex-col shadow-lg rounded-md" id="container">
                {/*
                // ****************************************************** 
                // * HEADER
                // ****************************************************** */}
                <section className='h-16 w-full relative'>
                    <h1 className='text-slate-300 font-semibold p-4 pl-8 text-xl'>Edit Your Account</h1>
                    <button className='absolute top-4 right-4 hover:text-slate-100 text-slate-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='' width="17" height="17" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M18 6l-12 12"></path>
                            <path d="M6 6l12 12"></path>
                        </svg>
                    </button>
                </section>
                {/* 
                // ******************************************************
                // * FORM
                // ****************************************************** */}
                <section className='bg-[#4d509843] h-[18rem]'>
                    <form onSubmit={handleSubmit} className='px-8 py-4' id='form'>
                        <div className='relative pb-6 ' id='form-control'>
                            <label className='text-zinc-300 inline-block mb-1 font-semibold'>NAME</label>
                            <input value={formValues.username} onChange={handleChange} className='border-slate-500 border-2 bg-[#4d509843] rounded-sm block py-1 pl-2 w-full hover:bg-[#4d50988b] focus:border-purple-700 focus:border-2 outline-none text-zinc-300 font-semibold' id="username" placeholder="Enter Name"/>
                            <IcT icons='checks' classNameCustom='hidden absolute top-9 right-1 text-green-300 pr-1' />
                            <IcT icons='x' classNameCustom='hidden absolute top-9 right-1 text-red-600 pr-1' />
                            <small className='text-red-600 font-semibold absolute bottom-0 left-0 hidden'>Error Message</small>
                        </div>
                        <div className='relative pb-6' id='form-control'>
                            <label className='text-zinc-300 inline-block mb-1 font-semibold'>EMAIL</label>
                            <input value={formValues.email} onChange={handleChange} className='border-slate-500 border-2 bg-[#4d509843] rounded-sm block py-1 pl-2 w-full hover:bg-[#4d50988b] focus:border-purple-700 focus:border-2 outline-none text-zinc-300 font-semibold' id="email" placeholder="Enter Email" />
                            <IcT icons='checks' classNameCustom='hidden absolute top-9 right-1 text-green-300 pr-1' />
                            <IcT icons='x' classNameCustom='hidden absolute top-9 right-1 text-red-600 pr-1' />
                            <small className='text-red-600 font-semibold absolute bottom-0 left-0 hidden'>Error Message</small>
                        </div>
                        <div className='relative pb-6' id='form-control'>
                            <label className='text-zinc-300 block mb-1 font-semibold'>DATE OF BIRTH</label>
                            <input value={formValues.day || ''} onChange={handleChange} className='border-slate-500 border-2 bg-[#4d509843] rounded-sm inline-block py-1 pl-2 w-1/4 hover:bg-[#4d50988b] focus:border-purple-700 focus:border-2 outline-none text-zinc-300 font-semibold' id="day" placeholder="Day"/>
                            <input value={formValues.month || ''} onChange={handleChange} className='border-slate-500 border-2 bg-[#4d509843] rounded-sm inline-block py-1 pl-2 w-1/4 hover:bg-[#4d50988b] focus:border-purple-700 focus:border-2 outline-none text-zinc-300 font-semibold' id="month" placeholder="Month" />
                            <input value={formValues.year || ''} onChange={handleChange} className='border-slate-500 border-2 bg-[#4d509843] rounded-sm inline-block py-1 pl-2 w-1/2 hover:bg-[#4d50988b] focus:border-purple-700 focus:border-2 outline-none text-zinc-300 font-semibold' id="year" placeholder="Year" />
                            <IcT icons='checks' classNameCustom='hidden absolute top-9 right-1 text-green-300 pr-1' />
                            <IcT icons='x' classNameCustom='hidden absolute top-9 right-1 text-red-600 pr-1' />
                            <small className='text-red-600 font-semibold absolute bottom-0 left-0 hidden'>Error Message</small>
                        </div>
                        {/* 
                        // ******************************************************
                        // * BUTTONS
                        // ****************************************************** */}
                        <div className="mx-auto m-6 flex">
                            <button className='px-10 py-1 border-2 mr-2 border-slate-900 bg-slate-800 hover:bg-slate-700 rounded-lg text-zinc-300'>Cancel</button>
                            <button className='px-10 py-1 border-2 border-slate-900 bg-orange-600 hover:bg-orange-500 rounded-lg text-zinc-200' type="submit">Submit</button>
                        </div>
                    </form>
                </section>


            </div>
        </div>
      </div>

    )
}

export default ICodeThis;

 