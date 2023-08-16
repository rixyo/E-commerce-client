import React from 'react';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

type PieProps = {
 data: {
        name: string;
        value: string;
 }[]
};

const PieOverview:React.FC<PieProps> = ({data}) => {
    
    return (
        <ResponsiveContainer width="100%" height={350}>
            

        <PieChart  width={300} height={250}>
  <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
  <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
</PieChart>
            </ResponsiveContainer>

        
    )
}
export default PieOverview;