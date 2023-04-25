import { useState } from "react"
import { AiOutlineSend } from "react-icons/ai"
import { CL_forumFunc } from "../../client_helpers"


//params: { data:any, deletePost:any, session:any }
export default function ForumComp() {

  const [name, setName] = useState('')
    
    
  const createNew = async () => {
        const data = await CL_forumFunc.CREATE_FORUM(name)
  }

  return (
      <div className="w-full  ">
          <div className="w-[90%] p-2 flex items-center justify-between bg-white rounded-md m-auto border-2 border-gray-700">
              <input className="p-1  w-[80%] outline-none" onChange={(e)=>setName(e.target.value)} pattern="[a-zA-Z0-9]+" type='text' placeholder="group name" />
              <button className="w-[15%] p-1 rounded-xl bg-slate-600  flex justify-center items-center" onChange={createNew}><AiOutlineSend  color="white" size={30}/></button>
          </div>
          
      </div>
  )
}