"use client"
import Link from "next/link";
import Navbar from "../../components/navbar";
import { useParams } from "next/navigation";

export default function Confirmation(){
  const params=useParams()
    return <div>
        <div>
            <Navbar></Navbar>
            <div className="min-h-screen flex flex-col items-center mt-12  px-4">
                <div className="bg-[#22C55E] rounded-full w-12 h-12 flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          className="w-[80px] h-[80px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </div>


      <h1 className=" font-medium text-[32px] leading-[40px] text-[#161616]">
        Booking Confirmed
      </h1>
      <p className="text-[#656565] font-regular leading-[24px] text-[20px] mt-2">
        Ref ID: <span className="text-[#656565] font-regular leading-[24px] text-[20px]">{params.id}</span>
      </p>

      <Link
        href="/"
        className="mt-6 bg-[#E3E3E3] hover:bg-[#DADADA] text-[#161616] text-[16px] leading-[20px] px-[16px] font-regular  py-[8px] cursor-pointer rounded-md transition-all"
      >
        Back to Home
      </Link>
            </div>
        </div>
    </div>
}