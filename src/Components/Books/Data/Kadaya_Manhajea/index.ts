import Amr_Maroof from './Amr_Maroof.json';
import Derasat_Fe_Elnasranya from './Derasat_Nasranya.json';
import ElAmal_AlGamaee_Mansour from './Elamal_ElGamaee_Mansour.json';
import Elamal_AlGamaee from './Elamal_ElGamaee.json';
import ElHakmya_Mansour from './Elhakmea_Mansour.json';
import Elhakmia from './Elhakmea.json';
import ElJejad from './ElJehad.json';
import ElKhelaf from './Elkhelaf.json';
import Eman_We_Kofr_Mansour from './Eman_Kofr_Mansour.json';
import Eman_Kofr from './Eman_Kofr.json';
import Kada_Kadar_Mansour from './Kadaa_Kadar_Mansour.json';
import Kadaa_Kadar from './Kadaa_Kadar.json';
import Malameh_Salaf from './Malameh_Rayesea.json';
import Manahej_Istdla_Sona from './Manahej_Istdlal_Sona_Mansour.json'
import Masaleh_Mafased from './Masaleh_Mafased.json';
import Walaa_We_Baeaa_Mansour from './Walaa_Baraa_Mansour.json';
import Walaa_Baraa from './Walaa_Baraa.json';
export default function Kadaya_Books(){
    return {
        id:5,
        title:"قضايا فكرية ",
        description:"قضايا فكرية ",
        books:[
            Amr_Maroof,
            Eman_We_Kofr_Mansour,
            Eman_Kofr,
            Walaa_We_Baeaa_Mansour,
            Walaa_Baraa,
            Kada_Kadar_Mansour,
            Kadaa_Kadar,
            ElHakmya_Mansour,
            Elhakmia,
            ElAmal_AlGamaee_Mansour,
            Elamal_AlGamaee,
            ElKhelaf,
            Masaleh_Mafased,
            Malameh_Salaf,
            ElJejad,
            Derasat_Fe_Elnasranya,
            Manahej_Istdla_Sona
        ]
    }
}