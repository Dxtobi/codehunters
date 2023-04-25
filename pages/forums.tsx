

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
        <ForumComp />
      </div>
    )
}


export async function getServerSideProps(context: any) {
    //console.log(context)

    const session = await getSession(context);
    const quarry = context.query.id as string
    //const post = await allFeed.GET_ONE(quarry)

    return {
        props: {
            session: session ? session : null,
           // post: post ? post : null
        },
    }
}