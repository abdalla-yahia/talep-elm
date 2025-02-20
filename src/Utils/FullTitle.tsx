
export default function FullTitle({ F_Title }: { F_Title: string | undefined }) {
  return (
    <div  className="w-full bg-background_color flex text-accent_color justify-center text-center items-center text-3xl shadow-md shadow-accent_color rounded-lg font-bold p-2 ">{F_Title}</div>
  )
}
