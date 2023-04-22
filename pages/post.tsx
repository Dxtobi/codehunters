
import {useRouter} from "next/router"
import { Key, useEffect, useState } from "react";
import PostContainer from "../components/home/PostContainer";
import { data } from "../lib/fakeData";
import Comment from "../components/home/comment";
import { getSession } from "next-auth/react";
import { BiCommentAdd, BiSend } from "react-icons/bi";
import { allFeed } from "../lib/helpers";
import { CL_allFeed } from "../client_helpers";
import Loading from "../components/LoadingItem";
import io, { Socket } from "socket.io-client";


let socket:Socket;



export default function Post(params: { post: any; session:any }) {
    const { post } = params
    
    const router = useRouter();
    const [comment, setComment] = useState('')
    const [inputMenu, setInputMenu] = useState(false)
    const [loading, setLoading] = useState(false)
    const [comments, setComments ] = useState(post?.responses ?? [])
    const [input, setInput] = useState('')

    useEffect(() => {
        socketInitializer();
       //console.log(comments)
       
   }, []);

    const socketInitializer = async (): Promise<void> => {
        await fetch('/api/socket');
        
        socket = io();
      
        socket.on('connect', () => {
            console.log('connected');
        });
      
        socket.on('newIncomingMessage', (msg: string) => {
            let c = [ msg, ...comments,  ]
           // console.log(c.length)
            setLoading(false)
            setComments(c);
            //console.log(c)
        });

        return 
      };
    
    
     

   


    
    const cancelInput = () =>{
        setInputMenu(!inputMenu)
        //setLoading(false)
    }
    const sendComment = async () =>{
        
        if (comment.trim().length < 1) {
            return
        }
        setLoading(true)
       try {
        const res = await CL_allFeed.POST_COMMENT(post.id, comment)
           res?.status == 200 && cancelInput()
           
           socket.emit("createdMessage", res?.data)
       } catch (error) {
        console.log(error)
       }
        //console.log(res)
        //router.reload()

    }

    
    
   
    return (
        <div className="w-full ">
            {
                loading && <Loading/>
           }
           { post && <PostContainer data={post} />
            }
            <div>
                {
                    comments && comments.reverse().map((e: any, i: Key | null | undefined) => (
                        <Comment data={e} key={i} />
                    ))
                }
            </div>
            { inputMenu?<div className="  fixed rounded-xl bottom-2 w-[90%] bg-[#000000a0] p-1  mx-auto left-1 ">
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
    
    const session = await getSession(context);
    const quarry = context.query.id as string
    const post = await allFeed.GET_ONE(quarry)
    
    return {
      props: {
        session : session ? session: null,
        post : post ? post: null
      },
    }
  }