import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { any } from 'zod';
import IcT from './icons';

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



function ICodeThis() {

    return (
      <div id="toggleDarkDiv" className="dark">
        <div id="bodyDiv" className="bg-[#262747] min-h-screen flex justify-center items-center selection:bg-[#DDBBFF] selection:text-black">
  
            <div className="bg-[#2F3056] w-80 h-[26rem] flex flex-col shadow-lg rounded-md" id="container">
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
                <section className='bg-[#4d509843] h-68'>
                    <form className='px-8 py-4' id='form'>
                        <div className='relative ' id='form-control'>
                            <label className='text-zinc-300 inline-block mb-1 font-semibold'>NAME</label>
                            <input className='border-slate-500 border-2 bg-[#4d509843] rounded-sm block py-1 pl-2 w-full hover:bg-[#4d50988b] focus:border-purple-700 focus:border-2 outline-none text-zinc-300 font-semibold' id="username" placeholder="Enter Name"/>
                            <IcT icons='checks' classNameCustom='absolute top-9 right-1 text-green-300 pr-1' />
                            <IcT icons='x' classNameCustom='absolute top-9 right-1 text-red-600 pr-1' />
                            <small className='text-red-600 font-semibold px-2'>Error Message</small>
                        </div>
                        <div className='relative' id='form-control'>
                            <label className='text-zinc-300 inline-block mb-1 font-semibold'>EMAIL</label>
                            <input className='border-slate-500 border-2 bg-[#4d509843] rounded-sm block py-1 pl-2 w-full hover:bg-[#4d50988b] focus:border-purple-700 focus:border-2 outline-none text-zinc-300 font-semibold' id="email" placeholder="Enter Email" />
                            <IcT icons='checks' classNameCustom='absolute top-9 right-1 text-green-300 pr-1' />
                            <IcT icons='x' classNameCustom='absolute top-9 right-1 text-red-600 pr-1' />
                            <small>Error Message</small>
                        </div>
                        <div className='relative' id='form-control'>
                            <label className='text-zinc-300 block mb-1 font-semibold'>DATE OF BIRTH</label>
                            <input className='border-slate-500 border-2 bg-[#4d509843] rounded-sm inline-block py-1 pl-2 w-1/4 hover:bg-[#4d50988b] focus:border-purple-700 focus:border-2 outline-none text-zinc-300 font-semibold' placeholder="Day"/>
                            <input className='border-slate-500 border-2 bg-[#4d509843] rounded-sm inline-block py-1 pl-2 w-1/4 hover:bg-[#4d50988b] focus:border-purple-700 focus:border-2 outline-none text-zinc-300 font-semibold' placeholder="Month" />
                            <input className='border-slate-500 border-2 bg-[#4d509843] rounded-sm inline-block py-1 pl-2 w-1/2 hover:bg-[#4d50988b] focus:border-purple-700 focus:border-2 outline-none text-zinc-300 font-semibold' placeholder="Year" />
                            <IcT icons='checks' classNameCustom='absolute top-9 right-1 text-green-300 pr-1' />
                            <IcT icons='x' classNameCustom='absolute top-9 right-1 text-red-600 pr-1' />
                            <small className='block'>Error Message</small>
                        </div>
                    </form>
                </section>
                {/* 
                // ******************************************************
                // * BUTTONS
                // ****************************************************** */}
                <section>
                    <button className='px-6 py-1 border-2 border-purple-800 bg-slate-800 rounded-lg text-zinc-300'>Cancel</button>
                    <button>Submit</button>
                </section>


            </div>
        </div>
      </div>

    )
}

export default ICodeThis;

 