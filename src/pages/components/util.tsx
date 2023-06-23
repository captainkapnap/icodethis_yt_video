import { MouseEventHandler, useEffect, useState, useRef, useCallback } from 'react';
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
type PromotedMusic = {artist: string, song: string, image: string, specialMsg: string | null, indexNum?: number | null}[];
type SongList = {artist: string, song: string, profilePic: string}[];

const listOfPromoted: PromotedMusic = [
    {artist: 'Nicki Minaj', song: 'Queen', image: 'https://www.rnbjunk.com/foto/2022/08/biografia-nicki-minaj-1200x675.jpg.webp', specialMsg: 'New Album'},
    {artist: 'Snoop Dogg', song: 'Gin and Juice', image: 'https://footwearnews.com/wp-content/uploads/2022/08/snoopdogg.jpg', specialMsg: 'Suprise Song'},
    {artist: 'Kanye West', song: 'College Dropouts', image: 'https://footwearnews.com/wp-content/uploads/2023/05/GettyImages-1254881113.jpg', specialMsg: 'New Album'},
    {artist: 'Eminem', song: 'Lose Yourself', image: 'https://static.stereogum.com/uploads/2022/10/Eminem-Lose-Yourself-1666109360-520x5201-1666540295.jpeg', specialMsg: 'Best Seller'},
];

const listOfSongs: SongList = [
    {artist: 'Eminem', song: 'Lose Yourself', profilePic: 'https://static.stereogum.com/uploads/2022/10/Eminem-Lose-Yourself-1666109360-520x5201-1666540295.jpeg'},
    {artist: 'Cardi B', song: 'I Like It', profilePic: 'https://footwearnews.com/wp-content/uploads/2020/11/cardi-b-reebok-08-1.jpg'},
    {artist: 'Jay-Z', song: 'Dirt off your Shoulders', profilePic: 'https://footwearnews.com/wp-content/uploads/2023/02/blueivycarter.jpg'},
    {artist: 'Beyonce', song: 'B Loves React and NextJS', profilePic: 'https://footwearnews.com/wp-content/uploads/2023/05/beyonce-renaissance-world-tour.jpg'},
    {artist: 'Weeknd', song: 'Super Sad Song but Cool', profilePic: 'https://footwearnews.com/wp-content/uploads/2016/09/the-weeknd-starboy.jpg'},
    {artist: 'Shania Twain', song: 'Go Girl', profilePic: 'https://footwearnews.com/wp-content/uploads/2023/02/shania-twain-brits-red-carpet-2.jpg'},
    {artist: 'Kid Cudi', song: 'Galaxy Song', profilePic: 'https://footwearnews.com/wp-content/uploads/2021/04/kid-cudi-westworld-1.jpg'},
]

function SongCard({artist, song, profilePic}: SongList[number]) {

    return (
        <div className='w-full h-16 flex border-b border-slate-900'>
            <div className="w-[30%] h-full flex justify-center items-center">
                <img src={profilePic} alt={artist} className='rounded-full w-12 h-12 object-cover hover:scale-125 transition'/>
            </div>
            <div className="w-[60%] h-full flex flex-col justify-center text-stone-300">
                <h1 className='text-sm font-semibold '>{song}</h1>
                <small>{artist}</small>
            </div>
            <div className="w-[10%] h-full">
                <button className='w-full h-full font-bold text-3xl text-red-500'>
                    +
                </button>
            </div>
        </div>
    )
}

function PromotedMusicCards({artist, song, image, specialMsg, indexNum}: PromotedMusic[number]) {
    // const incIndex = indexNum === 0 || indexNum ? indexNum + 1 : undefined;
    // const leftPosition: number | undefined = incIndex ? incIndex * 260 : undefined;
    // <div className={`absolute top-0 ${leftPosition !== undefined ? `left-[${leftPosition}px]` : ''`}

    return (
        <div className='w-[95%] flex flex-wrap h-full p-1 pl-2'>
            <div className="w-[60%] h-[20%] min-[320px]:h-[10%] mb-2" id="song">
                <small className='font-semibold'>{song}</small>
            </div>
            <div className="w-[40%] h-[20%] min-[320px]:h-[10%] flex flex-col items-center" id="specialMsg">
                <button className='border border-red-600 drop-shadow-lg rounded-2xl text-xs px-1 py-0 mt-1 text-gray-400 hover:text-gray-300 hover:border-2'>{specialMsg}</button>
            </div>
            <div className="w-full h-[20%] min-[320px]:h-[10%]  min-[320px]:mb-2" id="artist">
                {artist}
            </div>
            <div className="w-full h-[50%] min-[320px]:h-[70%]" id="image">
                <img src={image} alt="image" className='w-full h-full object-cover object-top rounded-xl' />
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
        }
    }
    
    function handleNav(props: ActiveMenu): MouseEventHandler<HTMLButtonElement> {
        
        return useCallback(() => {
            setActiveMenu(props);
        }, [props])
    }

    // ================ LIFECYCLE ================
    useEffect(() => {
        const scrollContainerActiveMenu = scrollContainerActiveMenuRef.current;
        const scrollContainerPlaylist = scrollContainerPromotedRef.current;
        
        const handleActiveMenuWheel = (e: WheelEvent) => {
            e.preventDefault();
            if (scrollContainerActiveMenu) {
                scrollContainerActiveMenu.scrollLeft += e.deltaY/2;
            }
        }
        const handlePromotedMusicWheel = (e: WheelEvent) => {
            if (scrollContainerPlaylist) {
                scrollContainerPlaylist.scrollLeft += e.deltaY;
            }
        }   
            
        if (scrollContainerActiveMenu) {
            scrollContainerActiveMenu.addEventListener('wheel', handleActiveMenuWheel);
        }
        if (scrollContainerPlaylist) {
            scrollContainerPlaylist.addEventListener('wheel', handlePromotedMusicWheel);
        }

        return () => {
            if (scrollContainerActiveMenu) {
                scrollContainerActiveMenu.removeEventListener('wheel', handleActiveMenuWheel);
            }
            if (scrollContainerPlaylist) {
                scrollContainerPlaylist.removeEventListener('wheel', handleActiveMenuWheel);
            }
        }


    }, [])

    // ================ RETURN ================
    return (
      <div id="toggleDarkDiv" className="dark">
        <div id="bodyDiv" className="bg-black min-h-screen flex justify-center items-center flex-col">
  
            <div className="flex flex-col w-72 h-[85vh] bg-slate-950 shadow-zinc-900 shadow-lg text-stone-300" id="container">
                <div className='w-full h-[12%] font-bold text-2xl flex items-center pl-4 text-stone-200' id="pageTitle">
                    {activeMenu === 'Home' && ( activeMenu ) }
                    {activeMenu === 'Trending' && ( activeMenu ) }
                    {activeMenu === 'Browse' && ( activeMenu ) }
                    {activeMenu === 'Library' && ( activeMenu ) }
                </div>
                <div className='w-full h-[8%] border-b border-gray-900 whitespace-nowrap overflow-hidden hover:overflow-scroll flex items-center ' style={{ scrollBehavior: 'smooth'}} id="playlists" ref={scrollContainerActiveMenuRef}>
                    {playlistsMenu.map((playList, index: number) => (
                        <Link href="#" key={playList}  className={`${activePlaylist === index ? 'font-bold mx-3 text-rose-600 font-mono underline underline-offset-[7px]' : 'mx-3 hover:text-stone-100 font-mono  hover:underline hover:underline-offset-[7px]'}`} onClick={() => handlePlayList(index)}>
                            {playList}
                        </Link>
                    ))}
                </div>
                <div className='w-full h-[35%] lg:h-[25%] flex flex-nowrap overflow-hidden' id="promotedMusic" style={{ scrollBehavior: 'smooth'}} ref={scrollContainerPromotedRef} >
                        {listOfPromoted.map((promotedSong, index: number) => (
                            <div className='w-[90%] flex-shrink-0' key={index}>
                                <PromotedMusicCards artist={promotedSong.artist} song={promotedSong.song} image={promotedSong.image} specialMsg={promotedSong.specialMsg} indexNum={index} key={index} />
                            </div>
                        ))}
                </div>
                <div className='w-full h-[45%] overflow-y-auto' id="songList">
                    {listOfSongs.map((songFromlist, index: number) => (
                        <SongCard artist={songFromlist.artist} song={songFromlist.song} profilePic={songFromlist.profilePic} key={index} />
                    ))}

                </div>
                <div className='w-full h-[10%] bg-slate-900 leading-tight' id="bottomMenu">
                        <button className={`w-[25%] h-full hover:bg-slate-800 ${activeMenu === "Home" ? 'text-red-600 font-semibold bg-slate-800' : ''}`} onClick={handleNav('Home')}>
                            <IcT icons="home" classNameCustom='mx-auto'/>
                            <small className=''>Home</small>
                        </button>
                        <button className={`w-[25%] h-full hover:bg-slate-800 ${activeMenu === "Trending" ? 'text-red-600 font-semibold bg-slate-800' : ''}`} onClick={handleNav('Trending')}>
                            <IcT icons="flame" classNameCustom='mx-auto'/>
                            <small>Trending</small>
                        </button>
                        <button className={`w-[25%] h-full hover:bg-slate-800 ${activeMenu === "Browse" ? 'text-red-600 font-semibold bg-slate-800' : ''}`} onClick={handleNav('Browse')}>
                            <IcT icons="search" classNameCustom='mx-auto'/>
                            <small>Browse</small>
                        </button>
                        <button className={`w-[25%] h-full hover:bg-slate-800 ${activeMenu === "Library" ? 'text-red-600 font-semibold bg-slate-800' : ''}`} onClick={handleNav('Library')}>
                            <IcT icons="library"classNameCustom='mx-auto'/>
                            <small>Library</small>
                        </button> 
                </div>

            </div>
        </div>
      </div>

    )
}

export default ICodeThis;

 