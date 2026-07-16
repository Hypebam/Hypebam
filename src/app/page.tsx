"use client";

import { useAnimations } from '@/hooks';
import { Navbar, Loader } from '@/components/layout';
import {
    HeroSection,
    InsiderSection,
    SequenceSection,
    BenefitsSection,
    ReviewsSection,
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

                {/* Flavour carousel right after the benefits comparison — the
                    "what you get" → "pick your flavour" story beat, and its pale
                    cream stage flows straight out of the white benefits card. */}
                <FlavourSection />

                <TestimonialsSection />

                {/* Customer testimonials — the rebel sticker wall. Sits between
                    the dark lava stage above and the warm sunset zone below:
                    its backdrop opens in the same espresso void and sunrises
                    into the warm gold that .warm-zone starts with. */}
                <ReviewsSection />

                {/* Bottom "sunset deepen" zone — one continuous warm gradient +
                    hero texture spans Payment → Footer (see .warm-zone in
                    globals.css). */}
                <div className="warm-zone">
                    <PaymentSection />

                    <Footer />
                </div>
            </div>
        </>
    );
}
