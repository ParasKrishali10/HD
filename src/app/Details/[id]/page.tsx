"use client";
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

interface Slot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  totalSeats: number;
  availableSeats: number;
  price: number;
}
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
  slots: Slot[];
  bookings: any[];
}

export default function Details() {
  const [quantity, setQuantity] = useState(1);
  const [exp, setExp] = useState<Experience | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  useEffect(() => {
    const fetchExp = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/experience/${id}`);
        setExp(res.data);
      } catch (error) {
        toast.error("Failed to fetch");
        console.log(error);
        return;
      } finally {
        setLoading(false);
      }
    };
    fetchExp();
  }, [id]);

  const dates = [...new Set(exp?.slots.map((slot) => new Date(slot.date).toDateString()))];

  const filteredSlots = selectedDate
    ? exp?.slots.filter((slot) => new Date(slot.date).toDateString() === selectedDate)
    : [];

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const price = exp?.price || 0;
  const subtotal = price * quantity;
  const total = subtotal;
  const taxes = subtotal * 0.05;

  const handleBooking = async () => {
    if (!exp) return toast.error("Experience not loaded");
    if (!selectedDate) return toast.error("Please select a date");
    if (!selectedSlot) return toast.error("Please select a time slot");

    try {
      const query = new URLSearchParams({
        experienceId: exp.id,
        slotId: selectedSlot.id,
        quantity: quantity.toString(),
      }).toString();

      router.push(`/checkout?${query}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to proceed to checkout");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <button
          type="button"
          className="bg-indigo-500 p-2 rounded-xl flex gap-2"
          disabled
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>

          <span className="mt-1">Processing…</span>
        </button>
      </div>
    );
  }

  return (
    <div className="">
      <div>
        <Navbar></Navbar>
        <div>
          <div className="flex mt-6 ">
            <div className="lg:ml-14  md:ml-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-[20px] h-[20px] text-[#000000]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </div>
            <Link
              href={"/"}
              className="cursor-pointer font-medium text-[14px] leading-[18px] text-[#000000] ml-1 mt-0.5 text-shadow-lg"
            >
              Details
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mt-6 lg:ml-14 md:ml-10 mb-10">
            <div className="flex flex-col w-full max-w-[765px]">
              <div className="w-full h-[381px] rounded-[12px] overflow-hidden shadow-lg">
                <img
                  src={`/${exp?.image.replace("./", "")}`}
                  alt="Kayaking"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-4">
                <h2 className="font-medium text-[24px] leading-[32px] text-[#161616]">
                  {exp?.title}
                </h2>
                <p className="font-normal text-[16px] text-[#6C6C6C] mt-2">
                  {exp?.description}
                </p>

                <div className="mt-6">
                  <h3 className="font-medium text-[#161616] mb-2">
                    Choose date
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {dates.map((date, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedSlot(null);
                        }}
                        className={`px-3 py-1 rounded-md text-sm ${
                          selectedDate === date
                            ? "bg-yellow-400 text-[#161616]"
                            : "bg-[#EEEEEE] text-[#838383]"
                        }`}
                      >
                        {new Date(date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <div className="mt-6">
                    <h3 className="font-medium text-[#161616] mb-2">
                      Choose time
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {filteredSlots?.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedSlot(slot)}
                          className={`px-3 py-1 flex items-center rounded-md text-sm ${
                            selectedSlot?.id === slot.id
                              ? "bg-yellow-400 text-[#161616]"
                              : "bg-[#EEEEEE] text-[#838383]"
                          }`}
                        >
                          {slot.startTime}
                          <span className="ml-1 mt-[1px] font-medium text-[10px] leading-[12px] text-[#FF4C0A]">
                            {slot.availableSeats} left
                          </span>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      All times are in IST (GMT +5:30)
                    </p>
                  </div>
                )}

                <div className="mt-6">
                  <h3 className="font-medium text-[#161616] mb-1">About</h3>
                  <div className="bg-[#F3F3F3] p-3 rounded-md text-sm text-[#6C6C6C]">
                    Scenic routes, trained guides, and safety briefing. Minimum
                    age 10.
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[387px] h-[303px] bg-[#EFEFEF] rounded-[12px] p-[24px] mr-8 flex flex-col justify-between shadow-md">
              <div>
                <div className="flex justify-between text-[14px] text-[#6C6C6C] mb-2">
                  <span className="font-regular text-[16px]">Starts at</span>
                  <span className="font-regular text-[18px] text-[#161616]">
                    ₹{price}
                  </span>
                </div>

                <div className="flex justify-between items-center text-[14px] text-[#6C6C6C] mb-2">
                  <span className="font-regular text-[16px]">Quantity</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={decrease}
                      className="border border-[#D0D0D0] px-2 rounded hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={increase}
                      className="border border-[#D0D0D0] px-2 rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex justify-between text-[14px] text-[#6C6C6C] mb-4">
                  <span className="font-regular text-[16px]">Subtotal</span>
                  <span className="font-regular text-[14px] leading-[20px] text-[#161616]">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[14px] text-[#6C6C6C] mb-4">
                  <span className="font-regular text-[16px]">Taxes</span>
                  <span className="font-regular text-[14px] leading-[20px] text-[#161616]">
                    ₹{taxes.toFixed(2)}
                  </span>
                </div>
              </div>

              <div>
                <div className="border-t border-[#DADADA] pt-2 mb-4">
                  <div className="flex justify-between text-[16px] font-medium text-[#161616]">
                    <span className="font-medium text-[20px] leading-[24px]">
                      Total
                    </span>
                    <span className="font-medium text-[20px] leading-[24px]">
                      ₹
                      {(
                        Number(total.toFixed(2)) + Number(taxes.toFixed(2))
                      ).toFixed(2)}{" "}
                    </span>
                  </div>
                </div>

                <button
                  className="w-full bg-[#FFD643] text-[#161616] py-2 rounded-md font-medium text-[16px] leading-[20px] cursor-pointer"
                  onClick={handleBooking}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
