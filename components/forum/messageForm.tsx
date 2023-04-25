import { useState } from "react";





export default function SendMessage(params: { profile: object; idType: number; session:any}) {

  const [message, setMessage] = useState('')
  
  function setChange(event: any): void {
    setMessage(event.target.event)
  }

  function notTyping(event: any): void {
    
  }

    return (
    
      
        <div className=" flex justify-between items-center w-full lg:w-1/2 absolute bottom-1 border-2 border-gray-300 rounded-2xl p-2 gap-1">
          <a href="/" className="text-blue-400">home</a>
          <input type="text" value={message} onChange={setChange} onBlur={notTyping} className="flex-1 p-4 outline-none bg-transparent"/>
          <button className=" bg-gray-900 text-white p-2 rounded">send</button>
        </div>
      
    )
}


