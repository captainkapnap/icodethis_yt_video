import React from 'react';
type IcTProps = {
    icons: "checks" | "x" | "chevronUp" | "chevronDown" | "search";
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
    }


    return(null);
}

export default IcT;