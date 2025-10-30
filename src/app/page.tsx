import Image from "next/image";
import Navbar from "./components/navbar";
import Cards from "./components/Cards";
export default function Home() {
  return (
    <main className=" ">
      <Navbar></Navbar>
      <div className="flex items-center justify-center  ">
        <Cards></Cards>
      </div>
    </main>
  );
}
