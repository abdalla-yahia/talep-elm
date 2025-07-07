import Tafseeer_Al_Kortopy from './Tafseer_Al_Kortopy.json';
import Tafseer_Amaa from './Tafseer_Ama.json';
import Tafseer_Al_Sady from './Tafseer_Al_Saday.json';
import Tafseer_Bn_Katheer from './Tafseer_Bn_Katheer.json';
export default function Tafseer_Books(){
    return {
        id: 9,
        title: "تفسير",
        description: 'تفسير',
        books:[
            Tafseer_Amaa,
            Tafseer_Al_Sady,
            Tafseeer_Al_Kortopy,
            Tafseer_Bn_Katheer
        ]
    }
}