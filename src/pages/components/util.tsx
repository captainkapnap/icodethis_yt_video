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
    useEffect(() => {
       })
    
    return (
      <div id="toggleDarkDiv" className="dark">
        <div id="bodyDiv" className="bg-[#262747] min-h-screen flex justify-center items-center">
  
            <div className="bg-[#2F3056] w-80 h-96 flex flex-col" id="container">
                {/*
                // ****************************************************** 
                // * HEADER
                // ****************************************************** */}
                <section className='h-16 w-full relative'>
                    <h1 className='text-slate-300 font-semibold p-4 pl-8'>Edit Your Account</h1>
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
                <section className='bg-slate-700 h-60'>
                    <form className='px-8 py-4' id='form'>
                        <div className='' id='form-control'>
                            <label>NAME</label>
                            <input className='' id="username" />
                            <IcT icons='checks' />
                            <IcT icons='x' />
                            <small>Error Message</small>
                        </div>
                        <div className='' id='form-control'>
                            <label>EMAIL</label>
                            <input className='' id="email" />
                            <IcT icons='checks' />
                            <IcT icons='x' />
                            <small>Error Message2</small>
                        </div>
                        <div className='' id='form-control'>
                            <label>DATE OF BIRTH</label>
                            <input className='inline' /><input className='inline' /><input className='' />
                            <IcT icons='checks' />
                            <IcT icons='x' />
                            <small>Error Message</small>
                        </div>
                    </form>
                </section>
                {/* 
                // ******************************************************
                // * BUTTONS
                // ****************************************************** */}
                <section>

                </section>


            </div>
        </div>
      </div>

    )
}

export default ICodeThis;

 