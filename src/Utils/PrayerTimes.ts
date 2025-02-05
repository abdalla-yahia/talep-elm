
export default function PrayerTimes() {
    const date = new Date()
    const Month = date.getMonth() + 1
    const city= 'Cairo '
    const method = 5

    const api = `https://api.aladhan.com/v1/calendarByAddress/${date.getFullYear()}/${Month}?address=${city},Egypt&method=${method}`
    
    return (fetch( api).then((res)=>res.json()))

}
