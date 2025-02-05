
//Get Audio If Its Ajzaa
function getAudioFromAjzaa(one:string,two:string){
    let elhosary='';
    if((one+two) <= '002141'){
      elhosary = '01.zip'
    }
    else if((one+two) <= '002252'){
      elhosary = '02.zip'
    }
    else if((one+two) <= '003092'){
      elhosary = '03.zip'
    }
    else if((one+two) <= '004023'){
      elhosary = '04.zip'
    }
    else if((one+two) <= '004147'){
      elhosary = '05.zip'
    }
    else if((one+two) <= '005081'){
      elhosary = '06.zip'
    }
    else if((one+two) <= '006110'){
      elhosary = '07.zip'
    }
    else if((one+two) <= '007087'){
      elhosary = '08.zip'
    }
    else if((one+two) <= '008040'){
      elhosary = '09.zip'
    }
    else if((one+two) <= '009092'){
      elhosary = '10.zip'
    }
    else if((one+two) <= '011005'){
      elhosary = '11.zip'
    }
    else if((one+two) <= '012052'){
      elhosary = '12.zip'
    }
    else if((one+two) <= '014052'){
      elhosary = '13.zip'
    }
    else if((one+two) <= '016128'){
      elhosary = '14.zip'
    }
    else if((one+two) <= '018074'){
      elhosary = '15.zip'
    }
    else if((one+two) <= '020135'){
      elhosary = '16.zip'
    }
    else if((one+two) <= '022078'){
      elhosary = '17.zip'
    }
    else if((one+two) <= '025020'){
      elhosary = '18.zip'
    }
    else if((one+two) <= '027055'){
      elhosary = '19.zip'
    }
    else if((one+two) <= '029045'){
      elhosary = '20.zip'
    }
    else if((one+two) <= '033030'){
      elhosary = '21.zip'
    }
    else if((one+two) <= '036027'){
      elhosary = '22.zip'
    }
    else if((one+two) <= '039031'){
      elhosary = '23.zip'
    }
    else if((one+two) <= '041046'){
      elhosary = '24.zip'
    }
    else if((one+two) <= '045037'){
      elhosary = '25.zip'
    }
    else if((one+two) <= '051030'){
      elhosary = '26.zip'
    }
    else if((one+two) <= '057029'){
      elhosary = '27.zip'
    }
    else if((one+two) <= '066012'){
      elhosary = '28.zip'
    }
    else if((one+two) <= '077050'){
      elhosary = '29.zip'
    }
    else if((one+two) <= '114006'){
      elhosary = '30.zip'
    }
  
    return elhosary;
  } 

export default function SoursAudioQarea(s:number,num:number,Qaryea:string) {
    const partOne = (+num)>99?(+num):(+num)>9?'0'+(+num):'00'+(+num) as string
    let partTwo = (+s)>99?(+s):(+s)>9?'0'+(+s):'00'+(+s)as string;

    //Define Sorce Audio Of Qarea
    if(Qaryea === 'alhosary---warsh---64kb----full--ayat--6236--aya'){
      const elhosary = 'alhosary---warsh---64kb----full--ayat--6236--aya.zip'
      partTwo = (+s)>99?(+s):(+s)>9?'0'+(+s):'00'+(+s) as string
      
      return `https://archive.org/download/${Qaryea}/${elhosary}/${partOne}${partTwo}.mp3`;
    }else if(Qaryea === '128kb_202210'){
      const elhosary = '128kb--مصطفى اسماعيل مرتل.zip'
      partTwo = (+s)>99?(+s):(+s)>9?'0'+(+s):'00'+(+s)
      
      return `https://archive.org/download/${Qaryea}/${elhosary}/${partOne}${partTwo}.mp3`;
        
    }else if(Qaryea === '32kb-alhosary-qaloon-ayat-full-6236-aya'){
      partTwo = (+s)>99?(+s):(+s)>9?'0'+(+s):'00'+(+s)
      const elhosary  = '32kb--alhosary--qaloon___ayat__full__6236__aya.zip'
      
      return `https://archive.org/download/${Qaryea}/${elhosary}/${partOne}${partTwo}.mp3`;
      
    }
    else if(Qaryea === '64kb-alhosary-qasr-almonfasel-radio-6236-ayah'){
        const elhosary = '64kb - alhosary--qasr--almonfasel----radio  -6236--ayah.zip'
      partTwo = (+s)>99?(+s):(+s)>9?'0'+(+s):'00'+(+s)
      
      return `https://archive.org/download/${Qaryea}/${elhosary}/${partOne}${partTwo}.mp3`;
        
    }
    else if(Qaryea === 'alhozaifi__by__shoa3bah__56kb___ayat__6236_ayah__full'){
        const elhosary = 'alhozaifi__by__shoa3bah__56kb___ayat__6236_ayah__full.zip'
      partTwo = (+s)>99?(+s):(+s)>9?'0'+(+s):'00'+(+s)
      
      return `https://archive.org/download/${Qaryea}/${elhosary}/${partOne}${partTwo}.mp3`;
        
    }
    else if(Qaryea === '245745247247247247247247457y__96kb/full--quran--6236-aya--by--soofy_by__soosy__96kb.zip'){
        const elhosary = 'full--quran--6236-aya--by--soofy_by__soosy__96kb'
      partTwo = (+s)>99?(+s):(+s)>9?'0'+(+s):'00'+(+s)
      
      return `https://archive.org/download/${Qaryea}/${elhosary}/${partOne}${partTwo}.mp3`;
        
    }
    else if(Qaryea === 'alfirdwsiy1433_gmai555555555555555555555555555555hhhhhhhhhhhhhhh'){
        const elhosary = 'مصحف عبد الحكيم عبد اللطيف برواية شعبة مقسم ايات كامل 6236 اية.zip'
        const elhosary2 = '%D9%85%D8%B5%D8%AD%D9%81%20%D8%B9%D8%A8%D8%AF%20%D8%A7%D9%84%D8%AD%D9%83%D9%8A%D9%85%20%D8%B9%D8%A8%D8%AF%20%D8%A7%D9%84%D9%84%D8%B7%D9%8A%D9%81%20%D8%A8%D8%B1%D9%88%D8%A7%D9%8A%D8%A9%20%D8%B4%D8%B9%D8%A8%D8%A9%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A7%D9%8A%D8%A7%D8%AA%20%D9%83%D8%A7%D9%85%D9%84%206236%20%D8%A7%D9%8A%D8%A9%2F'
      partTwo = (+s)>99?(+s):(+s)>9?'0'+(+s):'00'+(+s)
      
      return `https://archive.org/download/${Qaryea}/${elhosary}/${elhosary2}${partOne}${partTwo}.mp3`;
        
    }
    else if(Qaryea === '96kb___--quran--by---mefta7--alsaltany--by--aldory--an---aby---amr-----6236---'){
      partTwo = (+s)>99?(+s):(+s)>9?'0'+(+s):'00'+(+s)
      let elhosary= getAudioFromAjzaa(partOne as string,partTwo as string)
      if(elhosary == '09.zip'){
        elhosary ='09.zip/09'
      }
      else if(elhosary == '11.zip'){
        elhosary ='11.zip/11'
      }
      else if(elhosary == '23.zip'){
        elhosary ='23.zip/23'
      }
      else if(elhosary == '24.zip'){
        elhosary ='24.zip/24'
      }
      
      return `https://archive.org/download/${Qaryea}/${elhosary}/${partOne}${partTwo}.mp3`;
    
    }
    else if(Qaryea === '96kb--quran--by--foad--alkhamry---by--sho3bah--6236---ayaat-----__verse--by---'){
      partTwo = (+s)>99?(+s):(+s)>9?'0'+(+s):'00'+(+s)
      let elhosary= getAudioFromAjzaa(partOne as string,partTwo as string)
      
      if(elhosary == '23.zip'){
        elhosary ='23.zip/23'
      }
      else if(elhosary == '24.zip'){
        elhosary ='24.zip/24'
      }
      
      return `https://archive.org/download/${Qaryea}/${elhosary}/${partOne}${partTwo}.mp3`;
    
    }
    else if(Qaryea === '96kb--quran--by--alhozifi--by--qaloon---6236---ayaat-----__verse--by---verse--'){
      partTwo = (+s)>99?(+s):(+s)>9?'0'+(+s):'00'+(+s)
      let elhosary= getAudioFromAjzaa(partOne as string,partTwo as string)
      if(elhosary == '23.zip'){
        elhosary ='23.zip/23'
      }
      else if(elhosary == '24.zip'){
        elhosary ='24.zip/24'
      }
      
      return `https://archive.org/download/${Qaryea}/${elhosary}/${partOne}${partTwo}.mp3`;
    
    }
    else if(Qaryea === '128kb--quran--ahmad--khedr--altrabolsy---by---qaloon-----6236---ayaat-----__ve'){
      partTwo = (+s)>99?(+s):(+s)>9?'0'+(+s):'00'+(+s)
      let elhosary= getAudioFromAjzaa(partOne as string,partTwo as string)
      if(elhosary == '23.zip'){
        elhosary ='23.zip/23'
      }
      else if(elhosary == '24.zip'){
        elhosary ='24.zip/24'
      }
      
      return `https://archive.org/download/${Qaryea}/${elhosary}/${partOne}${partTwo}.mp3`;
    
    }
    else if(Qaryea === '128kb----6236--ayah---quran-128'){
      partTwo = (+s)>99?(+s):(+s)>9?'0'+(+s):'00'+(+s)
      const elhosary= getAudioFromAjzaa(partOne as string,partTwo as string)
      
      return `https://archive.org/download/${Qaryea}/${elhosary}/${partOne}${partTwo}.mp3`;
    }
    else{
      partTwo = (+s)>99?(+s):(+s)>9?'0'+(+s):'00'+(+s)
      
      return `https://archive.org/download/${Qaryea}/${partOne}.zip/${partOne}${partTwo}.mp3`;
      
    };
  }

