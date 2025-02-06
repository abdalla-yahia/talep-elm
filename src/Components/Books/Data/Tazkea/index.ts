import Al_Daa_We_Al_Dawaa from './Al_Daa_We_Al_Dawaa.json';
import Rafe_Al_Malam from './Rafe_Al_Malam.json';
import Moshkelat_1 from './Moshkelat_1.json';
import Moshkelat_2 from './Moshkelat_2.json';
import Moshkelat_3 from './Moshkelat_3.json';
import Kon_Shaby_Serjany from './Kon_Shaby_Serjany.json';
import Madarej_Salkeen from './Madarej_Salkeen.json';
export default function Tarbea_Books(){
    return {
        id:12,
        title:"تربية و تزكية",
        describetion:'تربية و تزكية',
        books:[
            Al_Daa_We_Al_Dawaa,
            Rafe_Al_Malam,
            Moshkelat_1,
            Moshkelat_2,
            Moshkelat_3,
            Kon_Shaby_Serjany,
            Madarej_Salkeen
        ]
    }
}