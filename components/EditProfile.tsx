
import axios, {AxiosRequestConfig} from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router"
import Image from "next/image";

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

export default function EditProfile(params: { profile: any; }) {

    const { profile } = params

    const router = useRouter()
    
    const { register, handleSubmit } = useForm({defaultValues:profile});
    
    const onSubmitForm = async (values: Value) => {
        try {
            values.image = profile?.image;
            //console.log(values);
            const config: AxiosRequestConfig = {
                url: "/api/editprofile",
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
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full  ">
            <div className="w-full p-5">
                
                <img src={`${profile?.image}`} className='rounded-lg my-5' alt="avatar" width={60} height={60} />

                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <input className="p-3 bg-gray-100 rounded-md w-full outline-none mb-2" type='text'  {...register('username', { required: true })} placeholder="username" />
                    <input className="p-3 bg-gray-100 rounded-md w-full outline-none mb-2" type='text'  {...register('occupation', { required: true })} placeholder="Occupation" />
                    <input className="p-3 bg-gray-100 rounded-md w-full outline-none mb-2" type='tell'  {...register('phone', { required: true })} placeholder="Phone Optional" />
                    <input className="p-3 bg-gray-100 rounded-md w-full outline-none mb-2" type='text'  {...register('twitter')} placeholder="twitter handle without @" />
                    <input className="p-3 bg-gray-100 rounded-md w-full outline-none mb-2" type='text'  {...register('linkedin')} placeholder="linkedin url" />
                    
                    <input className="p-3 bg-gray-100 rounded-md w-full outline-none mb-2" type='text'  {...register('facebook')} placeholder="facebook url" />
                    <input className="p-3 bg-gray-100 rounded-md w-full outline-none mb-2" type='text'  {...register('instagram')} placeholder="instagram url" />
                    <input className="p-3 bg-gray-100 rounded-md w-full outline-none mb-2" type='text'  {...register('bio', { required: true })} placeholder="bio or skills" />
                    <input className="p-3 bg-gray-100 rounded-md w-full outline-none mb-2" type='text'  {...register('slug')} placeholder="unique url" />
                    <button className="p-3 bg-gray-900 text-white rounded-md w-full outline-none mb-2" type="submit">UPDATE</button>
                    <button className="p-3 bg-gray-500 text-white rounded-md w-full outline-none mb-2" onClick={()=>router.back()}>BACK</button>
                </form>
            </div>
            
        </div>
    )
}