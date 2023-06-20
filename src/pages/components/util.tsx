import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { any, boolean } from 'zod';
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
    // ================ STATE ================
    const [upShowing, setUpShowing] = useState<boolean>(true);


    // ================ HELPERS ================
    function handleChevronClick() {
        if (upShowing) {
            setUpShowing(false)
        } else if (!upShowing) {
            setUpShowing(true)
        }
    }
    
    // ================ LIFECYCLE ================
    useEffect(() => {
       })

    // ================ RETURN ================
    return (
      <div id="toggleDarkDiv" className="dark">
        <div id="bodyDiv" className="bg-stone-200 min-h-screen flex justify-center items-center">
  
            <div className="w-80 h-14 bg-stone-200 border-zinc-300 border-[1px] rounded-md drop-shadow shadow-lg flex" id="container">
                <div className='w-1/5 bg-stone-200 h-full rounded-md justify-center flex items-center text-black hover:text-blue-600' id='arrow'>
                    {upShowing ? (
                        <button onClick={handleChevronClick}>
                            <IcT icons="chevronUp" />
                        </button>
                    ) : (
                        <button onClick={handleChevronClick}>
                            <IcT icons="chevronDown" />
                        </button>
                    )}
                </div>
                <div className='w-3/5 p-1' id='inputBox'>
                        <input className='h-full w-full outline-none px-2 text-lg shadow-sm rounded-sm border-slate-300 border focus:border-blue-300 focus:border' type="search" />
                </div>
                <div className='w-1/5 flex justify-center items-center' id='searchButton'>
                        <button className=''>
                            <IcT icons="search" />
                        </button>
                </div>
            </div>
        </div>
      </div>

    )
}

export default ICodeThis;

 