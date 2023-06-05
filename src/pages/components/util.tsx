import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { any } from 'zod';

const ClientOnlyComponent = dynamic(() => import('./client-only'), {
    ssr: false,
})

let colorCards: any;  // needs to be defined since its first ACTUALLy defined
// within the client side error handling code

// window.addEventListener()

// lazy loading of 'document' needs this validator if statement
if (typeof window !== 'undefined') {
    colorCards = document.querySelectorAll('.color-card');
    const btnElement = document.getElementById('btn');
    btnElement?.addEventListener('click', () => {
        createPallete()
    })
}

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

function createPallete() {
    // console.log(colorCards)
    if (colorCards) {
        console.log('hi')
        colorCards.forEach((card) => {
            console.log(card);
            const newColor = generateColor();
            const divElement = card.querySelector('div');
            const pElement = card.querySelector('p');

            if (divElement) {
                divElement.style.background = newColor;
                // card.querySelector('div').style.background = newColor;
            }
            if (pElement) {
                pElement.innerText = newColor;
                // card.querySelector('p').innerText = newColor;
            }

            console.log(card);
        })
    }
}

function generateColor() {
    const hexArray = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']

    let color ='#';

    for (let i = 0; i < 6; i++) {
        color += hexArray[Math.floor(Math.random() * hexArray.length)];
    }

    // console.log(color);
    return color;
}

function ICodeThis() {
    useEffect(() => {
       document.addEventListener('keydown', e => {
        if (e.code === "Space") {
            createPallete();
        }
       })

       colorCards.forEach(card => {
        card.addEventListener('click', () => {
            copyToClipboard(card.innerText);
        })
       })
    }, [])
    
    return (
      <div className="flex min-h-screen flex-col items-center bg-gray-200 pt-15">
        <h1 className="text-4xl font-bold my-10">Color pallete generator</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-5 gap-8 m-4 container">

          <div className="color-card bg-white rounded-xl p-2 text-center cursor-pointer transition hover:-translate-y-6 hover:shadow-xl">
            <div className="bg-teal-400 h-72 max-w-full rounded"></div>
            <p className="font-semibold">#2dd4bf</p>
          </div>

          <div className="color-card bg-white rounded-xl p-2 text-center cursor-pointer transition hover:-translate-y-6 hover:shadow-xl">
            <div className="bg-sky-400 h-72 max-w-full rounded"></div>
            <p className="font-semibold">#38bdf8</p>
          </div>

          <div className="color-card bg-white rounded-xl p-2 text-center cursor-pointer transition hover:-translate-y-6 hover:shadow-xl">
            <div className="bg-rose-400 h-72 max-w-full rounded"></div>
            <p className="font-semibold">#fb7185</p>
          </div>

          <div className="color-card bg-white rounded-xl p-2 text-center cursor-pointer transition hover:-translate-y-6 hover:shadow-xl">
            <div className="bg-amber-400 h-72 max-w-full rounded"></div>
            <p className="font-semibold">#fbbf24</p>
          </div>

          <div className="color-card bg-white rounded-xl p-2 text-center cursor-pointer transition hover:-translate-y-6 hover:shadow-xl">
            <div className="bg-lime-400 h-72 max-w-full rounded"></div>
            <p className="font-semibold">#a3e635</p>
          </div>
        </div>

        <button id='btn' onClick={generateColor} className="bg-purple-400 rounded py-4 px-10 text-white font-bold shadow mt-20 mb-4 hover:opacity-75">Generate Pallete</button>
        
        <p>Press SPACEBAR to generate new pallete</p>
      </div>
    )
}

export default ICodeThis;

 