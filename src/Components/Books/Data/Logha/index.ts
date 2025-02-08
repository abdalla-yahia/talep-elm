import Ajromya from './Al_Ajromya.json';
import AL_Jawhar_Al_Maknon from './Al_Jawhar_Al_Maknoon.json';
import Al_Naho_Al_Sagheer from './Al_Naho_Al_Sakheer.json';
import Alfeat_Bn_Malek from './Alfeat_Bn_Malek.json';
import Maat_Al_Many from './Maat_AL_Maany.json';
import Droos_Al_Balagha from './Droos_Al_Balagha.json';
import Katr_AL_Nada from './Katr_Al_Nada.json';
import Bakorat_Al_Tareaf from './Bakorat_Al_Taref.json';
import Moghny_Al_Labeb from './Moghny_Al_Labeb.json';
import Nazm_Kawaed_Al_Erab from './Nazm_Kawaed_Al_Erab.json';
import Shozor_Al_Zahab from './Shozor_AL_Zahab.json';
export default function Logha_Books(){
    return {
        id:14,
        title: "اللغة العربية",
        description: "",
        books:[
            Ajromya,
            Al_Naho_Al_Sagheer,
            Nazm_Kawaed_Al_Erab,
            Katr_AL_Nada,
            Shozor_Al_Zahab,
            Moghny_Al_Labeb,
            Alfeat_Bn_Malek,
            Bakorat_Al_Tareaf,
            Droos_Al_Balagha,
            Maat_Al_Many,
            AL_Jawhar_Al_Maknon,
        ]
    }
}