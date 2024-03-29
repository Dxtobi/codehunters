
import { useRouter } from "next/router"
import { AiFillGithub, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import Link from "next/link";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key } from "react";
import Moment from 'react-moment';

import SyntexHilight from "../cards/SyntexHylighter";
import ReactMarkdown from 'react-markdown'
import { BiTrash } from "react-icons/bi";

const active = "w-[40px] h-[40px] rounded-full bg-slate-300 object-cover";
const normal = "w-[50px] h-[50px] rounded-full object-cover bg-slate-300";
export default function PostContainer(params: { data: any; deletePost:any, session:any }) {

    const { data, deletePost, session } = params

    const router = useRouter()

    //console.log("data::", data)
    return (
        <div className={` w-full ${data?.responses?.length >= 20  ? "bg-[#081833] " : "bg-[#ffffff] box-shadow"} ${data?.responses?.length >= 20 ? "text-[#ffffff]":"text-[#30343a]" } mb-3 p-2 rounded-lg`}>
            <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <div className={data?.user?.top ? "w-[50px] h-[50px] p-2 rounded-full border border-[#25bd5f] flex justify-center items-center" : normal} >
                        <img src={data?.user?.image} alt="" className={data?.user?.top ? active : normal} />
                    </div>
                    <div>
                        <div className="text-lg font-semibold">{data?.user.name}</div>
                        <div className="text-sm font-thin">
                            <Moment fromNow>{parseInt(data.created_at)}</Moment>
                        </div>
                    </div>
                </div>
                <div>
                    {data?.user?.id === session?.user.id ? <button onClick={()=>deletePost(data.id)}><BiTrash /></button>:
                    <Link href={data.link} className="flex justify-start gap-1 items-center w-full rounded-full text-green-800 my-1">
                        <AiFillGithub size={30} />
                    </Link>
}
                </div>
            </div>
            {
                //body
            }
            <div className="mt-3">
                <div className={`font-extrabold text-lg   ${!data.closed ? "text-[#30343a]" : "text-[#25bd5f]"}`} >{data.title}</div>
                <div className="mb-4" ><ReactMarkdown children={data?.message} /></div>
                {
                   data.codes_  &&  (<div>
                    <SyntexHilight code={data.codes_} />
                </div>)
               }
                <div className="flex gap-2">
                    {data.tags.map((e: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined, i: Key | null | undefined) => (
                        <Link href={'/search'} className="capitalize font-bold text-blue-500" key={i} >{e}</Link>
                    ))}
                </div>
                {
                    data.image != "" && <img src={data.image} className="w-full h-auto object-contain rounded-lg bg-slate-400 my-2" />
                }

                <Link href={
                    {
                        pathname: '/post',
                        query: { id: data.id },

                    }


                } className="flex justify-start gap-3 items-center w-full rounded-full text-green-800 my-1" shallow>
                    <div className="flex justify-start gap-3 items-center w-full rounded-full text-green-800 my-1">
                        <AiOutlineComment size={30} />

                    </div>

                </Link>

                {
                    //footer
                }

                <div className="flex justify-between items-center">
                    <div className="font-extrabold text-[#25bd5f] flex gap-2 items-center">
                        <AiFillHeart size={30} />
                        <div> {data.points}</div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 ">
                        <div className="flex h-full">{data.responses.length}+</div>
                        <div className="flex">
                            {data.responses.slice(0, 4).map((ph: {
                                [x: string]: any;
                                top: any; image: string | undefined;
                            }, i: any) => (
                                <img className={ph?.user?.top ? " border-2 border-purple-700 w-[30px] h-[30px] rounded-full ml-[-10px]" : "w-[30px] h-[30px] rounded-full ml-[-10px]"} src={ph?.user?.image} key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}