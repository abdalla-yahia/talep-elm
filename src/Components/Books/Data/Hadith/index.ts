import AlAdab_Bokhary from './Aladab_Bokhary.json';
import Arbaeen_Nawawya from './Arbaeen_Nawawya.json';
import Motaa_Malek from './Motaa_Malek.json';
import Ryad_Al_Salheen from './Ryad_Al_Salheen.json';
import Sahih_El_Bokhary from './Sahih_El_Bokhary.json';
import Sahih_Muslem from './Sahih_Muslem.json';
import Sonn_Abe_Daood from './Sonn_Abe_Daood.json';
import Sonn_Al_Nasaee from './Sonn_Al_Nasaee.json';
import Sonn_Al_Termezy from './Sonn_Al_Termezy.json';
export default function Hadith_Books(){
    return {
        id:8,
        title:"شروح الحديث ",
        description:"شروح الحديث ",
        books:[
            AlAdab_Bokhary,
            Arbaeen_Nawawya,
            Motaa_Malek,
            Ryad_Al_Salheen,
            Sahih_El_Bokhary,
            Sahih_Muslem,
            Sonn_Abe_Daood,
            Sonn_Al_Nasaee,
            Sonn_Al_Termezy
        ]
    }
}


