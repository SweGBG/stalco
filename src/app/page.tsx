import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Products from "@/components/Products";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export default function Home() {
  return (
    <>
      <ScrollFadeIn />
      <Navbar />
      <main>
        <Hero />
        <Brands />
        <Products />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
