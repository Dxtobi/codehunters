





export default function Loading() {

  return (
    <div className=" bg-[#00000044] h-[100vh] w-full header_div flex justify-center items-center flex-col">
        <div className="lds-ripple"><div></div><div></div></div>
        <div className="text-gray-900">Loading</div>
    </div>
    
  )
}