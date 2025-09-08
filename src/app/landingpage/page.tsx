"use client";

import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import Portfolio from "./components/Portfolio";
import Offer from "./components/Offer";
import ContactForm from "./components/ContactForm";


export default function LandingPage() {
  return (
    <main className="flex flex-col  items-center w-full">
      <Hero />
      <Benefits />
      <Portfolio />
      <Offer />
      <ContactForm />
 
    </main>
  );
}
