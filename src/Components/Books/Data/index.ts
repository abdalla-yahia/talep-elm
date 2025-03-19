import Sera from './Sera';
import Tarekh from './Tarekh';
import Feqh_Hanbaly from './FeqhHanbaly';
import Fatawe from './Fatawy';
import Osol_Feqh from './Osol_Feqh';
import Osol_Tafseer from './Osol_Tafseer';
import Osol_Bedaa from './Osol_Bedaa';
import Logha from './Logha';
import Aqeda from './Aqeda'
import Kadaya_Manhagea from './Kadaya_Manhajea';
import Keywaed_feqh from './Kawaeed_Feqhya';
import Mostalh_Hadith from './Mostalh';
import Hadith from './Hadith';
import Tafseer from './Tafseer';
import Tazkea from './Tazkea';
import Ferak_Mazahb from './Ferak_Mazaheb';
import Khotab from './Khotab';
import Alhweny from './Alhweny';
export default function BooksData(){
    return [
        Alhweny(),
        Sera(),
        Tarekh(),
        Osol_Feqh(),
        Osol_Tafseer(),
        Osol_Bedaa(),
        Ferak_Mazahb(),
        Keywaed_feqh(),
        Logha(),
        Mostalh_Hadith(),
        Feqh_Hanbaly(),
        Fatawe(),
        Kadaya_Manhagea(),
        Aqeda(),
        Hadith(),
        Tafseer(),
        Tazkea(),
        Khotab(),
    ]
}