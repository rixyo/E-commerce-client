"use client"
import React, {  useEffect, useState } from 'react';
import {  Funnel, FunnelChart, LabelList, ResponsiveContainer, Tooltip } from 'recharts';

type LineChartOverviewProps = {
    data:{
        name:string | undefined
        value:number | undefined
        fill:string | undefined
    }[]; // data for the chart
};

const SalesOverview:React.FC<LineChartOverviewProps> = ({data}) => {
    const [isMuted,setIsMuted]=useState(false)
    useEffect(() => {
        setIsMuted(true)

    }, [])
    if(!isMuted) return null;
    
    return (
        <ResponsiveContainer width="100%" height={400}>
     <FunnelChart width={730} height={250}>
  <Tooltip />
  <Funnel
    dataKey="value"
    data={data}
    isAnimationActive
  >
    <LabelList position="inside" fill="#fff" stroke="none"  dataKey="name"  />
  </Funnel>
</FunnelChart>
</ResponsiveContainer>
    )
}
export default SalesOverview;