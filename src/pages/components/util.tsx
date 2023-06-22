import { MouseEventHandler, useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { any } from 'zod';
import Link from 'next/link';
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

type ActiveMenu = 'Home' | 'Trending' | 'Browse' | 'Library' 
type PlaylistsMenu = ['New Music' | 'Playlists' | 'Top Charts' | 'Genre'] | string[]
type PromotedMusic = {artist: string, song: string, image: string, specialMsg: string | null}[];

const listOfPromoted: PromotedMusic = [
    {artist: 'Nicki Minaj', song: 'Queen', image: 'https://footwearnews.com/wp-content/uploads/2021/11/MEGA73465_010.jpg', specialMsg: 'New Album'},
    {artist: 'Snoop Dogg', song: 'Gin and Juice', image: 'https://footwearnews.com/wp-content/uploads/2022/08/snoopdogg.jpg', specialMsg: 'Suprise Song'},
    {artist: 'Kanye West', song: 'College Dropouts', image: 'https://footwearnews.com/wp-content/uploads/2023/05/GettyImages-1254881113.jpg', specialMsg: 'New Album'},
];

function PromotedMusicCards({artist, song, image, specialMsg}: PromotedMusic[number]) {


    return (
        <div className='w-[90%] h-full border border-blue-900'>
            <div className='flex flex-wrap '>
                <div className="w-[60%] h-[20%] border border-red-400" id="song">
                    {song}
                </div>
                <div className="w-[30%] h-[20%] border border-red-400" id="specialMsg">
                    {specialMsg}
                </div>
                <div className="w-[90%] h-[20%] border border-red-400" id="artist">
                    {artist}
                </div>
                <div className="w-[90%] h-[50%] border border-red-400 rounded-xl" id="image">
                    <img src={image} alt="image" className='w-full h-full object-cover' />
                </div>
            </div>
        </div>
    )
}


function ICodeThis() {
    // ================ STATE ================
    const [activeMenu, setActiveMenu] = useState<ActiveMenu>('Browse');
    const [activePlaylist, setActivePlaylist] = useState<number>(0)
    const [playlistsMenu, setPlaylistsMenu] = useState<PlaylistsMenu>(['New Music', 'Playlists', 'Top Charts', 'Genre']);
    const scrollContainerActiveMenuRef = useRef<HTMLDivElement>(null);
    const scrollContainerPromotedRef = useRef<HTMLDivElement>(null);

    // ================ HELPERS ================
    function handlePlayList(selPlaylist: number): MouseEventHandler<HTMLAnchorElement> {
        setActivePlaylist(selPlaylist);

        return () => {
            console.log(selPlaylist);
        }
    }
    
 

    // ================ LIFECYCLE ================
    useEffect(() => {
        const scrollContainer = scrollContainerActiveMenuRef.current;

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
  
            <div className="flex flex-col w-72 h-[85vh] bg-slate-950 shadow-zinc-900 shadow-lg text-stone-300" id="container">
                <div className='w-full h-[12%] font-bold text-2xl  flex items-center pl-4 text-stone-200' id="pageTitle">
                    {activeMenu === 'Home' && ( activeMenu ) }
                    {activeMenu === 'Trending' && ( activeMenu ) }
                    {activeMenu === 'Browse' && ( activeMenu ) }
                    {activeMenu === 'Library' && ( activeMenu ) }
                </div>
                <div className='w-full h-[8%] whitespace-nowrap overflow-hidden hover:overflow-scroll flex items-center ' style={{ scrollBehavior: 'smooth'}} id="playlists" ref={scrollContainerActiveMenuRef}>
                    {playlistsMenu.map((playList, index: number) => (
                        //<Link href="#" key={playList}  className={`${activePlaylist === index ? 'font-bold mx-3 text-indigo-400 font-mono underline underline-offset-[7px]' : 'mx-3 hover:text-indigo-500 font-mono  hover:underline hover:underline-offset-[7px]'}`} onClick={() => handlePlayList(index)}>
                        <Link href="#" key={playList}  className={`${activePlaylist === index ? 'font-bold mx-3 text-rose-600 font-mono underline underline-offset-[7px]' : 'mx-3 hover:text-stone-100 font-mono  hover:underline hover:underline-offset-[7px]'}`} onClick={() => handlePlayList(index)}>
                            {playList}
                        </Link>
                    ))}
                </div>
                <div className='w-full h-[25%] flex whitespace-nowrap overflow-hidden items-center' style={{ scrollBehavior: 'smooth'}} id="promotedMusic" ref={scrollContainerPromotedRef}>
                        {listOfPromoted.map((promotedSong, index: number) => (
                            <PromotedMusicCards artist={promotedSong.artist} song={promotedSong.song} image={promotedSong.image} specialMsg={promotedSong.specialMsg} key={index} />
                        ))}
                </div>
                <div className='w-full h-[45%]' id="songList">

                </div>
                <div className='w-full h-[10%] flex bg-slate-900' id="bottomMenu">
                    {/* <nav className='flex'> */}
                        <button className="w-[25%] h-full justify-center items-center">
                            <IcT icons="home" classNameCustom='w-[35%] h-full mx-auto'/>
                            <small>Home</small>
                        </button>
                        <button className="w-[25%] h-full">
                            <IcT icons="flame" classNameCustom='w-[35%] h-full mx-auto'/>
                            <small>Trending</small>
                        </button>
                        <button className="w-[25%] h-full">
                            <IcT icons="search" classNameCustom='w-[35%] h-full mx-auto'/>
                            <small>Browse</small>
                        </button>
                        <button className="w-[25%] h-full">
                            <IcT icons="library"classNameCustom='w-[35%] h-full mx-auto'/>
                            <small>Library</small>
                        </button>
                        
                    {/* </nav> */}
                </div>

            </div>
        </div>
      </div>

    )
}

export default ICodeThis;

 