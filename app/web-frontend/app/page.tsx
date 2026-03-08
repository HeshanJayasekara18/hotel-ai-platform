import Navbar from "../components/common/Navbar";
import Section1 from "../components/landing/Section1";
import Section2 from "../components/landing/Section2";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111]">
      <Navbar />
      <Section1 />
      <Section2 />
    </main>
  );
}
