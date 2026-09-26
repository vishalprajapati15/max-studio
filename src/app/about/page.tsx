import AboutHero from '@/components/about/AboutHero'
import AboutStory from '@/components/about/AboutStory'
import AboutTeam from '@/components/about/AboutTeam'
import WhyChooseUs from '@/components/about/WhyChooseUs'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "About MAX Studio | Photography Studio in Delhi",
    description:
        "Learn about MAX Studio, a professional photography studio in Delhi focused on portrait, studio, event, pre-wedding and professional photography.",
    alternates: {
        canonical: "/about",
    },
};

const page = () => {
    return (
        <div>
            <AboutHero />
            <AboutStory />
            <AboutTeam />
            <WhyChooseUs />
        </div>
    )
}

export default page