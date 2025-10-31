"use client";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
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
export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="p-10 text-center">Loading checkout...</div>}>
        <CheckoutContent />
      </Suspense>
    </>
  );
}


function CheckoutContent() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("test@test.com");
  const [phone, setPhone] = useState("9999999999");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [experience, setExperience] = useState<Experience | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(false);
  const [applyingPromo, setApplyingPromo] = useState(false);

  const searchParams = useSearchParams();
  const experienceId = searchParams.get("experienceId");
  const slotId = searchParams.get("slotId");
  const numberOfSeats = Number(searchParams.get("quantity") || 1);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [experienceId, slotId]);

  const subtotal = slot ? slot.price * numberOfSeats : 0;
  const taxes = subtotal * 0.06;
  const total = subtotal + taxes;

  useEffect(() => {

    setFinalTotal(Math.max(0, total - discount));
  }, [total, discount]);


  const handleApplyPromo = async () => {
    if (!promo) {
      toast.error("Please enter a promo code");
      return;
    }

    try {
      setApplyingPromo(true);
      const res = await fetch("/api/promo/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promo, totalAmount: total }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to apply promo");
      }

      // If success, compute final price using backend-calculated discount
      if (data.finalAmount !== undefined && data.discount !== undefined) {
        setDiscount(total - data.finalAmount);
        setFinalTotal(data.finalAmount);
        toast.success("Promo code applied successfully!");
      } else {
        toast.success("Promo code applied!");
      }
    } catch (err: any) {
      toast.error(err.message);
      setDiscount(0);
      setFinalTotal(total);
    } finally {
      setApplyingPromo(false);
    }
  };

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
      router.push(`/confirmation/${data.id}`);
    } catch (err: any) {
      toast.error(err.message);
      console.error("Booking error:", err);
    } finally {
      setLoading(false);
    }
  };

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

          <div className="flex-1 bg-[#EFEFEF] rounded-[8px] p-6 space-y-4 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="text-[14px] text-[#5B5B5B] mb-1 block">
                  Full name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-[16px] py-[12px] bg-[#DDDDDD]"
                />
              </div>
              <div className="flex-1">
                <label className="text-[14px] text-[#5B5B5B] mb-1 block">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-[16px] py-[12px] bg-[#DDDDDD]"
                />
              </div>
            </div>


            <div className="flex gap-2">
              <input
                placeholder="Promo code"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-[16px] py-[12px] bg-[#DDDDDD]"
              />
              <button
                onClick={handleApplyPromo}
                disabled={applyingPromo}
                className="bg-[#161616] text-white px-[16px] py-[12px] rounded-md"
              >
                {applyingPromo ? "Applying..." : "Apply"}
              </button>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" className="accent-[#FFD643]" />
              <span className="text-sm text-gray-600">
                I agree to the terms and safety policy
              </span>
            </div>
          </div>


          <div className="w-full lg:w-[387px] bg-[#F5F5F5] rounded-[8px] p-6 shadow-sm h-fit">
            <div className="space-y-3 text-[14px] text-[#6C6C6C]">
              <div className="flex justify-between">
                <span>Experience</span>
                <span>{experience ? experience.title : "Loading..."}</span>
              </div>

              <div className="flex justify-between">
                <span>Date</span>
                <span>
                  {slot ? new Date(slot.date).toLocaleDateString() : "Loading..."}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Time</span>
                <span>{slot ? slot.startTime : "Loading..."}</span>
              </div>

              <div className="flex justify-between">
                <span>Qty</span>
                <span>{numberOfSeats}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹{taxes.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-700 font-medium">
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}

              <div className="border-t border-gray-300 pt-3 flex justify-between font-medium text-[#161616] text-[16px]">
                <span>Total</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={loading}
              className="w-full bg-[#FFD643] text-[#161616] mt-4 px-[20px] py-[12px] rounded-md font-medium cursor-pointer"
            >
              {loading ? "Processing..." : "Pay and Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export const dynamic = "force-dynamic";