

const DateConvert = (data: string | number | Date)=>{
        return new Date(data).toLocaleString("ar-eg", {
            year: "numeric",
            day :"2-digit",
            month: "long",
            hour:"2-digit",
            minute:"2-digit",
            second:"2-digit"
            
    })
}
  export default DateConvert;

 export const CountTime = (time : number) => {

  if(((Date.now() - (new Date(time).getTime())) / 1000 / 60 / 60 / 24 / 30 / 12) >=1 ){
    return Math.round(((Date.now() - (new Date(time).getTime())) / 1000 / 60 / 60 / 24 / 30 / 12)) + 'عام'
  }
  else if(((Date.now() - (new Date(time).getTime())) / 1000 / 60 / 60 / 24 / 30) >=1 ){
    return Math.round(((Date.now() - (new Date(time).getTime())) / 1000 / 60 / 60 / 24 / 30)) + 'شهر'
    }
    else if(((Date.now() - (new Date(time).getTime())) / 1000 / 60 / 60 / 24) >=1 ){
      return Math.round(((Date.now() - (new Date(time).getTime())) / 1000 / 60 / 60 / 24)) + 'يوم'
      }
      else if(((Date.now() - (new Date(time).getTime())) / 1000 / 60 / 60) >=1 ){
        return Math.round(((Date.now() - (new Date(time).getTime())) / 1000 / 60 / 60)) + 'ساعة'
        }
        else if(((Date.now() - (new Date(time).getTime())) / 1000 / 60) >=1 ){
          return Math.round(((Date.now() - (new Date(time).getTime())) / 1000 / 60)) + 'دقيقة'
          }
          else if(((Date.now() - (new Date(time).getTime())) / 1000) >=1 ){
            return Math.round(((Date.now() - (new Date(time).getTime())) / 1000 )) + 'ثانية'
            }
            else
            return 'الان'
          }


