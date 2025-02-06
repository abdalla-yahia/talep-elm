import Al_Khelafa_Serjany from './Al_Khelafa_Serjany.json';
import Al_Sera_Serjany from './Al_Sera_Serjany.json';
import Ashra_Mobashroon from './Ashra_Mobashroon.json';
import Mokhtasar_Sera from './Mokhtasr_Sera.json';
import Orjoza_Meaea from './Orjoza_Memea.json';
import Rahek_Makhtoom from './Rahek_Makhtoom.json';
import Al_Shamaeel from './Shamael_Mohamdya.json';
import Sor_Sahaba from './Sor_Sahaba.json';
import Sor_Rabeean from './Sor_Tabeean.json';
export default function Sera_Books(){
    return {
        id:1,
        title:"سيرة",
        description:"سيرة",
        books:[
            Al_Shamaeel,
            Orjoza_Meaea,
            Sor_Sahaba,
            Sor_Rabeean,
            Ashra_Mobashroon,
            Mokhtasar_Sera,
            Rahek_Makhtoom,
            Al_Khelafa_Serjany,
            Al_Sera_Serjany
        ]
    }
}