import Tafseer_Bn_Katheer from './Tafseer_Bn_Katheer.json';
import Tafseer_Al_Kortopy from './Tafseer_Al_Kortopy.json';
export default function Tafseer_Books(){
    return {
        id: 9,
        title: 'تفسير',
        description: 'تفسير',
        books:[
            Tafseer_Bn_Katheer,
            Tafseer_Al_Kortopy
        ]
    }
}