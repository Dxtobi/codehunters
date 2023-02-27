
import axios, {AxiosRequestConfig} from "axios";
import { useForm } from "react-hook-form";
import {useRouter} from "next/router"
import { BiSend } from "react-icons/bi";

interface Value {
    name: string,
    email: string,
    phone: string,
    twitter?: string,
    linkedin?: string,
    facebook?: string,
    instagram?: string,
    bio: string,
    image?: string
}

export default function NewPost(params: { user: any; }) {

    //const { user } = params
    const router = useRouter()
    
    const { register, handleSubmit } = useForm();
    
    const onSubmitForm = async (values: any) => {
        try {
           // values.image = user?.image;
            //console.log(values);
            const config: AxiosRequestConfig = {
                url: "/api/createprofile",
                data: values,
                method: "post",
                headers: {
                    "Content-Type":"application/json"
                }
            };

            const res = await axios(config)

            if (res.status === 200) {
                router.back()
            }
            console.log(res)
            router.back()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full">
            <div className="w-full ">
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <input className="p-3 bg-white rounded-md w-full outline-none mb-2" type='text'  {...register('title', { required: true })} placeholder="Title" />
                    <textarea className="p-3 bg-white rounded-md w-full outline-none mb-2 h-36"  {...register('message', { required: true })} placeholder="longer text goes here..." />
                    <input className="p-3 bg-white rounded-md w-full outline-none mb-2" type='text' {...register('tags')} placeholder="tags; separate with comma" />
                    <input className="p-3 bg-white rounded-md w-full outline-none mb-2" type='text' {...register('link', )} placeholder="code repo (optional)" />
                    <input className="p-3 bg-white rounded-md w-full outline-none mb-2" type='text' {...register('image')} placeholder="image url (optional)" />
                    <button className="p-3 bg-gray-900 text-white rounded-md w-full outline-none mb-2 mt-4 flex  justify-center items-center" type="submit"><BiSend size={32}/></button>
                </form>
            </div>
            
        </div>
    )
}