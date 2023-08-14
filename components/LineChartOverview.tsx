"use client"
import React, {  useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type LineChartOverviewProps = {
    data:{
        name:string
        current:any
        prev:any
    }[]; // data for the chart
};

const LineChartOverview:React.FC<LineChartOverviewProps> = ({data}) => {
    const [isMuted,setIsMuted]=useState(false)
    useEffect(() => {
        setIsMuted(true)

    }, [])
    if(!isMuted) return null;
    
    return (
        <ResponsiveContainer width="50%" height={350}>
        <LineChart width={730} height={250} data={data}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="monotone" dataKey="current" stroke="#8884d8" />
  <Line type="monotone" dataKey="prev" stroke="#82ca9d" />
</LineChart>
</ResponsiveContainer>
    )
}
export default LineChartOverview;