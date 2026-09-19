import { useEffect } from "react";
import "@/App.css";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Features from "@/components/Features";
import Markets from "@/components/Markets";
import Technology from "@/components/Technology";
import Traction from "@/components/Traction";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true });
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onAnchor = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href"));
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -72 });
      }
    };
    document.addEventListener("click", onAnchor);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onAnchor);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App relative">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Features />
        <Markets />
        <Technology />
        <Traction />
        <About />
        <Contact />
      </main>
      <Footer />
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}

export default App;
