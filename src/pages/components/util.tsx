import { MouseEventHandler, useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { any } from 'zod';
import Link from 'next/link';


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

type ActiveMenu = 'Home' | 'Trending' | 'Browse' | 'Library' 
type PlaylistsMenu = ['New Music' | 'Playlists' | 'Top Charts' | 'Genre'] | string[]

function ICodeThis() {
    // ================ STATE ================
    const [activeMenu, setActiveMenu] = useState<ActiveMenu>('Browse');
    const [activePlaylist, setActivePlaylist] = useState<number>(0)
    const [playlistsMenu, setPlaylistsMenu] = useState<PlaylistsMenu>(['New Music', 'Playlists', 'Top Charts', 'Genre']);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // ================ HELPERS ================
    function handlePlayList(selPlaylist: number): MouseEventHandler<HTMLAnchorElement> {
        setActivePlaylist(selPlaylist);

        return () => {
            console.log(selPlaylist);
        }
    }
    
    // ================ LIFECYCLE ================
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            if (scrollContainer) {
                scrollContainer.scrollLeft += e.deltaY;
            }
        }
            
        if (scrollContainer) {
            scrollContainer.addEventListener('wheel', handleWheel);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('wheel', handleWheel);
            }
        }


    }, [])

    // ================ RETURN ================
    return (
      <div id="toggleDarkDiv" className="dark">
        <div id="bodyDiv" className="bg-black min-h-screen flex justify-center items-center flex-col">
  
            <div className="flex flex-col w-72 h-[85vh] bg-slate-950 shadow-zinc-900 shadow-lg text-indigo-900" id="container">
                <div className='w-full h-[12%] font-bold text-2xl border border-red-900 flex items-center pl-4' id="pageTitle">
                    {activeMenu === 'Home' && ( activeMenu ) }
                    {activeMenu === 'Trending' && ( activeMenu ) }
                    {activeMenu === 'Browse' && ( activeMenu ) }
                    {activeMenu === 'Library' && ( activeMenu ) }
                </div>
                <div className='w-full h-[8%] whitespace-nowrap overflow-hidden hover:overflow-scroll flex items-center border border-red-900' style={{ scrollBehavior: 'smooth'}} id="playlists" ref={scrollContainerRef}>
                    {playlistsMenu.map((playList, index: number) => (
                        <Link href="#" key={playList}  className={activePlaylist === index ? 'font-bold mx-2 hover:underline hover:text-indigo-600 font-mono' : 'mx-2 hover:underline hover:text-indigo-600 font-mono'} onClick={() => handlePlayList(index)}>
                            {playList}
                        </Link>
                    ))}
                </div>
                <div className='w-full h-[25%] border border-red-900' id="promotedMusic">

                </div>
                <div className='w-full h-[45%] border border-red-900' id="songList">

                </div>
                <div className='w-full h-[15%] border border-red-900' id="bottomMenu">
                    <nav>

                    </nav>
                </div>

            </div>
        </div>
      </div>

    )
}

export default ICodeThis;

 