import Link from "next/link";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key } from "react";
import { BiGroup } from "react-icons/bi";




//params: { data:any, deletePost:any, session:any }
export default function List({data}:any) {

   // const { data, deletePost, session } = params
   // const router = useRouter()
    

    return (
        <div className="w-full">

            {
                data.map((d: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; corrent_topic: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; members: string | any[]; }, i: Key | null | undefined) => (
                    <Link href='/404' key={i} className=" my-4 flex justify-between">
                        <div >
                            <div className=" font-bold  text-lg">{d.name}</div>
                            <span className=" text-yellow-900">Topic:{' '}</span>
                            <span className="text-gray-800">{d.corrent_topic}</span>
                        </div>
                        <div className="flex gap-1 items-center">
                            <BiGroup/><div>{d.members.length}</div>
                        </div>
                    </Link>
                ))
            }
           
        </div>
    )
}