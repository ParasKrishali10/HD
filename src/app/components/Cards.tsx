"use client"
import { useEffect, useState ,useMemo } from "react"
import { useSearch } from "../context/SearchContext"
import axios from "axios"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
 interface Experience {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  duration: string;
  highlights: string[];
  included: string[];
  createdAt: string;
  updatedAt: string;
  slots: any[];
  bookings: any[];
}

export default function Cards(){

    const [loading,setLoading]=useState(false)
    const [exp,setExp]=useState<Experience[]>([])

    const router=useRouter()

    useEffect(()=>{
        const fetchExperience=async ()=>{
            try{
                setLoading(true);
                const res=await axios.get("http://localhost:3000/api/experience")
                setExp(res.data);
            }catch(error)
            {
                toast.error("Failed to fetch the experiences")
                console.log(error)
                return;
            }finally{
                setLoading(false)
            }

        }
        fetchExperience()

    },[])


    const {searchTerm}=useSearch()

    const filtered=exp.filter(
        (c)=>
            c.title.toLowerCase().includes(searchTerm.toLowerCase())||
         c.location.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleClick=async(id:string)=>{
        router.push(`/Details/${id}`)
    }

    if(loading)
    {
        return (
            <div className="flex justify-center items-center min-h-screen">
            <button type="button" className="bg-indigo-500 p-2 rounded-xl flex gap-2" disabled>
                 <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>

        <span className="mt-1">
    Processing…

        </span>

    </button>
            </div>

        )
    }

    return(

        <div  className="md: my-[32px] mx-[12px]">

            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-12 items-stretch ">

                {filtered.map((c)=>(
                    <div key={c.id} className="rounded-[12px] overflow-hidden shadow-md flex flex-col h-full">
  <img src={c.image} alt={c.title} className="w-full h-48 object-cover" />

  <div className="bg-[#F0F0F0] flex flex-col flex-1">
    <div className="flex justify-between items-center">
      <div className="font-inter font-medium text-[#161616] text-[18px] leading-[16px] ml-3 mt-4">
        {c.title}
      </div>
      <button className="bg-[#D6D6D6] text-[#161616] px-[8px] py-[4px] rounded-md mr-3 mt-3">
        {c.location}
      </button>
    </div>

    <div className="mt-2 mx-3 text-[#6C6C6C] text-regular leading-relaxed">
      {c.description}
    </div>


    <div className="flex-1"></div>

    <div className="flex justify-between items-center pb-3 mt-auto">
      <div className="flex font-inter text-[#161616] ml-3 mt-2">
        <div className="mt-2">From</div>
        <div className="text-[20px] font-medium ml-1 mt-1">₹{c.price}</div>
      </div>
      <button className="bg-[#FFD643] text-[#161616] px-[8px] py-[6px] rounded-md mr-3 mt-3 font-medium cursor-pointer" onClick={()=>handleClick(c.id)}>
        View Details
      </button>
    </div>
  </div>
</div>

                ))}
            </div>
        </div>
    )
}