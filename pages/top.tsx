

import { getSession } from "next-auth/react";



export default function Profile(params: { profile: object; idType: number; session:any}) {


  if (!params.session) {
    return <div>You not logged in</div>
  }
 

    return (
      <div className="flex min-h-[70vh] flex-col items-center  p-0  ">
       
            this page is for top topics: its under construction.. 
              
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