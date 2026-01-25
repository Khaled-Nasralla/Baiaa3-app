import { Pages } from "@/enums/product-modals-options-enum";
import { createContext, ReactNode, useContext, useState } from "react";
import { PagesContextType } from "./pages-context-type";

const PagesContext = createContext<PagesContextType | undefined>(undefined);

export function PagesContextProvider({children} :{children : ReactNode}){
    const [page, setCurrentPages] = useState<Pages>();
    const [menuOpen,setMenuOpen] = useState<boolean>(false);

    const setPage = (pages : Pages)=>{
     setCurrentPages(pages);
    }

    const setMenuOpenState = (isOpen:boolean)=>{
        setMenuOpen(isOpen);
    }

    return <PagesContext.Provider value={{page,setPage ,menuOpen,setMenuOpen}}>
        {children}
    </PagesContext.Provider>

}

export function usePagesContext() {
    const context = useContext(PagesContext);
    if (!context) {
        throw new Error('useConnectionContext must be used within a connection context.');
    }
    return context;
}