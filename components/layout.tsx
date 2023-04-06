import Navbar from './navbar'
import Footer from './footer'
import {useRouter} from "next/router"
import OverNav from './overnav';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import Metadata  from 'next';
import Head from 'next/head';
export const metadata = {
  title: "code monger",
  description: "solve code problems fast"
};

export default function Layout(params: { [x: string]: any; children: any }) {

  const { children, ...others } = params
  const nonPaths = ['/post', '/search', '/new']
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  useEffect(()=>{
    
    const handleRoutChangeStart = (url: string )=> ( url !== router.asPath ) && setLoading(true);
    const handleRoutChangeComplete = (url: string )=> ( url !== router.asPath ) && setLoading(false);

    router.events.on('routeChangeStart', handleRoutChangeStart)
    router.events.on('routeChangeComplete', handleRoutChangeComplete)
    router.events.on('routeChangeError', handleRoutChangeComplete)

  }, [router])
  
  const isInPath = nonPaths.includes(router.pathname)
  //console.log("layout:", isInPath)
  
  return (
    <div className=''>
    <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
        <link rel="manifest" href="/static/site.webmanifest" />
  </Head>
      <Navbar profile={others} />
      
      {loading && <Loading />}

      <main className='w-full md:w-[60%] lg:w-[50%] m-auto mt-16 p-5 '>{children}</main>

      {!isInPath && <OverNav />}
      
      <Footer />
      
    </div>
  )
}