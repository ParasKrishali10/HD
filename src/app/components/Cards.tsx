"use client"
import { useSearch } from "../context/SearchContext"

export default function Cards(){
    const card=[
        {id:1,experience:"Kayaking",place:"Udupi",description:"Curated small-group experience. Certified guide . Safety first with gear included." , price:899,details:"kayaking experiencemajdiooooooooooooooooooooooooooooooooo",image:"./Kayaking1.jpg"},
        {id:2,experience:"Nandi Hill Sunrise",place:"Banglore",description:"Curated small-group experience. Certified guide . Safety first with gear included." , price:899,details:"sunrise experience",image:"./Kayaking1.jpg"},
        {id:3,experience:"Coffee Trail",place:"Udupi,karnataka",description:"Curated small-group experience. Certified guide . Safety first with gear included." , price:899,details:"hellowjiiii",image:"./Kayaking1.jpg"},
        {id:4,experience:"Kayaking",place:"Udupi",description:"Curated small-group experience. Certified guide . Safety first with gear included." , price:899,details:"hellowjiiii",image:"./Kayaking1.jpg"},
        {id:5,experience:"Kayaking",place:"Udupi",description:"Curated small-group experience. Certified guide . Safety first with gear included." , price:899,details:"hellowjiiii",image:"./Kayaking1.jpg"},
        {id:6,experience:"Kayaking",place:"Udupi",description:"Curated small-group experience. Certified guide . Safety first with gear included." , price:899,details:"hellowjiiii",image:"./Kayaking1.jpg"},
        {id:7,experience:"Kayaking",place:"Udupi",description:"Curated small-group experience. Certified guide . Safety first with gear included." , price:899,details:"hellowjiiii",image:"./Kayaking1.jpg"},
        {id:8,experience:"Kayaking",place:"Udupi",description:"Curated small-group experience. Certified guide . Safety first with gear included." , price:899,details:"hellowjiiii",image:"./Kayaking1.jpg"},
    ]

    const {searchTerm}=useSearch()

    const filtered=card.filter(
        (c)=>
            c.experience.toLowerCase().includes(searchTerm.toLowerCase())||
         c.place.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return(
        <div  className="md: my-[32px] mx-[12px]">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-12 ">
                {filtered.map((c)=>(
                    <div key={c.id} className=" rounded-[12px] overflow-hidden shadow-md">
                        <div>
                            <img src={c.image} alt="Refresh" className="w-full rounded-md object-cover"/>

                        </div>
                        <div className="bg-[#F0F0F0] ">
                            <div className="flex justify-between items-center">
                                <div className="font-inter font-medium text-[#161616] text-[18px]  leading-[16px] ml-3 mt-4">
                                    {c.experience}
                                </div>
                                <button className="bg-[#D6D6D6] text-[#161616] px-[8px] py-[4px] rounded-md mr-3 mt-3">
                                    {c.place}
                                </button>
                            </div>
                            <div className="mt-2 mx-3 text-[#6C6C6C] text-regular leading-relaxed">
                                {c.description}
                            </div>
                            <div className="flex justify-between items-center pb-3">
                                <div className=" flex font-inter font-regular text-[#161616] leading-[12px] ml-3 mt-2">
                                    <div className="font-inter font-regular leading-[12px] mt-2">
                                        From
                                    </div>
                                    <div className="text-[#161616] font-inter font-medium text-[20px] leading-[20px] ml-1 mt-1">
                                   ₹{c.price}

                                    </div>
                                </div>
                                <button className="bg-[#D6D6D6] text-[#161616]  px-[8px] py-[4px] rounded-md mr-3 mt-3 cursor-pointer font-inter font-medium bg-[#FFD643] px-[8px] py-[6px]">
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