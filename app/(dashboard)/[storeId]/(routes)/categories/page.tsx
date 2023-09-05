import {format} from 'date-fns'
import prismadb from "@/lib/prismadb";
import CategoryClient from "./components/client";
import { CategoryColumn } from "./components/columns";


export default async function CategoriesPage({params} : {params: {storeId : string}}){

    const {storeId} = params;

    const categories = await prismadb.category.findMany({
        where:{
            storeId
        },
        include: {
            billboard: true
        },
        orderBy:{
            createdAt: 'desc'
        }
    })


    const formattedCategories : CategoryColumn[] = categories.map((item) =>({
        id: item.id,
        name: item.name,
        billboardLabel : item.billboard.label ,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    })) 

    // console.log(formattedBillboards)
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data={formattedCategories}/>
            </div>
        </div>
    )
}