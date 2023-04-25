

import { getSession } from "next-auth/react";
import ForumComp from "../components/forum";
import { ChangeEvent } from "react";
import List from "../components/forum/List";



export default function Profile(params: { profile: object; idType: number; session:any}) {


  if (!params.session) {
    return <div>You not logged in</div>
  }
 

  function setChange(event: any): void {
    
  }

  function notTyping(event: any): void {
    
  }
  const data = [{
    members: [1, 1, 1, 1, 1],
    corrent_topic: 'Importants of typescript',
    name:'JavaScript mastery with  TOBi',
  },
  {
    members: [1, 1, 1, 1, 1,3,3,3,3],
    corrent_topic: 'cluster in Node.js',
    name:'Node.js Hub',
  },
  ]

    return (
      <div className="flex  flex-col items-center  p-0  ">
        <List data={data} />
        <div>....fake data under dev....</div>
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