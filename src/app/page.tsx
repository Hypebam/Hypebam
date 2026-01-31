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

/**
 * Main Home Page
 * 
 * This is the main landing page for the Hype Bam Energy Drink website.
 * It uses modular section components for better organization and maintainability.
 */
export default function HomePage() {
    // Initialize GSAP animations
    useAnimations();

    return (
        <>
            {/* Loader - will be hidden once animations are ready */}
            <Loader />

            {/* Global CSS embed */}
            <div className="global-css">
                <div className="w-embed"></div>
            </div>

            {/* Navigation */}
            <Navbar />

            {/* Page Content */}
            <div className="page-wrapper">
                {/* Hero/Stage Section */}
                <HeroSection />

                {/* Insider Section with Video Testimonials */}
                <InsiderSection />

                {/* Sequence/Nutrition Section */}
                <SequenceSection />

                {/* Benefits Comparison Section */}
                <BenefitsSection />

                {/* Customer Testimonials/Reviews */}
                <TestimonialsSection />

                {/* Flavour Slider Section */}
                <FlavourSection />

                {/* Payment Methods Section */}
                <PaymentSection />

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
