import Frooa_Feqh_Mansour from './Frooa_Feqh_Mansour.json'
import Manhaj_Elsalken_Audio from './Manhaj_salkeen_Audio.json'
import Manhaj_Elsalken_Mansour from './Manhaj_salkeen_Mansour.json'
import Al_Rawda_AL_Nadya from './Al_Rawda_Alnadya.json';
import Elrawd_ElMorbeaa_Mansour from './Elrawd_Elmorbea_Mansour.json';
import Elrahabia_Mansour from './AlRahbia_Mansour.json';
import Akhsar_AL_Mokhtasarat from './Akhsar_Mokhtasarat.json';
export default function Feqh_Hanbalyan(){
    return {
        id:2,
        title:"فقه ",
        description:"فقه حنبلي",
        books:[
            Frooa_Feqh_Mansour,
            Manhaj_Elsalken_Audio,
            Manhaj_Elsalken_Mansour,
            Elrahabia_Mansour,
            Akhsar_AL_Mokhtasarat,
            Al_Rawda_AL_Nadya,
            Elrawd_ElMorbeaa_Mansour,
        ]
    }
}