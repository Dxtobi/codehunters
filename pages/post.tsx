
import axios, {AxiosRequestConfig} from "axios";
import { useForm } from "react-hook-form";
import {useRouter} from "next/router"
//import { data } from "../../lib";
//import PostContainer from "./postContainer";
import { Key, useState } from "react";
import PostContainer from "../components/home/PostContainer";
import { data } from "../lib/fakeData";
import Comment from "../components/home/comment";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { BiCommentAdd, BiSend } from "react-icons/bi";




export default function Post(params: { post: any; session:any }) {
    
    const router = useRouter();
    const [comment, setComment] = useState('')
    const [inputMenu, setInputMenu] = useState(false)

    
    const cancelInput = () =>{
        setInputMenu(!inputMenu)
    }
    const sendComment = async () =>{
        if (comment.trim().length < 1) {
            return
        }

        try {
           
              const config: AxiosRequestConfig = {
                  url: `/api/posts/comments/${post.id}`,
                  data: {comment:comment.trim()},
                  method: "post",
                  headers: {
                      "Content-Type":"application/json"
                  }
              };
  
              const res = await axios(config)
  
            if (res.status === 200) {
                console.log(res)
                cancelInput()
                  //router.back()
              }
          } catch (error) {
              console.log(error)
          }

        console.log()
    }



 

    const   {post, session} = params
    console.log(post)

    const count = [1,0,1]
    return (
        <div className="w-full ">
           
           { <PostContainer data={post} />
            }
            <div>
                {
                    post?.responses?.map((e: any, i: Key | null | undefined) => (
                        <Comment data={e} key={i} />
                    ))
                }
            </div>
            { inputMenu?<div className="  fixed rounded-xl bottom-2 w-[90%] bg-[#000000a0] p-1   ">
                <div className=" relative">
                    <div className="header_div h-full absolute w-full -z-10"></div>
                <textarea className={`w-full h-20 outline-none bg-transparent p-1 text-white`} value={comment} onChange={(e)=>setComment(e.target.value)} />
                    <div className="flex justify-between items-center">
                        <button onClick={cancelInput} className="bg-red-200 p-2 rounded-xl px-5 text-red-400" >cancel</button>
                        <button onClick={sendComment} className="bg-blue-400 p-2 rounded-xl px-5 text-white">Send</button>
                </div>
                </div>
           </div>:<button className=" fixed h-[80px] rounded-full w-[80px] bg-[#000000a0] p-1 bottom-4 text-white flex justify-center items-center " onClick={cancelInput}><BiCommentAdd size={30}/></button>}
        </div>
    )
}

export async function getServerSideProps(context: any) {
    //console.log(context)
    const prisma = new PrismaClient();
    const session = await getSession(context);
    const quarry = context.query.id as string
    const post = await prisma.post.findUnique({ where: { id: quarry }, include: {user: true, responses:{include: { user: true }}}  });
    if (!session) {
      return {
        props: {
              session: null,
              post
        }, 
      }
    }
  
   
    //const sessionUser = session?.user as User;
   
   // const posts = await (await prisma.post.findMany({ take: 20, include: {user: true, responses:true} },));
   
    console.log( post);
    return {
      props: {
        session,
       // profile,
       post
      },
    }
  }