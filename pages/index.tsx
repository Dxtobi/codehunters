

import {

  getSession

} from "next-auth/react";


import HomeContainer from '../components/home/Index';

import { useState } from 'react';

import Auth from '../components/auth';
import { BiSend } from 'react-icons/bi';
import { IoReload } from 'react-icons/io5';
import Link from 'next/link';
import { allFeed } from '../lib/helpers';
import { CL_allFeed } from "../client_helpers";
import { removeObjectById } from "../lib/utils";
import Loading from "../components/Loading/LoadingItem";
import Loadingd from "../components/Loading/LoadingDelete";


const Home = (params: { session: any; profile: any; posts: any[]; }) => {

  const {session, posts} = params

  const [auth, setAuth] = useState(false);
  const [posts_, setPosts] = useState(posts);
  const [loading, setLoading] = useState(false);
  const [loadingd, setLoadingd] = useState(false);
  const cancel = () => {
    setAuth(!auth)
  }

  
  const getMore = async () => {
    setLoading(true)
    const res = await CL_allFeed.GET_MORE_POST(posts.length);
    res?.status === 200 && setPosts([...res.data, posts_])
    setLoading(false)
  }

  const deletePost = async (postId:string) => {
    setLoadingd(true)
    const res = await CL_allFeed.DELETE_POST(postId);
    const newArr = removeObjectById(posts_, postId)
    res?.status === 200 && setPosts(newArr)
    setLoadingd(false)
  }

  return (
    <div className="flex min-h-[70vh] flex-col items-center ">
      {
        loading && <Loading />
      }
      {
        loadingd && <Loadingd />
      }
     {!session && (
        <>
          <button onClick={cancel} className=' bg-gray-800 text-white w-full p-3 my-6 rounded-xl '>
            Login
          </button>
          {auth && <Auth cancel={cancel} />}
        </>
      )}
      {session && (<Link href='/new' className='fixed right-8 bottom-20 bg-[#25b05b33] text-white flex justify-center items-center w-16 h-16 rounded-full header_div'><BiSend size={34}/></Link>)}
      <HomeContainer data={posts} deletePost={deletePost} session={session} />
      <button onClick={getMore} className=' bg-gray-800 text-white  p-3 my-6 rounded-full '>
      <IoReload />
      </button>
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
