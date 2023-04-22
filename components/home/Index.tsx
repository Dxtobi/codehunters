
import axios, {AxiosRequestConfig} from "axios";
import { useForm } from "react-hook-form";
import {useRouter} from "next/router"
//import { data } from "../../lib";
//import PostContainer from "./postContainer";
import { Key } from "react";
import PostContainer from "./PostContainer";



export default function HomeContainer(params: { data:any, deletePost:any, session:any }) {

    const { data, deletePost, session } = params
    const router = useRouter()

    return (
        <div className="w-full">
            {
                data?.map((d: any, i: Key | null | undefined) => (
                    <PostContainer data={d} key={i} deletePost={deletePost} session={session} />
                ))
            }
        </div>
    )
}