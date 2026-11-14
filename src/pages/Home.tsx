import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/lib/lenis";
import { initReveals, useReducedMotion } from "@/hooks/useMotion";
import { Nav } from "@/components/Nav";
import { Cursor } from "@/components/Cursor";
import { Toasts } from "@/components/Toast";
import { Assistant } from "@/components/Assistant";
import { MobileCta } from "@/components/MobileCta";
import { Hero } from "@/sections/Hero";
import { Intro } from "@/sections/Intro";
import { Services } from "@/sections/Services";
import { Spaces } from "@/sections/Spaces";
import { Transformation } from "@/sections/Transformation";
import { Gallery } from "@/sections/Gallery";
import { Featured } from "@/sections/Featured";
import { Why } from "@/sections/Why";
import { Process } from "@/sections/Process";
import { Areas } from "@/sections/Areas";
import { Faq } from "@/sections/Faq";
import { Contact } from "@/sections/Contact";
import { FinalCta } from "@/sections/FinalCta";
import { Footer } from "@/sections/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const reduced = useReducedMotion();

  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafFn: ((time: number) => void) | null = null;
    if (!reduced) {
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      rafFn = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(rafFn);
      gsap.ticker.lagSmoothing(0);
    }
    const destroyReveals = initReveals(document);
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      destroyReveals();
      clearTimeout(t);
      if (rafFn) gsap.ticker.remove(rafFn);
      if (lenis) {
        lenis.destroy();
        setLenis(null);
      }
    };
  }, [reduced]);

  return (
    <>
      <a
        href="#contact"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:bg-[#bc773f] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to contact
      </a>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Services />
        <Spaces />
        <Transformation />
        <Gallery />
        <Featured />
        <Why />
        <Process />
        <Areas />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <Assistant />
      <MobileCta />
      <Toasts />
    </>
  );
}
