import Sor_Mn_Hayat_ElSahaba from './Sor_Sahaba.json';
import Sor_Mn_Hayat_Tabeean from './Sor_Tabeean.json';
import Mokhtasar_Sera from './Mokhtasr_Sera.json';
import Ashra_Mobashroon from './Ashra_Mobashroon.json';
import Al_Raheek_Al_Makhtoom from './Rahek_Makhtoom.json';
export default function Sera_Books(){
    return {
        id:1,
        title:"سيرة",
        description:"سيرة",
        books:[
            Sor_Mn_Hayat_ElSahaba,
            Sor_Mn_Hayat_Tabeean,
            Mokhtasar_Sera,
            Ashra_Mobashroon,
            Al_Raheek_Al_Makhtoom
        ]
    }
}