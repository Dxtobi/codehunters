
import axios, {AxiosRequestConfig} from "axios";
import { useForm } from "react-hook-form";
import {useRouter} from "next/router"
//import { data } from "../../lib";
//import PostContainer from "./postContainer";
import { Key } from "react";
import PostContainer from "../components/home/PostContainer";
import { data } from "../lib/fakeData";
import Comment from "../components/home/comment";




export default function Post() {

    
    const router = useRouter()

    //console.log(router)
    const count = [1,0,1,1,1,1,1]
    return (
        <div className="w-full">
           
            <PostContainer data={data.posts[0]} />
            
            <div>
                {
                    count.map((e, i) => (
                        <Comment data={e} key={i} />
                    ))
                }
            </div>
           
        </div>
    )
}