import Kawaed_Mothla_Mansour from './Kaqwaed_Mothla_Mansour.json';
import Al_Manzoma_Al_Haeya from './Al_Manzoma_AL_Haea.json'
import Fath_ElMajeed_Mansour from './Fath_ElMajeed_Mansour.json';
import ElKawaed_ElKolya_Mansour from './ElKaqwaed_Alkolya_Mansour.json'
import Al_Ebana_Al_Soghra from './Al_Ebana_Al_Soghra_Mansour.json';
import Solam_Al_Wesol from './AlOsol_Mn_Alosol_Mansour.json';
import Mkadema_Bn_Aby_Zayed from './Mokadema_Bn_Zayed.json';
import Masalet_Eman_Mansour from './Masalet_Aleman_Mansour.json';
import Marej_Al_Jana from './Marej_Al_Jana_Matn_El_Mena.json';

export default function Aqeda_Books(){
    return {
        id:4,
        title:"عقيدة",
        description:"عقيدة",
        books:[
            Al_Manzoma_Al_Haeya,
            Kawaed_Mothla_Mansour,
            Fath_ElMajeed_Mansour,
            ElKawaed_ElKolya_Mansour,
            Al_Ebana_Al_Soghra,
            Marej_Al_Jana,
            Solam_Al_Wesol,
            Mkadema_Bn_Aby_Zayed,
            Masalet_Eman_Mansour,
        ]
    }
}