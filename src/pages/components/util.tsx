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
if (typeof window !== 'undefined') {

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
      <div id="bodyDiv" className="bg-white flex justify-center items-center min-h-screen">
        <div className="bg-slate-900 p-8 space-y-6 shadow-lg rounded max-w-full md:max-w-80">
            <h1 className="text-center font-bold text-4xl text-white">Untercom
                <span className="bg-blue-900 text-white text-xl ml-2 rounded p-1">APP</span>
            </h1>
        </div>

      </div>
    )
}

export default ICodeThis;

 