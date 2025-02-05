import salasat_Osol from './Salasat_Osol.json';
import KaashF_Al_Shobhat from './Kashf_AL_Shobhat.json';
import Lomat_Eatekad from './Lomat_Al_Eatekad.json'
import Kawaed_Mothla from './Kaqwaed_Mothla.json';
import Kawaed_Mothla_Mansour from './Kaqwaed_Mothla_Mansour.json';
import Tahawya from './Tahawea.json';
import Wastya from './Wastya.json';
import Wastya_Borhamy from './Wastya_Borhamy.json';
import ELMena_Basem from './ElMena_Basem.json';
import MenaOne from './Almena1.json';
import MenaTwo from './AlMena2.json';
import Fath_ElMajeed from './Fath_ElMajeed.json';
import Fath_ElMajeed_Mansour from './Fath_ElMajeed_Mansour.json';
import ElKawaed_ElKolya_Mansour from './ElKaqwaed_Alkolya_Mansour.json'
import Masalet_Eman_Mansour from './Masalet_Aleman_Mansour.json';
import Mareej_Al_Kabool from './Marej_Al_Kabool.json';
import MarejOne from './Marej_Part_One.json';
import MarejTwo from './Marej_Part_Two.json';
import MarejThree from './Marej_Part_Three.json';
import MarejFour from './Marej_Part_Four.json';

export default function Aqeda_Books(){
    return {
        id:4,
        title:"عقيدة",
        description:"عقيدة",
        books:[
            salasat_Osol,
            KaashF_Al_Shobhat,
            Lomat_Eatekad,
            Kawaed_Mothla,
            Kawaed_Mothla_Mansour,
            Tahawya,
            Wastya,
            Wastya_Borhamy,
            ELMena_Basem,
            MenaOne,
            MenaTwo,
            Fath_ElMajeed,
            Fath_ElMajeed_Mansour,
            ElKawaed_ElKolya_Mansour,
            Masalet_Eman_Mansour,
            Mareej_Al_Kabool,
            MarejOne,
            MarejTwo,
            MarejThree,
            MarejFour
        ]
    }
}