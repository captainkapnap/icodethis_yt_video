import React, { useState } from 'react';
import IcT from '../components/icons';
import { set } from 'zod';

export function RandomShapeBackground() {
    return (
      <div className="relative">
            <div className="custom-shape-divider-bottom-1687252303">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
      </div>
    );
}
type announcementsType = {
    message: string;
    profile: string;
    username: string;
    ageOfMessage: number | undefined;
}

export function CardAnnouncement({message, profile, username, ageOfMessage}: announcementsType) {
    
    return (
        <div className="bg-slate-900 h-24 rounded-md mb-2 drop-shadow flex flex-wrap">
            <div className="w-4/5 h-[55%] text-zinc-400 text-md py-1 px-3" id="message">
                {message}
            </div>
            <div className="w-1/5 h-[55%] text-indigo-900 flex justify-center items-center" id="dots">
                <button>
                    <IcT icons="dots" />
                </button>
            </div>
            <div className="w-1/6 h-[45%]" id="profilePic">
                <img src={profile} alt="" id="imgProfilePic" className="w-8 h-8 hover:scale-150 transition object-cover ml-4 mt-1 rounded-full border-indigo-600 border-[3px]" />
            </div>
            <div className="w-2/4 h-[45%] font-semibold text-indigo-700 items-center flex" id="username">
                {username}
            </div>
            <div className="w-[32%] h-[45%] items-center flex text-zinc-700 text-md justify-center" id="ageOfMessage">
                {ageOfMessage} hours ago
            </div>
        </div>
    )
}




function ICodeThis() {
    const [announcements, setAnnouncements] = useState<announcementsType[]>([
        { message: "Configurable holistic definition", profile: "https://randomuser.me/api/portraits/women/28.jpg", username: "Davita Sumshon", ageOfMessage: 4 },
        { message: "Object-based content-based knowledge base", profile: "https://randomuser.me/api/portraits/women/40.jpg", username: "Tedra McVittie", ageOfMessage: 7 },
        { message: "Devolved mission-critical hierarchy", profile: "https://randomuser.me/api/portraits/men/85.jpg", username: "Henka Petyankin", ageOfMessage: 8 },
        { message: "Mandatory empowering moderator", profile: "https://randomuser.me/api/portraits/men/83.jpg", username: "Stephine Abelwhite", ageOfMessage: 1 },
        { message: "Object-based bi-directional orchestration",profile:"https://randomuser.me/api/portraits/men/80.jpg",username:"Paola MacTague",ageOfMessage:5}
    ])

    function handleDismiss() {
        setAnnouncements([]);
    }

    return (

        <div id="toggleDarkDiv" className="dark">
            <div id="bodyDiv" className="bg-slate-900 min-h-screen flex justify-center items-center">
            <RandomShapeBackground />
            {/* <Image src="/waves.svg" alt="" width="100" height="100" className="bg-time"/> */}
                    {/* <div className="bg-yellow-600 aspect-square h-3/5 lg:w-3/5 rounded-tr-[7rem] rounded-tl-[10rem] -rotate-45 absolute bottom-0 -right-2">
                    </div> */}
                    <div className="bg-slate-800 w-[24rem] h-[36rem] rounded-2xl drop-shadow-xl" id="container">
                        <section className="h-[10%] w-full p-4 text-zinc-400 text-xl flex items-center">
                            2 Accouncements
                        </section>
                        <section className="h-[70%] w-full p-4 overflow-y-hidden drop-shadow-xl">
                            <div className="h-full overflow-y-auto scrollbar-hide">
                                {announcements && (
                                announcements.map((value, index) => ( 
                                    <CardAnnouncement key={index} message={value.message} profile={value.profile} username={value.username} ageOfMessage={value.ageOfMessage} />
                                ))
                                )}
                            </div>
                        </section>
                        <section className="h-[20%] w-full flex justify-center items-center">
                            <button onClick={handleDismiss} className="bg-sky-600 text-white px-6 py-2 rounded-md hover:bg-sky-600 hover:ring-4 hover:ring-indigo-600 hover:ring-offset-transparent">
                                Dismiss All
                            </button>
                        </section>
                    </div>
            </div>
        </div>

    )
}

export default ICodeThis;