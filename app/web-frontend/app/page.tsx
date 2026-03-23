import Navbar from "../components/common/Navbar";
import Section1 from "../components/landing/Section1";
import Section2 from "../components/landing/Section2";
import Section3 from "../components/landing/Section3";
import BookingBar from "../components/landing/BookingBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111]">
      <Navbar />
      <Section1 />
      <BookingBar />
      <Section2 />
      <Section3 />
    </main>
  );
}
