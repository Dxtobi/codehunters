
import axios, {AxiosRequestConfig} from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { AiFillGithub, AiOutlineComment } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

const active = "w-[40px] h-[40px] rounded-full bg-slate-300 object-cover";
const normal = "w-[50px] h-[50px] rounded-full object-cover bg-slate-300";

export default function Comment(params: { data: any; }) {

    const { data } = params;

   // const router = useRouter();

    

    console.log("data::", data)
    return (
        <div className={` w-full  ${data.accepted? "bg-[#30343a] box-shadow text-[#ffffff]":"bg-[#ffffff] text-[#30343a]"}  mb-3 p-5 rounded-lg flex items-start gap-2`}>
            <Image src={data?.user?.image} alt='' width={50} height={50} className=' rounded-full' />
            <div className="flex flex-col">
                <div className="w-full break-words break-all font-bold  overflow-w">{data?.user?.name}</div>
                <div className="break-words break-all whitespace-normal w-full overflow-w">{data?.message}</div>
                <div className=" w-full h-[1px] bg-slate-500 my-3"></div>
                <div className=" text-sm">2023 20 1 {data.created_at}</div>
            </div>
        </div>
    );
};