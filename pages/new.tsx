
import axios, {AxiosRequestConfig} from "axios";
import { useForm } from "react-hook-form";
import {useRouter} from "next/router"
import { BiSend } from "react-icons/bi";
import { useState } from "react";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import Loading from "../components/Loading";



export default function NewPost(params: { user: any; }) {

    //const { user } = params
    const router = useRouter()
    const [tags, setTags] = useState(Array<string>)
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit } = useForm();
    
    const onSubmitForm = async (values: any) => {
       console.log('called')
        values.tags = tags
        setLoading(true)
        try {
           // values.image = user?.image;
            //console.log(values);
            const config: AxiosRequestConfig = {
                url: "/api/posts/new",
                data: values,
                method: "post",
                headers: {
                    "Content-Type":"application/json"
                }
            };

            const res = await axios(config)

            if (res.status === 200) {
                router.push('/')
            }
            console.log(res)
            router.back()
        } catch (error) {
            console.log(error)
        }
    }

    const separateStrings =(e: { target: { value: string; }; }) => {
        let txt = e.target.value.toLocaleString().split(",")

        setTags(txt)
        
    }

    function deleteTag(item: string): void {
        const newTags = tags.filter((e)=>e !==item);
        console.log(newTags)
        setTags(newTags)

    }

    return (
        <div className="w-full">
            {
                loading && <Loading />
            }
            <div className="w-full ">
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <input className="p-3 bg-white rounded-md w-full outline-none mb-2" type='text'  {...register('title', { required: true })} placeholder="Title" />
                    <textarea className="p-3 bg-white rounded-md w-full outline-none mb-2 h-36"  {...register('message', { required: true })} placeholder="longer text goes here..." />
                    <div className="flex flex-wrap gap-1 my-2">
                    {
                        tags.map((e, i) => (
                            <div className="  rounded-sm flex gap-1 items-center capitalize bg-blue-400 text-white p-1" key={i}> <div>{e}</div> <button onClick={()=>deleteTag(e)}><AiFillDelete size={25} className="text-red-200"/></button></div>
                        ))
                    }
                    </div>
                    <input className="p-3 bg-white rounded-md w-full outline-none mb-2" type='text' onChange={separateStrings} placeholder="tags; separate with comma" />
                    <input className="p-3 bg-white rounded-md w-full outline-none mb-2" type='text' {...register('link', )} placeholder="code repo (optional)" />
                    <input className="p-3 bg-white rounded-md w-full outline-none mb-2" type='text' {...register('image')} placeholder="image url (optional)" />
                    <input className="p-3 bg-white rounded-md w-full outline-none mb-2" type='number' {...register('points', )} placeholder="solution price (optional)" />
                    <button className="p-3 bg-gray-900 text-white rounded-md w-full outline-none mb-2 mt-4 flex  justify-center items-center" type="submit"><BiSend size={32}/></button>
                </form>
                <button onClick={()=>router.back()} className="p-3 bg-gray-700 text-white rounded-md w-full outline-none mb-2 mt-4 flex  justify-center items-center" >Cancel</button>
            </div>
            
        </div>
    )
}