
import axios, {AxiosRequestConfig} from "axios";
import { useForm } from "react-hook-form";
import {useRouter} from "next/router"
import EditProfile from "../components/EditProfile";
import CreateProfile from "../components/CreateProfile";
import { useSession } from "next-auth/react";



export default function Create_profile({ }) {
    
    //const router = useRouter();
    const {data: session} = useSession()
    //const data = router.query;

   //console.log(data, '--edit---')

    return (
        <div className="flex min-h-[70vh] flex-col items-center ">
            <CreateProfile user = { session?.user } />     
        </div>
    )
}