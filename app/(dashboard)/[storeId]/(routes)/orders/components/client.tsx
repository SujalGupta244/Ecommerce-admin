"use client"

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { OrderColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface BillboardClientProps{
  data : OrderColumn[]
}

const OrderClient : React.FC<BillboardClientProps> = ({data}) => {


  return (
    <>
      <Heading title={`Orders (${data.length})`} description="manage orders for your store"/>        
      <Separator/>
      <DataTable searchKey="products" columns={columns} data={data}/>
    </>
  )
}

export default OrderClient