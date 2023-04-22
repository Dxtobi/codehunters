
import { BiTrash } from "react-icons/bi";
import Image from "next/image";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";



const active = "w-[40px] h-[40px] rounded-full bg-slate-300 object-cover";
const normal = "w-[50px] h-[50px] rounded-full object-cover bg-slate-300";

export default function Comment(params: { data: any; deleteFunc:any, session:any }) {

    const { data, deleteFunc, session } = params;
    
   

   // const router = useRouter();

    return (
        <div className={` w-full  ${data?.accepted? "bg-[#30343a] box-shadow text-[#ffffff]":"bg-[#ffffff] text-[#30343a]"}  mb-3 p-5 rounded-lg flex items-start gap-2`}>
            <Image src={data?.user?.image} alt='' width={50} height={50} className=' rounded-full' />
            <div className="flex flex-col w-full">
                <div className="w-full break-words break-all font-bold  overflow-w">{data?.user?.name}</div>
                <div className="break-words break-all whitespace-normal w-full overflow-w"><ReactMarkdown children={data?.message} /></div>
                <div className=" w-full h-[1px] bg-slate-500 my-3"></div>
                
                <div className=" text-sm flex justify-between w-full">
                    <Moment fromNow>{parseInt(data.created_at)}</Moment>
                    {data.user.id === session.user.id && <button onClick={()=>deleteFunc(data.id)}><BiTrash /></button>}
                </div>
            </div>
        </div>
    );
};