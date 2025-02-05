'use client'
import { AllAssinmentInterface } from '@/Interfaces/InterFaces';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface BarChartPageProps {
  data: AllAssinmentInterface[];
}

export default function BarChartPage({ data }: BarChartPageProps) {

  return (
    <>
    <ResponsiveContainer width="100%" height="100%" aspect={4/2}>
        <BarChart
          width={500}
          height={300}
          data={data}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd'/>
          <XAxis dataKey="name" axisLine={false} tick={{fill:'#d1d5db'}} tickLine={false}/>
          <YAxis axisLine={false} tick={{fill:'#d1d5db'}} tickLine={false}/>
          <Tooltip contentStyle={{borderRadius:'10px',borderColor:'lightgray'}}/>
          <Legend textDecoration='عدد الطلاب في التكليف' />
              <Bar label legendType='circle' dataKey="AssinmentResult.length" fill="#bfdbfe"  radius={[10,10,0,0]} activeBar={<Rectangle fill="gold" stroke="purple" />} />
              {/* <Bar dataKey="AssinmentResult.score" fill="#8884d8" radius={[10,10,0,0]} activeBar={<Rectangle fill="pink" stroke="blue" />} /> */}
        </BarChart>
      </ResponsiveContainer>
          </>
  )
}
