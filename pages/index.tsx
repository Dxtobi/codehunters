import { PrismaClient } from '@prisma/client';

import {

  signIn,

  signOut,

  getSession

} from "next-auth/react";

import { data } from '../lib/fakeData';

import HomeContainer from '../components/home/Index';

import { useState } from 'react';

import Auth from '../components/auth';
import { BiSend } from 'react-icons/bi';
import Link from 'next/link';
import { allFeed } from '../lib/helpers';



const Home = (params: { session: any; profile: any; posts: any; }) => {

  const {session, profile, posts} = params

  console.log(params);
  const [auth, setAuth] = useState(false);

  const cancel = () => {
    setAuth(!auth)
  }
  return (
    <div className="flex min-h-[70vh] flex-col items-center     ">
     
      {session && (
        <>

          <HomeContainer data={posts} />
          <Link href='/new' className='fixed right-8 bottom-20 bg-[#25b05b33] text-white flex justify-center items-center w-16 h-16 rounded-full header_div'><BiSend size={34}/></Link>

        </>
      )}
      {!session && (
        <>
          
          <button onClick={cancel} className=' bg-gray-800 text-white w-full p-3 my-6 rounded-xl '>
            Login
          </button>

          {auth && <Auth cancel={cancel} />}

          {
            //TODO move back to verified user when online--->;
          }

          
         
          <HomeContainer data={posts} />
        </>
      )}
    </div>
  )
}



export async function getServerSideProps(context: any) {
 
  const session = await getSession(context);
  const posts = await allFeed.GET_POST(0)
  


 
  
  
  //console.log(session, profile);
  return {
    props: {
      session:session?session:null,
      posts:posts?posts:null
    },
  }
}
export default Home
