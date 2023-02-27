
import Link  from "next/link";


export default function Card1({ profile }) {

    const q = {
        id: profile.id,
        type:1000
  }
   

    return (
        <>
            <div className="w-full box-shadow p-3 bg-gray-100 text-gray-900 rounded-md slide relative flex-1 user-card">
                
                <div className="w-full h-[25vh] bg-gray-600 flex justify-center items-center rounded-md" >
                    <img src={profile.image} alt="" className="w-full h-full rounded-lg object-cover" />
                </div>
                <Link  href={{
                    pathname: "/profile",
                    query: q, // the data
                }}>
                    <div className="flex flex-col items-center">
                        <div className="text-3xl font-semibold uppercase m-3">{profile.name}</div>
                        <div className="capitalize m-3">{profile.occupation}</div>
                    </div>
                </Link>
                
            </div>
            
      </>
    )
  }