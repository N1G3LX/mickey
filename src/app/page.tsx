import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import Hero from "@/components/landing-page/Hero";
import LatestJobsContainer from "@/components/landing-page/LatestJobsContainer";
import Image from "next/image";

export default function Home() {
  return (
   <main className="flex flex-col">
    <Header />
    <Hero />
    <LatestJobsContainer />
    <Footer />
   </main>
  );
}
