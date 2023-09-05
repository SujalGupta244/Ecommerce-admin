"use client"

import { useState } from "react"
import { Bar, BarChart ,XAxis, YAxis, ResponsiveContainer,  LineChart, Line, CartesianGrid, Tooltip, Legend} from "recharts"
import { Button } from "./ui/button"

interface OverviewProps{
    data : any
}

const Overview : React.FC<OverviewProps> = ({data}) => {
    const [changeChart,setChangeChart] = useState('bar')

    const onChange = () =>{
        if(changeChart === 'bar'){
            setChangeChart('line')
        }else{
            setChangeChart('bar')
        }
    }

  return (
    <>
    <Button onClick={onChange} className="mb-12">
        Change Chart
    </Button>
    {changeChart === 'bar' && 
    <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={"name"} stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`}/>
            <Tooltip/>
            <Bar dataKey={'total'} fill="#3498db" radius={[4,4,0,0]}/>
        </BarChart>
    </ResponsiveContainer>
    }
    {changeChart === 'line' &&
    <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Line type="monotone" dataKey="total" stroke="#3498db" activeDot={{ r: 8 }} />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
    </ResponsiveContainer>
    }
    </>
  )
}

export default Overview