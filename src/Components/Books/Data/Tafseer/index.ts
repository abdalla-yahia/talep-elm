
import Tafseer_Amaa from './Tafseer_Ama.json';
import Tafseer_Al_Sady from './Tafseer_Al_Saday.json';
export default function Tafseer_Books(){
    return {
        id: 9,
        title: 'تفسير',
        description: 'تفسير',
        books:[
            Tafseer_Amaa,
            Tafseer_Al_Sady,
        ]
    }
}