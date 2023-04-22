





export default function Loading() {

  return (
    <div className=" bg-[#00000044] h-[100vh] w-full header_div flex justify-center items-center flex-col fixed left-0 top-0 z-50">
        <div className="lds-ripple"><div></div><div></div></div>
        <div className="text-white">Loading</div>
    </div>
    
  )
}