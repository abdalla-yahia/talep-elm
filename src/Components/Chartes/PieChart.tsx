import { AllUserInterface } from '@/Interfaces/InterFaces';
import Image from 'next/image';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';



export default function PieChartPage({male,female}:{male:AllUserInterface[],female:AllUserInterface[]}) {
const data = [
  {name: 'الإجمالي',value:female?.length+male?.length,fill:'#fff'},
  {name: 'نساء',value:female?.length,fill:'#a21caf'},
  {name: 'رجال',value:male?.length,fill:'#bfdbfe'},
]
    return (
      <div className="flex w-full flex-col justify-center items-center gap-1">
      {/*Par Chart */}
      <div className="flex relative w-full h-[350px] flex-row gap-1 ">
      <ResponsiveContainer className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' width="100%" height="100%">
      <RadialBarChart   cx="50%" cy="50%" innerRadius="40%" outerRadius="80%" barSize={32} data={data}>
        <RadialBar
          background
          dataKey="value"
          label={{ fill: '#fff', position: 'insideStart' }}
          />
      </RadialBarChart>
    </ResponsiveContainer>
        <Image loading="lazy" className='absolute  rounded-full top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%]' src='/avatar/man-woman-icon.avif' width={107} height={107} alt='woman-man-icon' />
          </div>
      {/*Data */}
      <div className="flex w-1/2 justify-evenly items-center ">
      <div className="flex  gap-1 ">
        <p className='rounded-full w-[20px] h-[20px] bg-blue-200'></p>
        <span>
          <span className='text-blue-500'>{male?.length}</span>
          رجال
        </span>
      </div>
      <div className="flex gap-1 ">
        <p className='rounded-full w-[20px] h-[20px] bg-fuchsia-600'></p>
        <span>
          <span className='text-fuchsia-800'>{female?.length}</span>
          نساء
        </span>
      </div>
      </div>
          </div>
    );
  }

