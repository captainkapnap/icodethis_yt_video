import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { any } from 'zod';

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
      <div id="bodyDiv" className="flex justify-center items-center min-h-screen transition">
        <div className="special bg-slate-900 transition space-y-6 shadow-lg rounded-xl max-w-full w-80 md:max-w-80 text-white overflow-hidden">
            <section className="bg-blue-500 p-8 rounded-xl rounded-b-none text-center relative">
                <button id='btnToggleDark' className='absolute top-4 right-4 hover:opacity-75 w-6 h-6 overflow-hidden' onClick={toggleDarkBtn}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="moon absolute top-0 left-0 transition dark:translate-x-6 -translate-x-0 duration-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" stroke-width="0" fill="currentColor"></path>
                            </svg> 
                            <svg xmlns="http://www.w3.org/2000/svg" className="sun absolute top-0 left-0 transition -translate-x-6 dark:translate-x-0 duration-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z"></path>
                                <path d="M6.343 17.657l-1.414 1.414"></path>
                                <path d="M6.343 6.343l-1.414 -1.414"></path>
                                <path d="M17.657 6.343l1.414 -1.414"></path>
                                <path d="M17.657 17.657l1.414 1.414"></path>
                                <path d="M4 12h-2"></path>
                                <path d="M12 4v-2"></path>
                                <path d="M20 12h2"></path>
                                <path d="M12 20v2"></path>
                            </svg>
                </button>

                    <svg xmlns="http://www.w3.org/2000/svg" className="block mx-auto" width="60" height="60" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M16.54 7c-.805 -2.365 -2.536 -4 -4.54 -4c-2.774 0 -5.023 2.632 -5.023 6.496c0 1.956 1.582 4.727 2.512 6"></path>
                        <path d="M4.711 11.979c-1.656 1.877 -2.214 4.185 -1.211 5.911c1.387 2.39 5.138 2.831 8.501 .9c1.703 -.979 2.875 -3.362 3.516 -4.798"></path>
                        <path d="M15.014 19.99c2.511 0 4.523 -.438 5.487 -2.1c1.387 -2.39 -.215 -5.893 -3.579 -7.824c-1.702 -.979 -4.357 -1.235 -5.927 -1.07"></path>
                        <path d="M10.493 9.862c.48 .276 1.095 .112 1.372 -.366a1 1 0 0 0 -.367 -1.365a1.007 1.007 0 0 0 -1.373 .366a1 1 0 0 0 .368 1.365z"></path>
                        <path d="M9.5 15.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                        <path d="M15.5 14m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                    </svg>
                <h1 className="text-center font-bold text-2xl mt-4 mb-2">Untercom
                    <span className="bg-blue-700 text-xl ml-2 rounded p-1 px-2">APP</span>
                </h1>
                <p>Convert your hottest leads</p>
            </section>

            <section className='p-8 text-slate-300 transition dark:text-slate-600 text-center delay-100'>
                <ul className='space-y-4'>
                    <li className='hover:opacity-75'><a href="">About</a></li>
                    <li className='hover:opacity-75'><a href="">Settings</a></li>
                    <li className='hover:opacity-75'><a href="">Help</a></li>
                </ul>

                <button className='hover:opacity-75 border-2 border-slate-600 dark:border-slate-300 mt-20 rounded py-2 w-full text-slate-100 transition dark:text-slate-600'>Go to App</button>
            </section>
        </div>

      </div>
      </div>
    )
}

export default ICodeThis;

 