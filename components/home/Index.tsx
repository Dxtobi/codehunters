
import axios, {AxiosRequestConfig} from "axios";
import { useForm } from "react-hook-form";
import {useRouter} from "next/router"
//import { data } from "../../lib";
//import PostContainer from "./postContainer";
import { Key } from "react";
import PostContainer from "./PostContainer";



export default function HomeContainer(params: { data:any }) {

    const { data } = params
    const router = useRouter()

//console.log(data)
    return (
        <div className="w-full">
            {
                data.posts.map((d: any, i: Key | null | undefined) => (
                    <PostContainer data={d} key={i} />
                ))
            }
        </div>
    )
}