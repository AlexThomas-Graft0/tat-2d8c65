import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PhilosophySection } from "@/components/PhilosophySection";
import { GalleryTeaser } from "@/components/GalleryTeaser";
import { MeetTheArtist } from "@/components/MeetTheArtist";
import { BookingForm } from "@/components/BookingForm";
import { FaqAftercare } from "@/components/FaqAftercare";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"LocalBusiness\",\"name\":\"tatŵ\",\"description\":\"we are a welsh tattoo studio specialising in welsh tattoos\",\"address\":{\"@type\":\"PostalAddress\",\"addressLocality\":\"Caerdydd\"},\"url\":\"https://tat-2d8c65.duckbyte.co\"}" }} />
      <Navbar />
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <PhilosophySection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <GalleryTeaser />
      </Suspense>
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <MeetTheArtist />
      </Suspense>
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <BookingForm />
      </Suspense>
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <FaqAftercare />
      </Suspense>
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <ContactSection />
      </Suspense>
      <Footer />
    </main>
  );
}
