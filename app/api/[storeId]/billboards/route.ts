import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request,{params}:{params: {storeId: string}}){
    try{
        const {userId} = auth()
        const body = await req.json()

        const {label, imageUrl} = body

        if(!userId){
            return new NextResponse("Unauthenticated",{status: 401})
        }

        if(!label){
            return new NextResponse("Label is required",{status: 401})
        }
        if(!imageUrl){
            return new NextResponse("ImageUrl is required",{status: 401})
        }
        if(!params.storeId){
            return new NextResponse("Store Id is required",{status: 401})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId){
            return new NextResponse("Unauthorized", {status: 403})
        }

        const billboard = await prismadb.billboard.create({
            data:{
                label,
                imageUrl,
                storeId : params.storeId
            }
        })

        return NextResponse.json(billboard)

    }catch(err){
        console.log('[BILLBOARDs_POST]',err);
        return new NextResponse("Internal error",{status: 500})
    }
}


export async function GET(req: Request,{params}:{params: {storeId: string}}){
    try{

        if(!params.storeId){
            return new NextResponse("Store Id is required",{status: 401})
        }


        const billboards = await prismadb.billboard.findMany({
            where:{
                storeId : params.storeId
            }
        })

        return NextResponse.json(billboards)

    }catch(err){
        console.log('[BILLBOARDs_GET]',err);
        return new NextResponse("Internal error",{status: 500})
    }
}