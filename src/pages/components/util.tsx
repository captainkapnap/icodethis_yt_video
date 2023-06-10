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
function toggleDark() {
    if (typeof window !== 'undefined') {
        const div2toggle = document.getElementById('div2toggle');
        div2toggle?.classList.toggle('dark');
        // console.log(div2toggle);
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
       }, [])
    
    return (
        <>
      <div id="div2toggle" className="flex dark">
        <nav className="bg-slate-900 text-white rounded-xl shadow-2xl p-6 dark:w-48 relative">
            <button onClick={toggleDark} className="absolute -right-6 top-4 bg-slate-900 rounded-r p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="dark:hidden" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M20 12l-10 0"></path>
                    <path d="M20 12l-4 4"></path>
                    <path d="M20 12l-4 -4"></path>
                    <path d="M4 4l0 16"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="hidden dark:block" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 12l10 0"></path>
                    <path d="M4 12l4 4"></path>
                    <path d="M4 12l4 -4"></path>
                    <path d="M20 4l0 16"></path>
                </svg>
            </button>
        <svg xmlns="http://www.w3.org/2000/svg" className="mb-6" width="48" height="48" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M7.5 4.21l0 .01"></path>
   <path d="M4.21 7.5l0 .01"></path>
   <path d="M3 12l0 .01"></path>
   <path d="M4.21 16.5l0 .01"></path>
   <path d="M7.5 19.79l0 .01"></path>
   <path d="M12 21l0 .01"></path>
   <path d="M16.5 19.79l0 .01"></path>
   <path d="M19.79 16.5l0 .01"></path>
   <path d="M21 12l0 .01"></path>
   <path d="M19.79 7.5l0 .01"></path>
   <path d="M16.5 4.21l0 .01"></path>
   <path d="M12 3l0 .01"></path>
        </svg>

            <ul>
                {/* Need to make a child span to keep the text/icon absolute positioning
                This allows the transition to move directly from left to right and not
                be choppy by transitioning both left and right */}
                <li><a className="cursor-default block group relative w-12 h-12 my-2 dark:w-full" href="#">
                    <span className="flex gap-2 hover:bg-slate-800 absolute rounded-full p-3 dark:group-hover:pr-3 dark:w-full transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                            <path d="M10 12h4v4h-4z"></path>
                        </svg>
                        <span className="opacity-0 dark:opacity-100 group-hover:opacity-100 transition">
                            Home</span>
                    </span>
                </a></li>
                <li><a className="cursor-default block group relative w-12 h-12 my-2 dark:w-full" href="#">
                    <span className="flex gap-2 hover:bg-slate-800 absolute rounded-full p-3 dark:group-hover:pr-3 dark:w-full transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-layout-dashboard" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 4h6v8h-6z"></path>
                        <path d="M4 16h6v4h-6z"></path>
                        <path d="M14 12h6v8h-6z"></path>
                        <path d="M14 4h6v4h-6z"></path>
                    </svg>
                    <span className="opacity-0 dark:opacity-100 group-hover:opacity-100 transition">
                        Dashboard</span>
                    </span>
                </a></li>
                <li><a className="cursor-default block group relative w-12 h-12 my-2 dark:w-full" href="#">
                    <span className="flex gap-2 hover:bg-slate-800 absolute rounded-full p-3 dark:group-hover:pr-3 dark:w-full transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-building-store" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M3 21l18 0"></path>
                        <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4"></path>
                        <path d="M5 21l0 -10.15"></path>
                        <path d="M19 21l0 -10.15"></path>
                        <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4"></path>
                    </svg>
                    <span className="opacity-0 dark:opacity-100 group-hover:opacity-100 transition">
                        Store</span>
                    </span>
                </a></li>
                <li><a className="cursor-default block group relative w-12 h-12 my-2 dark:w-full" href="#">
                    <span className="flex gap-2 hover:bg-slate-800 absolute rounded-full p-3 dark:group-hover:pr-3 dark:w-full transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-checkup-list" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
                        <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
                        <path d="M9 14h.01"></path>
                        <path d="M9 17h.01"></path>
                        <path d="M12 16l1 1l3 -3"></path>
                    </svg>
                    <span className="opacity-0 dark:opacity-100 group-hover:opacity-100 transition">
                        Reports</span>
                    </span>
                </a></li>
                <li><a className="cursor-default block group relative w-12 h-12 my-2 dark:w-full" href="#">
                    <span className="flex gap-2 hover:bg-slate-800 absolute rounded-full p-3 dark:group-hover:pr-3 dark:w-full transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-codepen" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M3 15l9 6l9 -6l-9 -6l-9 6"></path>
                        <path d="M3 9l9 6l9 -6l-9 -6l-9 6"></path>
                        <path d="M3 9l0 6"></path>
                        <path d="M21 9l0 6"></path>
                        <path d="M12 3l0 6"></path>
                        <path d="M12 15l0 6"></path>
                    </svg>
                    <span className="opacity-0 dark:opacity-100 group-hover:opacity-100 transition">
                        Design</span>
                    </span>
                </a></li>
                <li><a className="cursor-default block group relative w-12 h-12 my-2 dark:w-full" href="#">
                    <span className="flex gap-2 hover:bg-slate-800 absolute rounded-full p-3 dark:group-hover:pr-3 dark:w-full transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
                        <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                    </svg>
                    <span className="opacity-0 dark:opacity-100 group-hover:opacity-100 transition">
                        Settings</span>
                    </span>
                </a></li>
            </ul>
            <div className="flex mt-20">
                <img className="h-12 w-12 object-cover rounded-full" src="https://scontent-yyz1-1.xx.fbcdn.net/v/t1.18169-9/20768197_10154464589682242_3330289575639811422_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=174925&_nc_ohc=5uKxYpDV6d8AX_qistC&_nc_ht=scontent-yyz1-1.xx&oh=00_AfBvv71_5zH5XRbsm7rKDtwl8OwPfpl7p1UZ50PJ6cG6fw&oe=64A788F9" alt="Kris Kaps" />
                <div className="ml-4 hidden dark:block">
                    <p className="text-lg font-semibold">Kris Kaps</p>
                    <small className="text-slate-300">kris@kaperi.com</small>
                </div>
            </div>
        </nav>

      </div>
      </>
    )
}

export default ICodeThis;

 