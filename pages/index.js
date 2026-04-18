import Head from "next/head";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import PromiseSection from "@/components/landing/PromiseSection";
import ModulesSection from "@/components/landing/ModulesSection";
import BeforeAfterSection from "@/components/landing/BeforeAfterSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>NeftX - Hospital Management Software | OPD, EMR, IPD & Pharmacy</title>
        <meta name="description" content="Complete hospital management system for clinics and hospitals." />
      </Head>
      <Navbar />
      <Hero />
      <PromiseSection />
      <ModulesSection />
      <BeforeAfterSection />
      <Footer />
    </>
  );
}
