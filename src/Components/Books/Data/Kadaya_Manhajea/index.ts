import Eman_We_Kofr_Mansour from './Eman_Kofr_Mansour.json';
import Walaa_We_Baeaa_Mansour from './Walaa_Baraa_Mansour.json';
import Kada_Kadar_Mansour from './Kadaa_Kadar_Mansour.json';
import ElHakmya_Mansour from './Elhakmea_Mansour.json';
import ElAmal_AlGamaee_Mansour from './Elamal_ElGamaee_Mansour.json';
import Malameh_Salaf from './Malameh_Rayesea.json';
import Derasat_Fe_Elnasranya from './Derasat_Nasranya.json';
import Manahej_Istdla_Sona from './Manahej_Istdlal_Sona_Mansour.json'
export default function Kadaya_Books(){
    return {
        id:5,
        title:"قضايا فكرية ",
        description:"قضايا فكرية ",
        books:[
            Eman_We_Kofr_Mansour,
            Walaa_We_Baeaa_Mansour,
            Kada_Kadar_Mansour,
            ElHakmya_Mansour,
            ElAmal_AlGamaee_Mansour,
            Malameh_Salaf,
            Derasat_Fe_Elnasranya,
            Manahej_Istdla_Sona
        ]
    }
}