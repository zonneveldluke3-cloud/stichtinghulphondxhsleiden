import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Registration } from "@/components/sections/Registration";
import { AboutUs } from "@/components/sections/AboutUs";
import { PracticalInfo } from "@/components/sections/PracticalInfo";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Donate } from "@/components/sections/Donate";
import { SponsorStrip } from "@/components/sections/SponsorStrip";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <HowItWorks />
        <Registration />
        <Donate />
        <AboutUs />
        <PracticalInfo />
        <SponsorStrip />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
