import {format} from 'date-fns'
import prismadb from "@/lib/prismadb";
import SizeClient from "./components/client";
import { SizeColumn } from "./components/columns";


export default async function SizePage({params} : {params: {storeId : string}}){

    const {storeId} = params;

    const sizes = await prismadb.size.findMany({
        where:{
            storeId
        },
        orderBy:{
            createdAt: 'desc'
        }
    })


    const formattedSizes : SizeColumn[] = sizes.map((item) =>({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    })) 

    // console.log(formattedSizes)
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeClient data={formattedSizes}/>
            </div>
        </div>
    )
}