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


    // ================ HELPERS ================

    
    // ================ LIFECYCLE ================
    useEffect(() => {
       })

    // ================ RETURN ================
    return (
      <div id="toggleDarkDiv" className="dark">
        <div id="bodyDiv" className="bg-slate-900 min-h-screen flex justify-center items-center">
  
            <div className="w-[30rem] md:w-1/2 h-52 flex rounded-md shadow-purple-400 shadow-lg" id="container">
                {/* -------------------------- */}
                <div className="w-1/3 h-full bg-purple-700 rounded-l-md p-4 relative hover:border-zinc-200 hover:border-2">
                    <div className="text-zinc-400 font-semibold">
                        <small>Featured</small>
                    </div>
                    <div className="text-zinc-300">
                        <h1 className='font-bold mb-2'>Challenge</h1>
                    </div>
                    <div className="mb-4">
                        <small className='text-zinc-400 font-extralight font-serif tracking-tight'>Design an icon set with your favourite hobbies.</small>
                    </div>
                    <div className="absolute bottom-4">
                        <button className='text-zinc-400 font-semibold text-sm hover:font-bold hover:text-zinc-300'>View Details &gt;</button>
                    </div>
                </div>
                {/* -------------------------- */}
                <div className="w-1/3 h-full bg-fuchsia-700 p-4 relative  hover:border-zinc-200 hover:border-2">
                    <div className="text-zinc-400 font-semibold">
                        <small>Blog</small>
                    </div>
                    <div className="text-zinc-300">
                        <h1 className='font-bold mb-2'>Interviews</h1>
                    </div>
                    <div className="mb-4">
                        <small className='text-zinc-400 font-extralight font-serif tracking-tight leading-1'>8 examples of interviews with people who travelled through Europe.</small>
                    </div>
                    <div className="absolute bottom-4">
                        <button className='text-zinc-400 font-semibold text-sm hover:font-bold hover:text-zinc-300'>Read Post &gt;</button>
                    </div>
                </div>
                {/* -------------------------- */}
                <div className="w-1/3 h-full bg-pink-700 rounded-r-md p-4 relative hover:border-zinc-200 hover:border-2">
                    <div className="text-zinc-400 font-semibold">
                        <small>Diets</small>
                    </div>
                    <div className="text-zinc-300">
                        <h1 className='font-bold mb-2'>Practice</h1>
                    </div>
                    <div className="mb-4">
                        <small className='text-zinc-400 font-extralight font-serif tracking-tight leading-1'>Generate daily exercises to improve your skills.</small>
                    </div>
                    <div className="absolute bottom-4">
                        <button className='text-zinc-400 font-semibold text-sm hover:font-bold hover:text-zinc-300'>Generate exercises &gt;</button>
                    </div>
                </div>
            </div>
        </div>
      </div>

    )
}

export default ICodeThis;

 