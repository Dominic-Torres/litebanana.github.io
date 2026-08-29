import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Section from "./components/Section";
import ProjectAppStore from "./components/ProjectAppStore";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import TechMarquee from "./components/TechMarquee";
import ScrollProgress from "./components/ScrollProgress";
import CursorGlow from "./components/CursorGlow";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import AnimationSpeedToggle from "./components/AnimationSpeedToggle";
import LoadingScreen from "./components/LoadingScreen";
import SectionNav from "./components/SectionNav";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  // Smooth scroll with Lenis
  useEffect(() => {
    if (!loaded) return;

    let lenis: { destroy: () => void; raf: (time: number) => void } | null = null;

    const initLenis = async () => {
      const { default: Lenis } = await import("lenis");
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      lenis?.destroy();
    };
  }, [loaded]);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <div className={`relative min-h-screen ${loaded ? "" : "invisible"}`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-xl focus:bg-accent focus:px-4 focus:py-2 focus:font-extrabold focus:text-white"
        >
          Skip to content
        </a>

        <ScrollProgress />
        <CursorGlow />
        <SectionNav />

        <Navbar />

        <main id="main">
          <Hero />

          <TechMarquee />

          <Section
            id="projects"
            index={1}
            eyebrow="Projects"
            title="Things I've built"
            description="Tap a card to explore the project. Built with iOS App Store-style layout animations."
          >
            <ProjectAppStore />
          </Section>

          <Experience />
          <Skills />
          <About />
          <Testimonials />
          <Blog />
          <Contact />
        </main>

        <Footer />
        <BackToTop />
        <KeyboardShortcuts />
        <AnimationSpeedToggle />
      </div>
    </>
  );
}
