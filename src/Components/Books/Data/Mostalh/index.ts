import Bayqonya from './Bayqonya.json';
import Elbaeas_Elkhathis_ElHoainy from './Elbaeas_Elhathis_ElHoainy.json'
import Elbaeas_Elhathis from './Elbaeas_Elhathis.json';
import Nozhat_Elnazar from './Nozhat_Elnazar.json';
import Taeseer_Mostalah from './Taeseer_Mostalah.json';

export default function Mostalh_Books(){
    return {
        id:7,
        title:"مصطلح حديث",
        description:"مصطلح حديث",
        books:[
            Bayqonya,
            Taeseer_Mostalah,
            Elbaeas_Elkhathis_ElHoainy,
            Elbaeas_Elhathis,
            Nozhat_Elnazar
        ]
    }
}