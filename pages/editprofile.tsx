
import axios, {AxiosRequestConfig} from "axios";
import { useForm } from "react-hook-form";
import {useRouter} from "next/router"
import EditProfile from "../components/EditProfile";


export default function GetCardComp({ }) {
    
    const router = useRouter();
    const data = router.query;

   //console.log(data, '--edit---')

    return (
        <div className="flex min-h-[70vh] flex-col items-center  p-5 mt-20 ">
            <EditProfile profile = { data } />     
        </div>
    )
}