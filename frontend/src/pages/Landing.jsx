import {useEffect} from "react";

import {Navbar} from "../components/landing/Navbar.jsx";
import { HeroSection } from "../components/landing/HeroSection";
import { FeaturesSection } from "../components/landing/Featuressection";
import { HowItWorks } from "../components/landing/HowItWorks";
import { DashboardPreviewSection } from "../components/landing/DashboardpreviewSection";
import { BenefitsSection } from "../components/landing/Benefitssection";
import { TestimonialsSection } from "../components/landing/TestimonialsSection";
import { CTASection } from "../components/landing/CtsSection";
import { Footer } from "../components/landing/Footer";
 

export default function Landing() {

    useEffect(()=>{
const prev=document.documentElement.getAttribute("data-theme");
document.documentElement.setAttribute("dark-theme","light");
return()=>{
    if(prev)
        document.documentElement.setAttribute("dark-theme",prev);
}
    },[]);


    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] overflow-x-hidden">
<Navbar/>
<main style={{ background:"white"}}>
    <HeroSection/>
    <FeaturesSection/>
 <HowItWorks/>
<DashboardPreviewSection/>
<BenefitsSection/>
<TestimonialsSection />
<CTASection/>

</main>
<Footer/>

            
        </div>
    )
}