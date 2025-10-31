"use client"
import { useEffect, useState } from "react";
import Navbar from "../components/navbar"
import Link from "next/link";
import { useSearchParams,useRouter } from "next/navigation";
import { toast } from "react-toastify";
export interface Slot {
  id: string;
  experienceId: string;
  date: string;
  startTime: string;
  endTime: string;
  totalSeats: number;
  availableSeats: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  experience?: Experience;
}
export interface Experience {
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
  slots?: Slot[];
  bookings?: Booking[];
}
export interface Booking {
  id: string;
  experienceId: string;
  slotId: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  numberOfSeats: number;
  totalPrice: number;
  promoCode?: string | null;
  discount: number;
  finalPrice: number;
  status: "confirmed" | "cancelled" | "pending";
  createdAt: string;
  updatedAt: string;
  experience?: Experience;
  slot?: Slot;
}

export interface PromoCode {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  isActive: boolean;
  expiryDate?: string | null;
  createdAt: string;
  updatedAt: string;
}
export default function Checkout(){
     const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("test@test.com");
  const [promo, setPromo] = useState("");
    const [phone, setPhone] = useState("9999999999");
  const [experience, setExperience] = useState<Experience | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
const experienceId = searchParams.get("experienceId");
const slotId = searchParams.get("slotId");
const numberOfSeats = Number(searchParams.get("quantity") || 1);
const router=useRouter()
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)
      if (experienceId) {
        const res = await fetch(`/api/experience/${experienceId}`);
        const data = await res.json();
        setExperience(data);
      }

      if (slotId) {
        const res = await fetch(`/api/slot/${slotId}`);
        const data = await res.json();
        setSlot(data);
      }
    } catch (err) {
      console.error("Failed to fetch experience or slot", err);
    }finally{
      setLoading(false)
    }
  };

  fetchData();
}, [experienceId, slotId]);
const handleBooking = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          experienceId,
          slotId,
          firstName: name,
          lastName: "",
          email,
          phone,
          numberOfSeats,
          promoCode: promo || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Booking failed");
      }

      toast.success("Booking confirmed!");
      console.log("Booking successful:", data);


      router.push(`/confirmation/${data.id}`);
    } catch (err: any) {
      toast.error(err.message);
      console.error("Booking error:", err);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = slot ? slot.price * numberOfSeats : 0;
  const taxes = subtotal * 0.06;
  const total = subtotal + taxes;

    return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-8 px-4">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/details">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-black cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </Link>
          <h1 className="text-[14px] font-medium text-[#000000]">Checkout</h1>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-6">
          {/* Left side form */}
          <div className="flex-1 bg-[#EFEFEF] rounded-[8px] p-6 space-y-4 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="font-regular text-[14px] text-[#5B5B5B] mb-1 block">
                  Full name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-[16px] py-[12px] bg-[#DDDDDD] text-[#161616]"
                />
              </div>
              <div className="flex-1">
                <label className="font-regular text-[14px] text-[#5B5B5B] mb-1 block">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-[16px] py-[12px] bg-[#DDDDDD] text-[#161616]"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <input
                placeholder="Promo code"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-[16px] py-[12px] bg-[#DDDDDD] text-[#161616]"
              />
              <button className="bg-[#161616] cursor-pointer text-white px-[16px] py-[12px] rounded-md">
                Apply
              </button>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" className="accent-[#FFD643]" />
              <span className="text-sm text-gray-600">
                I agree to the terms and safety policy
              </span>
            </div>
          </div>

          {/* Right side summary */}
          <div className="w-full lg:w-[387px] bg-[#F5F5F5] rounded-[8px] p-6 shadow-sm h-fit">
            <div className="space-y-3 text-[14px] text-[#6C6C6C]">
              <div className="flex justify-between">
                <span className="font-regular text-[16px] text-[#656565]">
                  Experience
                </span>
                <span className="text-[#161616]">
                  {experience ? experience.title : "Loading..."}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-regular text-[16px] text-[#656565]">
                  Date
                </span>
                <span className="text-[#161616]">
                  {slot
                    ? new Date(slot.date).toLocaleDateString()
                    : "Loading..."}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-regular text-[16px] text-[#656565]">
                  Time
                </span>
                <span className="text-[#161616]">
                  {slot ? `${slot.startTime}` : "Loading..."}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-regular text-[16px] text-[#656565]">
                  Qty
                </span>
                <span className="text-[#161616]">{numberOfSeats}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-regular text-[16px] text-[#656565]">
                  Subtotal
                </span>
                <span className="text-[#161616]">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-regular text-[16px] text-[#656565]">
                  Taxes
                </span>
                <span className="text-[#161616]">
                  ₹{taxes.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-gray-300 pt-3 flex justify-between font-medium text-[#161616] text-[16px]">
                <span className="text-[#161616] font-medium">Total</span>
                <span className="text-[#161616] font-medium">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={loading}
              className="w-full bg-[#FFD643] text-[#161616] cursor-pointer mt-4 px-[20px] py-[12px] rounded-md font-medium text-[16px] leading-[20px]"
            >
              {loading ? "Processing..." : "Pay and Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}