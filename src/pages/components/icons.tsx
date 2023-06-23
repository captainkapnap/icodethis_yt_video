import React from 'react';
type IcTProps = {
    icons: "checks" | "x" | "chevronUp" | "chevronDown" | "search" | "dots" | "home" | "flame" | "library";
    classNameCustom?: string;
  };
  


function IcT({icons, classNameCustom}: IcTProps): JSX.Element | null {
    if (icons === "checks") {
        return(
            <svg xmlns="http://www.w3.org/2000/svg" className={classNameCustom ?? undefined} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M7 12l5 5l10 -10"></path>
               <path d="M2 12l5 5m5 -5l5 -5"></path>
            </svg>
        )
    } else if (icons === "x") {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={classNameCustom ?? undefined} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 6l-12 12"></path>
                <path d="M6 6l12 12"></path>
            </svg >
        )
    } else if (icons === "chevronUp") {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={classNameCustom ?? undefined} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M6 15l6 -6l6 6"></path>
            </svg>
        )
    } else if (icons === "chevronDown") {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={classNameCustom ?? undefined} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M6 9l6 6l6 -6"></path>
            </svg>
        )
    } else if (icons === "search") {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={classNameCustom ?? undefined} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                <path d="M21 21l-6 -6"></path>
            </svg>
        )
    } else if (icons === "dots") {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={classNameCustom ?? undefined} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
            </svg>
        )
    } else if (icons === "home") {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={classNameCustom ?? undefined} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                <path d="M10 12h4v4h-4z"></path>
            </svg>
        )
    } else if (icons === "flame") {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={classNameCustom ?? undefined} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 12c2 -2.96 0 -7 -1 -8c0 3.038 -1.773 4.741 -3 6c-1.226 1.26 -2 3.24 -2 5a6 6 0 1 0 12 0c0 -1.532 -1.056 -3.94 -2 -5c-1.786 3 -2.791 3 -4 2z"></path>
            </svg>
        )
    } else if (icons === "library") {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={classNameCustom ?? undefined} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2"></path>
                <path d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2"></path>
            </svg>
        )
    }


    return(null);
}

export default IcT;


// } else if (icons === "") {
//     return (

//     )
// }