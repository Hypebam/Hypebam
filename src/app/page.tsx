"use client";

import { useAnimations } from '@/hooks';
import { Navbar, Loader } from '@/components/layout';
import {
    HeroSection,
    InsiderSection,
    SequenceSection,
    BenefitsSection,
    TestimonialsSection,
    FlavourSection,
    PaymentSection,
    Footer
} from '@/components/sections';

export default function HomePage() {
    useAnimations();

    return (
        <>
            <Loader />

            <div className="global-css">
                <div className="w-embed"></div>
            </div>

            <Navbar />

            <div className="page-wrapper">
                <HeroSection />

                <InsiderSection />

                <SequenceSection />

                <BenefitsSection />

                <TestimonialsSection />

                {/* Bottom "sunset deepen" zone — one continuous warm gradient +
                    hero texture spans Flavour → Payment → Footer (see .warm-zone
                    in globals.css). */}
                <div className="warm-zone">
                    <FlavourSection />

                    <PaymentSection />

                    <Footer />
                </div>
            </div>
        </>
    );
}
