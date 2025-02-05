import Kawaed_Osol_Mansour from './Kawaed_Osol_Feqh_MAnsour.json';
import Al_Tazkera from './Al_Tazkera_Mansour.json';
import Al_Warkat_Mansour from './Al_Warkat_Mansour.json';
import Kawaed_Osol_Wa_Maked_Fosol from './Kawaed_Osol_Mansour.json'

export default function Osol_Books(){
    return {
        id:3,
        title:"أصول فقه",
        description:"أصول فقه",
        books:[
            Kawaed_Osol_Mansour,
            Al_Tazkera,
            Al_Warkat_Mansour,
            Kawaed_Osol_Wa_Maked_Fosol,
        ]
    }
}