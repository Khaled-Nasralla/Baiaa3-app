import { Pages } from "@/enums/product-modals-options-enum";


export interface PagesContextType {
    page:Pages | undefined ;
    setPage:(page : Pages)=>void;
}