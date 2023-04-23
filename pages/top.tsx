

import { getSession } from "next-auth/react";
import ForumComp from "../components/forum";
import { ChangeEvent } from "react";



export default function Profile(params: { profile: object; idType: number; session:any}) {


  if (!params.session) {
    return <div>You not logged in</div>
  }
 

  function setChange(event: any): void {
    
  }

  function notTyping(event: any): void {
    
  }

    return (
      <div className="flex  flex-col items-center  p-0  ">
       
        <div>Topic:Node interview questions.</div>
        <ForumComp />
        <div className=" flex justify-between items-center w-full lg:w-1/2 absolute bottom-1 border-2 border-gray-300 rounded-2xl p-2 gap-1">
          <a href="/" className="text-blue-400">home</a>
          <input type="text" onChange={setChange} onBlur={notTyping} className="flex-1 p-4 outline-none bg-transparent"/>
          <button className=" bg-gray-900 text-white p-2 rounded">send</button>
        </div>
      </div>
    )
}


export async function getServerSideProps(context: any) {
 
  const session = await getSession(context);
 // const posts = await allFeed.GET_POST(0)
  
  //console.log(session, profile);
  return {
    props: {
      session:session?session:null,
    },
  }
}