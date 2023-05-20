
import { useRouter } from "next/router"
import { Key, useEffect, useState } from "react";
import PostContainer from "../components/home/PostContainer";
import { data } from "../lib/fakeData";
import Comment from "../components/home/comment";
import { getSession } from "next-auth/react";
import { BiCommentAdd, BiSend } from "react-icons/bi";
import { allFeed } from "../lib/helpers";
import { CL_allFeed } from "../client_helpers";

import io, { Socket } from "socket.io-client";
import { removeObjectById } from "../lib/utils";
import { Session } from "inspector";
import Loading from "../components/Loading/LoadingItem";
import LoadingD from "../components/Loading/LoadingDelete";

let socket: Socket;



export default function Post(params: { post: any; session: any }) {
    const { post, session } = params

    const [comment, setComment] = useState('')
    const [inputMenu, setInputMenu] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingd, setLoadingd] = useState(false)
    const [comments, setComments] = useState(post?.responses ?? [])


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
            let c = [msg, ...comments,]
            // console.log(c.length)
            setLoading(false)
            setComments(c);
            console.log(c)
        });

        return
    };


    const cancelInput = () => {
        setInputMenu(!inputMenu)
        setComment('')
    }

    const sendComment = async () => {

        if (comment.trim().length < 1) {
            return
        }
        
        setLoading(true)
        try {
            const res = await CL_allFeed.POST_COMMENT(post.id, comment)
            res?.status == 200 && cancelInput()

            let c = [res?.data, ...comments,]
            // console.log(c.length)
            setLoading(false)
            setComments(c);
           // socket.emit("createdMessage", res?.data)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        //console.log(res)
        //router.reload()

    }

    async function deleteFunc(id: string) {
        setLoadingd(true)
        const res = await CL_allFeed.DELETE_COMMENT(id)
        //console.log(res)
        let c = removeObjectById(comments, id)
        // console.log(c.length)
        setComments(c);
        setLoadingd(false)

        res?.status == 200 && setLoading(false)
    }
    return (
        <div className="w-full ">
            {
                loading && <Loading />
            }
            {
                loadingd && <LoadingD />
            }
            {post && <PostContainer data={post} deletePost={deleteFunc} session={session} />
            }
            <div>
                {
                    comments && comments.reverse().map((e: any, i: Key | null | undefined) => (
                        <Comment data={e} key={i} deleteFunc={deleteFunc} session={session} />
                    ))
                }
            </div>
            {inputMenu ? <div className=" z-50 fixed rounded-xl bottom-2 w-[98%] bg-[#000000a0] p-1  mx-auto left-1 ">
                <div className=" relative">
                    <div className="header_div h-full absolute w-full -z-10"></div>
                    <textarea className={`w-full h-20 outline-none bg-transparent p-1 text-white`} value={comment} onChange={(e) => setComment(e.target.value)} />
                    <div className="flex justify-between items-center">
                        <button onClick={cancelInput} className="bg-red-200 p-2 rounded-xl px-5 text-red-400" >cancel</button>
                        <button onClick={sendComment} className="bg-blue-400 p-2 rounded-xl px-5 text-white">Send</button>
                    </div>
                </div>
            </div> : <button className="z- fixed h-[80px] rounded-full w-[80px] bg-[#000000a0] p-1 bottom-20 text-white flex justify-center items-center " onClick={cancelInput}><BiCommentAdd size={30} /></button>}
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
            session: session ? session : null,
            post: post ? post : null
        },
    }
}