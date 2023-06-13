
function IcT({icons, classNameCustom}: {icons: string, classNameCustom?: string | undefined } ): JSX.Element | null {
    console.log(classNameCustom)
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
    }


    return(null);
}

export default IcT;