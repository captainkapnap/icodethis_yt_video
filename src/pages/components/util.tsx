import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { any } from 'zod';



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
// * Lazy Loading for client side document method.
// ******************************************************
const ClientOnlyComponent = dynamic(() => import('./client-only'), {
    ssr: false,
})

function ControlDOM() {
    
    return (
        <div id='slider' className='flex h-96 text-white relative'>
            {images.map((image) => (
                <div className='w-96 h-full' key={image}>
                    <img className="w-full" src={image} alt="Unsplash Image" />
                    <div>
                        <h1 className="text-4xl font-bold my-4">Title</h1>
                        <p className="text-lg font-medium">Some description</p>
                    </div>
                </div>
            ))}
        </div>
    )
    // ******************************************************
    // * Vanilla JS method below... can't use it w/o hydration errors and shit in React
    // ******************************************************
    
    // if (typeof window !== 'undefined') {
        //     const sliderEl: HTMLElement | null = document.getElementById('slider');
        
        //     images.forEach(image => {
            //         const slideEl: HTMLDivElement = document.createElement('div');
            
            //         if (slideEl) {
    //             slideEl.className = "w-96 h-full";
    //             slideEl.innerHTML = `
    //                 <img className="w-full" src="${image}" alt="Unsplash Image" />
    //                 <div>
    //                     <h1 className="text-4xl font-bold my-4">Title</h1>
    //                     <p className="text-lg font-medium">Some description</p>
    //                 </div>
    //             `
    //         }
    
    //         sliderEl?.appendChild(slideEl);
    //     })
    // }
}




function ICodeThis() {
    // * STATE
    let [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);
    const [numOfSlides, setNumOfSlides] = useState<number>(1);
    const slides: any = [];
    const IMG_GAP = 40;
    const IMG_WIDTH = 384;
    const images = [
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=792&q=80',
        'https://images.unsplash.com/photo-1491485880348-85d48a9e5312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        'https://images.unsplash.com/photo-1598188306155-25e400eb5078?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
        'https://images.unsplash.com/photo-1599572739984-8ae9388f23b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    ];
    
    // * LIFE CYCLE    
    
    useEffect(() => {
        images.forEach((image, idx) => {
            slides.push(`
            <div className='w-96 h-full absolute transition' key=${image} style={{left: \`${idx * (IMG_WIDTH + IMG_GAP)}px\`, transform: \`translateX(${activeSlideIdx * (IMG_WIDTH + IMG_GAP)}px\`}}>
                <img className='w-96 h-72 object-cover' src=${image} alt='Unsplash Image' />
                <div>
                    <h1 className='text-4xl font-bold my-4'>Title</h1>
                    <p className='text-lg font-medium'>Some description</p>
                </div>
            </div>
            `);
        })
        console.log("TOTAL IMAGES PUSHED TO SLIDES: ", slides.length)
        setNumOfSlides(slides.length -1)
    }, [])
    
    // useEffect(() => {
    //    console.log("in useEffect: ", activeSlideIdx)


    //     // slides.forEach((slide: any, index: number) => {
    //     //     slide.style.transform = `translateX(${activeSlideIdx * (IMG_WIDTH + IMG_GAP)}px)`
    //     // })
    // }, [activeSlideIdx])


    // ******************************************************
    // * HELPERS

    function btnRight() {
        if (activeSlideIdx === 0) {
            setActiveSlideIdx(numOfSlides);
        } else {
            setActiveSlideIdx(activeSlideIdx - 1);
        }
    }
    
    function btnLeft() {
        if (activeSlideIdx === numOfSlides) {
            setActiveSlideIdx(0);
        } else {
            setActiveSlideIdx(activeSlideIdx + 1);
        }
    }

    // * END HELPERS
    // _____________________________________________________
    
    return (
      <div id="toggleDarkDiv" className="dark">
        <div id="bodyDiv" className="bg-slate-900 flex justify-center items-center min-h-screen">
            <div className='bg-purple-700 flex flex-col w-full text-white'>

                <div id='slider' className='flex w-full relative h-96 overflow-hidden p-2' style={{ }}>
                {images.map((image, idx) => (
                    <div className='w-96 h-full absolute transition' key={image} style={{left: `${idx * (IMG_WIDTH + IMG_GAP)}px`, transform: `translateX(${activeSlideIdx * (IMG_WIDTH + IMG_GAP)}px`}}>
                        <img className="w-96 h-72 object-cover" src={image} alt="Unsplash Image" />
                        <div>
                            <h1 className="text-4xl font-bold my-4">Title</h1>
                            <p className="text-lg font-medium">Some description</p>
                        </div>
                    </div>
                ))}
            </div>

                <div className='flex mx-auto mt-12 mb-4 gap-8'>
                    <button onClick={btnLeft} className='px-4 py-1 border-4 rounded-full hover:bg-purple-800'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M9.586 4l-6.586 6.586a2 2 0 0 0 0 2.828l6.586 6.586a2 2 0 0 0 2.18 .434l.145 -.068a2 2 0 0 0 1.089 -1.78v-2.586h7a2 2 0 0 0 2 -2v-4l-.005 -.15a2 2 0 0 0 -1.995 -1.85l-7 -.001v-2.585a2 2 0 0 0 -3.414 -1.414z" strokeWidth="0" fill="currentColor"></path>
                            </svg>
                    </button>
                    <button onClick={btnRight} className='px-4 py-1 border-4 rounded-full hover:bg-purple-800'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M12.089 3.634a2 2 0 0 0 -1.089 1.78l-.001 2.586h-6.999a2 2 0 0 0 -2 2v4l.005 .15a2 2 0 0 0 1.995 1.85l6.999 -.001l.001 2.587a2 2 0 0 0 3.414 1.414l6.586 -6.586a2 2 0 0 0 0 -2.828l-6.586 -6.586a2 2 0 0 0 -2.18 -.434l-.145 .068z" strokeWidth="0" fill="currentColor"></path>
                            </svg>
                    </button>
                </div>
            </div>
        </div>
      </div>

    )
}

export default ICodeThis;

 