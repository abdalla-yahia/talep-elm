import Al_Resala from "./AL_Resala.json";
import Al_Tazkera from './Al_Tazkera_Mansour.json';
import Al_Warkat_Mansour from './Al_Warkat_Mansour.json';
import Al_Osol_Mn_Alosol from './AlOsol_Mn_Alosol.json';
import ElWadeh_Nabile from './Elwadeh_Nabile.json';
import Elwadeh from './Elwadeh.json';
import Ghayat_Elsawl from './Gkayat_Elsawl.json';
import Kawaed_Osol_Mansour from './Kawaed_Osol_Feqh_MAnsour.json';
import Kawaed_Osol_Wa_Maked_Fosol from './Kawaed_Osol_Mansour.json'
import Rawdat_Elnazar from './Rawdat_Elnazar.json';

export default function Osol_Books(){
    return {
        id:3,
        title:"أصول فقه",
        description:"أصول فقه",
        books:[
            Kawaed_Osol_Mansour,
            Al_Tazkera,
            Al_Osol_Mn_Alosol,
            Al_Warkat_Mansour,
            ElWadeh_Nabile,
            Elwadeh,
            Ghayat_Elsawl,
            Rawdat_Elnazar,
            Kawaed_Osol_Wa_Maked_Fosol,
            Al_Resala
        ]
    }
}