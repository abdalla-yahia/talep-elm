
export default function FullTitle({ F_Title }: { F_Title: string | undefined }) {
  return (
    <div style={{ color: '#a36602' }} className="w-full bg-secondary_color flex text-background_color justify-center text-center items-center text-3xl shadow-md rounded-lg font-bold p-2 ">{F_Title}</div>
  )
}
