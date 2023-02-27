
import { AiFillHome, AiFillProfile, AiFillSetting, AiFillStar, AiOutlineStar, AiOutlineTwitter, AiOutlineUser, AiOutlineVerticalAlignTop } from "react-icons/ai";
import Link from "next/link"
import {useRouter} from "next/router"
import { useEffect } from "react";

export default function OverNav() {


    const router = useRouter();
    const { pathname } = router
    
    useEffect(() => {
        
    }, [pathname])

const mobile ="flex items-center fixed bottom-5 left-0 right-0 m-auto bg-[#000000a6] justify-between w-[90%] p-3"
const others=" lg:flex-col  lg:top-20 lg:left-4 lg:gap-5 bg-[#000000a6] lg:m-4 lg:p-5 lg:w-[10%]"
  return (
    <>
      <footer className={`${mobile} ${others} header_div rounded-lg`}>
        <Link
          className="flex flex-col items-center justify-center gap-2"
          href="/"
              >
                  <AiFillHome size={pathname == "/" ? 32 : 25} color={ pathname == "/" ? "#25bd5f" : "white"} />
        </Link>
        <Link
          className="flex flex-col items-center justify-center gap-2"
          href="/top"
              >
          <AiFillStar size={pathname == "/top" ? 32 : 25} color={ pathname == "/top" ? "#25bd5f" : "white"} />
        </Link>
        <Link
          className="flex flex-col items-center justify-center gap-2"
          href="/profile"
              >
          <AiFillSetting size={pathname == "/profile" ? 32 : 25} color={ pathname == "/profile" ? "#25bd5f" : "white"} />
        </Link>
        
      </footer>
    </>
  )
}