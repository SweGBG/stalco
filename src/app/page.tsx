import Observers from "@/components/Observers";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Shop from "@/components/Shop";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import QuoteDrawer from "@/components/QuoteDrawer";

export default function Home() {
  return (
    <>
      <Observers />
      <Navbar />
      <main>
        <Hero />
        <Brands />
        <Shop />
        <About />
        <Contact />
      </main>
      <Footer />
      <QuoteDrawer />
    </>
  );
}
