"use client"

import {Modal} from '@/components/ui/modal'
import {useStoreModal} from "@/hooks/use-store-modal"

import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {toast} from 'react-hot-toast'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import axios from 'axios'
import { redirect } from 'next/navigation'


const formSchema = z.object({
    name: z.string().min(1),

})


export const StoreModal = () =>{
    const storeModal = useStoreModal()

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: '',
        }
    })

    const onSubmit = async(values: z.infer<typeof formSchema>) =>{
        // console.log(values);
        // TODO : Create Store
        
        try{
            setLoading(true)

            const res = await axios.post('/api/stores',values)
            const data = await res.data

            window.location.assign(`/${data.id}`)

            console.log(res);
            // toast.success("Store Created.")
            // redirect(`/:${data.id}`)
        }catch(err){
            // console.log(err);
            toast.error("something went wrong");
            
        }finally{
            setLoading(false)
        }
    }

    return(
        <Modal title="Create store" description='Add a new store to manage product and categories' isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
            <div className="">
                <div className="space-y-4 py-4 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name='name' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='E-commerce' {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                            <div className="pt-6 space-x-2 flex items-center justify-end justify-w-full">
                                <Button disabled={loading} variant={'outline'} onClick={storeModal.onClose}>Cancel</Button>
                                <Button disabled={loading} type='submit'>Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}



