import { useEffect, useState, useRef } from 'react';
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

// 1) Build the Card + the buttons
// 2) Add the title.  Section or no?
// 3) Highlight button if clicked, only 1 button max.
// 4) Add minimize button

function ICodeThis() {
    // ================ STATE ================
    const [selectedButton, setSelectedButton] = useState<number>();

    // ================ HELPERS ================
    function handleButtonClick(buttonId: number) {
        setSelectedButton(buttonId);
    }

    // ================ LIFECYCLE ================
    useEffect(() => {
       })

    // ================ RETURN ================
    return (
      <div id="toggleDarkDiv" className="dark">
        <div id="bodyDiv" className="bg-[#E7E9F8] min-h-screen flex justify-center items-center">
  
            <div className="bg-white w-[19rem] h-72 rounded-lg shadow-2xl flex flex-col relative" id="container">
                <div className='bg-white w-7 h-4 rounded-t-lg absolute flex flex-col -top-3 right-0'>
                    <button className="text-zinc-500 font-bold text-2xl justify-center items-center absolute -top-3 right-2">
                        -
                    </button>
                </div>
                
                <div className=''>
                    <h1 className='font-bold py-4 px-10 text-center'>
                        Why did you come to our support site today?
                    </h1>
                </div>
                <div className='py-4 px-6 flex flex-col gap-2'>
                    <button onClick={() => handleButtonClick(1)} className={`${selectedButton === 1 ? 'bg-blue-800 text-white' : ''} bg-[#f1ecec] rounded border-2 border-zinc-300 w-full h-10 text-[0.7rem] hover:bg-blue-300 hover:border-zinc-500 hover:drop-shadow-lg`}>
                        I found some bugs and I want to report them.
                    </button>
                    <button onClick={() => handleButtonClick(2)} className={`${selectedButton === 2 ? 'bg-blue-800 text-white' : ''} bg-[#f1ecec] rounded border-2 border-zinc-300 w-full h-10 text-[0.7rem] hover:bg-blue-300 hover:border-zinc-500 hover:drop-shadow-lg`}>
                        I can't post to the forum.
                    </button>
                    <button onClick={() => handleButtonClick(3)} className={`${selectedButton === 3 ? 'bg-blue-800 text-white' : ''} bg-[#f1ecec] rounded border-2 border-zinc-300 w-full h-10 text-[0.7rem] hover:bg-blue-300 hover:border-zinc-500 hover:drop-shadow-lgselectedButton === 3 ? 'selected' : '' `}>
                        I have in-game purchasing issues.
                    </button>
                    
                </div>
                <div className='flex flex-col'>
                    <button  className='justify-center text-blue-500 font-bold hover:text-blue-700'>
                        SUBMIT
                    </button>
                </div>

            </div>
        </div>
      </div>

    )
}

export default ICodeThis;

 