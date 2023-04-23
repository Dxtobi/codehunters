
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

export default function Navbar(params: { [x: string]: any; }) {
  const { session, ...others } = params
  const [userName, setUser] = useState('CodeMongers')
  const [userImg, setImage] = useState(null)

  useEffect(() => {
    if (others.profile?.session?.user.name && others.profile?.session?.user.image) {
      setImage(others.profile.session.user.image)
      setUser(others.profile.session.user.name)
      return 
    }
  }, [params])
  //console.log('session:::', others)
    return (
      <>
            <Head>
          <title>{userName}</title>
            <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <div className='z-50 flex items-center justify-between p-5 fixed top-0 right-0 w-full box-shadow  header_div '>
                <Link href='/' className='brand text-white bg-black p-2 rounded-lg'>
                    <span className='text-[#fffc31]'>JS</span>town
                </Link>
          <Link href='/search'>
            <AiOutlineSearch size={25}/>
          </Link>
            </div>
      </>
    )
  }